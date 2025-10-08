
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { useProfileData } from "@/contexts/ProfileDataContext";
import { updateProfile } from "@/services/profileService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BasicDetails = () => {
  const { toast } = useToast();
  const user = useUser();
  const profileData = useProfileData();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    dob: "",
    address: "",
    bio: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [bioWordCount, setBioWordCount] = useState(0);

  const countWords = (text: string) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(Boolean).length;
  };

  useEffect(() => {
    if (profileData && user) {
      const userRole = user.role;
      const userData = profileData[userRole];

      if (userData) {
        const { first_name, last_name, dob, address, bio } = userData;
        const initialBio = bio || "";
        setFormData({
          first_name: first_name || "",
          last_name: last_name || "",
          dob: dob || "",
          address: address || "",
          bio: initialBio,
        });
        setBioWordCount(countWords(initialBio));
      }
    }
  }, [profileData, user]);

  const mutation = useMutation({
    mutationFn: (payload: any) => updateProfile(user!.role, payload),
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your basic details have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.role, user?.id] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    if (field === 'bio') {
      const words = value.trim().split(/\s+/).filter(Boolean);
      if (words.length > 400) {
        value = words.slice(0, 400).join(' ');
        toast({
            title: "Word limit reached",
            description: "You cannot enter more than 400 words.",
            variant: "destructive",
        });
      }
      setBioWordCount(countWords(value));
    }

    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required";
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required";
    if (user && user.role !== 'individual') {
        if (!formData.dob) {
            newErrors.dob = "Date of birth is required";
        } else {
            const dobDate = new Date(formData.dob);
            const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
            if (dobDate > today) {
                newErrors.dob = "Date of birth cannot be in the future";
            } else if (dobDate > eighteenYearsAgo) {
                newErrors.dob = "You must be at least 18 years old";
            }
        }
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (countWords(formData.bio) > 400) newErrors.bio = "Bio cannot exceed 400 words.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSave = () => {
    if (validateForm() && user && profileData) {
      const userRole = user.role;
      const roleId = profileData[userRole]?.id;

      if (!roleId) {
        toast({
          title: "Error",
          description: "Could not find profile ID.",
          variant: "destructive",
        });
        return;
      }

      const payload = {
        ...formData,
        id: roleId,
      };

      mutation.mutate(payload);
    }
  };


  if (!profileData) {
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
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={formData.last_name} onChange={e => handleInputChange("last_name", e.target.value)} className={errors.last_name ? "border-red-500" : ""} />
              {errors.last_name && <p className="text-sm text-red-500">{errors.last_name}</p>}
            </div>
          </div>

          {user && (
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={user.email} readOnly />
            </div>
          )}

          {user && user.role === 'job_seeker' && profileData.job_seeker && (
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input id="contactNumber" value={profileData.job_seeker.phone || ''} readOnly />
            </div>
          )}

          {user && user.role !== 'individual' && (
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              <Input id="dateOfBirth" type="date" max={new Date().toISOString().split("T")[0]} value={formData.dob} onChange={e => handleInputChange("dob", e.target.value)} className={errors.dob ? "border-red-500" : ""} />
              {errors.dob && <p className="text-sm text-red-500">{errors.dob}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="homeAddress">Home Address</Label>
            <Textarea id="homeAddress" rows={3} value={formData.address} onChange={e => handleInputChange("address", e.target.value)} className={`resize-none ${errors.address ? "border-red-500" : ""}`} />
            {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
            <p className="text-xs text-muted-foreground">Used to calculate distance during job matching</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="bio">Bio</Label>
                <span className={`text-xs ${bioWordCount > 400 ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {bioWordCount}/400 words
                </span>
            </div>
            <Textarea id="bio" rows={4} value={formData.bio} onChange={e => handleInputChange("bio", e.target.value)} className={`resize-none ${errors.bio ? 'border-red-500' : ''}`} />
            {errors.bio && <p className="text-sm text-red-500">{errors.bio}</p>}
            <p className="text-xs text-muted-foreground">Appears on your profile card</p>
          </div>

          <div className="flex justify-end pt-6">
            <Button onClick={handleSave} variant="orange" className="px-8" disabled={mutation.isPending}>
              {mutation.isPending ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicDetails;
