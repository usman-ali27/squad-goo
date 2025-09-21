
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useUser, useAuthActions } from "@/stores/authStore";
import { updateRecruiterProfile } from "@/services/recruiterService";
import { Save } from "lucide-react";
import { z } from "zod";

const validationSchema = z.object({
  company_name: z.string().min(1, "Company name is required").max(150, "Company name cannot exceed 150 characters"),
  abc: z.string().min(1, "ABC/ACN is required").max(150, "ABC/ACN cannot exceed 150 characters"),
  business_address: z.string().min(1, "Business address is required").max(255, "Business address cannot exceed 255 characters"),
  business_phone: z.string().min(1, "Business phone is required").max(255, "Business phone cannot exceed 255 characters"),
  director_name: z.string().min(1, "Director name is required").max(150, "Director name cannot exceed 150 characters"),
  director_contact_number: z.string().min(1, "Director contact number is required").max(50, "Director contact number cannot exceed 50 characters"),
  director_contact_email: z.string().email("Invalid email address").max(150, "Director contact email cannot exceed 150 characters"),
  company_reg_date: z.string().min(1, "Company registration date is required"),
});

const CompanyDetailsRecruiter = () => {
  const { toast } = useToast();
  const user = useUser();
  const { updateRecruiter } = useAuthActions();
  const [formData, setFormData] = useState({
    company_name: "",
    abc: "",
    business_address: "",
    business_phone: "",
    director_name: "",
    director_contact_number: "",
    director_contact_email: "",
    company_reg_date: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [maxDate, setMaxDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setMaxDate(today);
    if (user && user.recruiter) {
      const { recruiter } = user;
      setFormData({
        company_name: recruiter.business_name || "",
        abc: recruiter.abn || "",
        business_address: recruiter.business_address || "",
        business_phone: recruiter.business_phone || "",
        director_name: recruiter.director_name || "",
        director_contact_number: recruiter.director_contact_number || "",
        director_contact_email: recruiter.director_contact_email || "",
        company_reg_date: recruiter.company_reg_date || "",
      });
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const validationResult = validationSchema.safeParse(formData);

    if (!validationResult.success) {
      const newErrors: any = {};
      for (const error of validationResult.error.errors) {
        newErrors[error.path[0]] = error.message;
      }
      setErrors(newErrors);
      toast({
        title: "Validation Error",
        description: "Please correct the errors and try again.",
        variant: "destructive",
      });
      return;
    }

    setErrors({});

    if (user && user.recruiter) {
      setIsLoading(true);
      const payload = {
        id: user.recruiter.id,
        ...formData,
      };
      updateRecruiterProfile(payload)
        .then((response) => {
          updateRecruiter(response.data.data);
          toast({
            title: "Success",
            description: "Your company details have been updated successfully.",
          });
        })
        .catch(error => {
          let errorMessage = "An unexpected error occurred.";
          if (error.response?.data?.errors) {
            const fieldErrors = Object.values(error.response.data.errors)[0];
            if (Array.isArray(fieldErrors) && fieldErrors.length > 0) {
              errorMessage = fieldErrors[0];
            }
          } else if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          }

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

  return (
    <div className="space-y-8 p-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Company Details</h2>
        <div className="w-full h-1 bg-accent rounded-full mt-2" />
      </div>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="company-name">Company Name</Label>
            <Input id="company-name" value={formData.company_name} onChange={(e) => handleInputChange("company_name", e.target.value)} />
            {errors.company_name && <p className="text-red-500 text-xs">{errors.company_name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="abc">ABC/ACN</Label>
            <Input id="abc" value={formData.abc} onChange={(e) => handleInputChange("abc", e.target.value)} />
            {errors.abc && <p className="text-red-500 text-xs">{errors.abc}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="business-address">Business Address</Label>
          <Input id="business-address" value={formData.business_address} onChange={(e) => handleInputChange("business_address", e.target.value)} />
          {errors.business_address && <p className="text-red-500 text-xs">{errors.business_address}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="business-phone">Business Phone</Label>
          <Input id="business-phone" value={formData.business_phone} onChange={(e) => handleInputChange("business_phone", e.target.value)} />
          {errors.business_phone && <p className="text-red-500 text-xs">{errors.business_phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="company-reg-date">Company Registration Date</Label>
          <Input id="company-reg-date" type="date" value={formData.company_reg_date} onChange={(e) => handleInputChange("company_reg_date", e.target.value)} max={maxDate} />
          {errors.company_reg_date && <p className="text-red-500 text-xs">{errors.company_reg_date}</p>}
        </div>

        <div className="space-y-2 pt-4">
            <h3 className="text-lg font-semibold">Director's Name</h3>
            <Input id="director-name" value={formData.director_name} onChange={(e) => handleInputChange("director_name", e.target.value)} />
            {errors.director_name && <p className="text-red-500 text-xs">{errors.director_name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="director-contact">Director's Contact Number</Label>
          <Input id="director-contact" value={formData.director_contact_number} onChange={(e) => handleInputChange("director_contact_number", e.target.value)} />
          {errors.director_contact_number && <p className="text-red-500 text-xs">{errors.director_contact_number}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="director-email">Director's Contact Email</Label>
          <Input id="director-email" value={formData.director_contact_email} onChange={(e) => handleInputChange("director_contact_email", e.target.value)} />
          {errors.director_contact_email && <p className="text-red-500 text-xs">{errors.director_contact_email}</p>}
        </div>

        <div className="flex justify-end pt-4">
          <Button type="button" onClick={handleSave} variant="orange" className="px-8" disabled={isLoading}>
            {isLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyDetailsRecruiter;
