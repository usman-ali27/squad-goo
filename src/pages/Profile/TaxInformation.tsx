
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser, useAuthActions, JobSeeker, Recruiter, Individual } from "@/stores/authStore";
import { updateTaxInformation, TaxInformationPayload } from "@/services/profileService";
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
    const { updateJobSeeker, updateRecruiter, updateIndividual } = useAuthActions();
    const [taxInfo, setTaxInfo] = useState<Omit<TaxInformationPayload, 'id'>>({});
    const [errors, setErrors] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            const { role, job_seeker, recruiter, individual } = user;
            let user_details: JobSeeker | Recruiter | Individual | undefined;

            if (role === 'job_seeker') {
                user_details = job_seeker;
            } else if (role === 'recruiter') {
                user_details = recruiter;
            } else if (role === 'individual') {
                user_details = individual;
            }

            if (user_details) {
                setTaxInfo({
                    tfn: user_details.tfn,
                    abn: user_details.abn,
                    trs: user_details.trs,
                });
            }
        }
    }, [user]);

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

        if (user) {
            const { role, job_seeker, recruiter, individual } = user;
            console.log(user)
            let user_details: JobSeeker | Recruiter | Individual | undefined;

            if (role === 'job_seeker') {
                user_details = job_seeker;
            } else if (role === 'recruiter') {
                user_details = recruiter;
            } else if (role === 'individual') {
                user_details = individual;
            }

            if (user_details) {
                setIsLoading(true);
                const payload: TaxInformationPayload = { ...validationResult.data, id: user_details.id };
                updateTaxInformation(role, payload)
                    .then(() => {
                        toast({ title: "Success", description: "Tax information saved successfully." });
                        const updatedDetails = { ...user_details, ...taxInfo };
                        if (role === 'job_seeker') {
                            updateJobSeeker(updatedDetails as JobSeeker);
                        } else if (role === 'recruiter') {
                            updateRecruiter(updatedDetails as Recruiter);
                        } else if (role === 'individual') {
                            updateIndividual(updatedDetails as Individual);
                        }
                    })
                    .catch(error => {
                        const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
                        toast({ title: "Error", description: errorMsg, variant: "destructive" });
                    })
                    .finally(() => {
                        setIsLoading(false);
                    });
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
                            onChange={handleChange} />
                        {errors[field.id] && <p className="text-sm text-red-500 mt-1">{errors[field.id]}</p>}
                    </div>
                ))}

                <div className="flex justify-end pt-4">
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" disabled={isLoading}>
                        {isLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Tax Information</>}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TaxInformation;
