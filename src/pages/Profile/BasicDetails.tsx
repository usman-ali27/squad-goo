
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { getJobSeekerProfile, updateJobSeekerProfile } from "@/services/jobSeekerService";

const BasicDetails = () => {
  const { toast } = useToast();
  const user = useUser();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    address: "",
    bio: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user && user.job_seeker) {
      setIsLoading(true);
      getJobSeekerProfile(user.job_seeker.id)
        .then(response => {
          const { first_name, last_name, dob, address, bio } = response.data.data;
          setFormData({
            first_name: first_name || "",
            last_name: last_name || "",
            dob: dob || "",
            address: address || "",
            bio: bio || "",
          });
        })
        .catch(() => {
          toast({
            title: "Error",
            description: "Failed to fetch profile data.",
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm() && user && user.job_seeker) {
      setIsLoading(true);
      const payload = {
        ...formData,
        id: user.job_seeker.id,
      };
      updateJobSeekerProfile(payload)
        .then(() => {
          toast({
            title: "Success",
            description: "Your basic details have been updated successfully.",
          });
        })
        .catch(error => {
          const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  if (isLoading && !formData.first_name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Basic Details</h1>
        <div className="h-1 w-full bg-accent rounded-full"></div>
      </div>

      <Card className="border-0">
        <CardContent className="space-y-6 p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={formData.first_name} onChange={e => handleInputChange("first_name", e.target.value)} className={errors.first_name ? "border-red-500" : ""} />
              {errors.first_name && <p className="text-sm text-red-500">{errors.first_name}</p>}
              {/* <p className="text-xs text-red-500">Cannot be changed after KYC Verification</p> */}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={formData.last_name} onChange={e => handleInputChange("last_name", e.target.value)} className={errors.last_name ? "border-red-500" : ""} />
              {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
              {/* <p className="text-xs text-red-500">Cannot be changed after KYC Verification</p> */}
            </div>
          </div>

          {user && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={user.email} readOnly />
              {/* <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-700">Verified email cannot be changed through app. Contact customer service.</AlertDescription>
              </Alert> */}
            </div>
          )}

          {user && user.job_seeker && (
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input id="contactNumber" value={user.job_seeker.phone || ''} readOnly />
              <p className="text-xs text-muted-foreground">Re: Verification required when changing contact number</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" type="date" value={formData.dob} onChange={e => handleInputChange("dob", e.target.value)} className={errors.dob ? "border-red-500" : ""} />
            {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
            {/* <p className="text-xs text-red-500">Cannot be changed after KYC Verification</p> */}
          </div>

          <div className="space-y-2">
            <Label htmlFor="homeAddress">Home Address</Label>
            <Textarea id="homeAddress" rows={3} value={formData.address} onChange={e => handleInputChange("address", e.target.value)} className={`resize-none ${errors.address ? "border-red-500" : ""}`} />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            <p className="text-xs text-muted-foreground">Used to calculate distance during job matching</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio <span className="text-muted-foreground">(Maximum 400 words)</span></Label>
            <Textarea id="bio" rows={4} value={formData.bio} onChange={e => handleInputChange("bio", e.target.value)} className="resize-none" />
            <p className="text-xs text-muted-foreground">Appears on your profile card</p>
          </div>

          <div className="flex justify-end pt-6">
            <Button onClick={handleSave} variant="orange" className="px-8" disabled={isLoading}>
              {isLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicDetails;
