import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BasicDetails = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "Pusparaj",
    lastName: "Giri",
    email: "connect@mybeamlabour.com",
    contactNumber: "+61 491348192",
    dateOfBirth: "01/01/1990",
    homeAddress: "123, Main street",
    bio: "Experienced professional with a passion for excellence and continuous learning.",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      toast({
        title: "Success",
        description: "Your basic details have been updated successfully.",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Basic Details</h1>
        <div className="h-1 w-full bg-accent rounded-full"></div>
      </div>

      <Card className="border-0">
        <CardContent className="space-y-6 p-0">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName}</p>
              )}
              <p className="text-xs text-red-500">Cannot be changed after KYC Verification</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName}</p>
              )}
              <p className="text-xs text-red-500">Cannot be changed after KYC Verification</p>
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <AlertDescription className="text-red-700">
                Verified email cannot be changed through app. Contact customer service.
              </AlertDescription>
            </Alert>
          </div>

          {/* Contact Number */}
          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-sm font-medium">
              Contact Number
            </Label>
            <Input
              id="contactNumber"
              value={formData.contactNumber}
              onChange={(e) => handleInputChange("contactNumber", e.target.value)}
              className={errors.contactNumber ? "border-red-500" : ""}
            />
            {errors.contactNumber && (
              <p className="text-sm text-red-500">{errors.contactNumber}</p>
            )}
            <p className="text-xs text-muted-foreground">Re: Verification required when changing contact number</p>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dateOfBirth" className="text-sm font-medium">
              Date of Birth
            </Label>
            <Input
              id="dateOfBirth"
              placeholder="mm/dd/yy"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
            />
            <p className="text-xs text-red-500">Cannot be changed after KYC Verification</p>
          </div>

          {/* Home Address */}
          <div className="space-y-2">
            <Label htmlFor="homeAddress" className="text-sm font-medium">
              Home Address
            </Label>
            <Textarea
              id="homeAddress"
              rows={3}
              value={formData.homeAddress}
              onChange={(e) => handleInputChange("homeAddress", e.target.value)}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">Used to calculate distance during job matching</p>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">
              Bio <span className="text-muted-foreground">(Maximum 400 words)</span>
            </Label>
            <Textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">Appears on your profile card</p>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button onClick={handleSave} variant="orange" className="px-8">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicDetails;