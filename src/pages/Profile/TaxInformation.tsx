
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Save, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { useProfileData } from "@/contexts/ProfileDataContext";
import { updateTaxInformation, TaxInformationPayload } from "@/services/profileService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const taxSchema = z.object({
  tfn: z.string().refine(val => val.length === 0 || (val.length === 9 && /^\d+$/.test(val)), {
    message: "TFN must be 9 digits.",
  }),
  abn: z.string().refine(val => val.length === 0 || (val.length === 11 && /^\d+$/.test(val)), {
    message: "ABN must be 11 digits.",
  }),
  trs: z.string(),
});

const TaxInformation = () => {
  const { toast } = useToast();
  const user = useUser();
  const profileData = useProfileData();
  const queryClient = useQueryClient();

  const [taxInfo, setTaxInfo] = useState<Omit<TaxInformationPayload, 'id'>>({});
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (profileData) {
      const userDetails = profileData.job_seeker || profileData.recruiter || profileData.individual;
      if (userDetails) {
        setTaxInfo({
          tfn: userDetails.tfn,
          abn: userDetails.abn,
          trs: userDetails.trs,
        });
      }
    }
  }, [profileData]);

  const mutation = useMutation({
    mutationFn: (payload: { role: string, data: TaxInformationPayload }) => updateTaxInformation(payload.role, payload.data),
    onSuccess: () => {
      toast({ title: "Success", description: "Tax information saved successfully." });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.role, user?.id] });
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
      toast({ title: "Error", description: errorMsg, variant: "destructive" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setTaxInfo(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationResult = taxSchema.safeParse({
      tfn: taxInfo.tfn || '',
      abn: taxInfo.abn || '',
      trs: taxInfo.trs || '',
    });

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

    if (user && profileData) {
      const { role } = user;
      const userDetails = profileData.job_seeker || profileData.recruiter || profileData.individual;
      if (userDetails) {
        const payload = { ...validationResult.data, id: userDetails.id };
        mutation.mutate({ role, data: payload });
      }
    }
  };

  const taxFields = [
    { id: "tfn", label: "TFN", placeholder: "Your 9-digit TFN" },
    { id: "abn", label: "ABN", placeholder: "Your 11-digit ABN" },
    { id: "trs", label: "TRS", placeholder: "Your TRS" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Tax Information</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <Info className="h-5 w-5 text-blue-500" />
        <p className="text-sm text-blue-700">
          Your tax information is kept secure and will only be used for payment purposes.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {taxFields.map((field) => (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={taxInfo[field.id as keyof Omit<TaxInformationPayload, 'id'>] || ''}
              onChange={handleChange}
            />
            {errors[field.id] && <p className="text-sm text-red-500 mt-1">{errors[field.id]}</p>}
          </div>
        ))}

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <><Save className="w-4 h-4 mr-2" />Save Tax Information</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaxInformation;
