
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Save, Trash2, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { getJobSeekerExperiences, saveJobSeekerExperiences, Experience } from "@/services/experienceService";
import { uploadFileAsBase64 } from "@/services/fileService";

const JobExperience = () => {
  const { toast } = useToast();
  const user = useUser();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState<number | null>(null);

  const fetchExperiences = useCallback(() => {
    if (user && user.job_seeker) {
      setIsLoading(true);
      getJobSeekerExperiences(user.job_seeker.id)
        .then(response => {
          const expData = response.data.data || [];
          setExperiences(expData);
          setErrors(expData.map(() => ({})));
        })
        .catch(() => {
          toast({ title: "Error", description: "Failed to fetch job experiences.", variant: "destructive" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [user, toast]);

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleAddExperience = () => {
    setExperiences(prev => [...prev, { industry: '', job_title: '', job_description: '', pay_min: '', pay_max: '', start_date: '', end_date: '' }]);
    setErrors(prev => [...prev, {}]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value };
    setExperiences(updatedExperiences);
    if (errors[index] && errors[index][field]) {
        const updatedErrors = [...errors];
        delete updatedErrors[index][field];
        setErrors(updatedErrors);
    }
  };

  const handleFileChange = async (index: number, file: File | null) => {
    if (file) {
      setIsUploading(index);
      try {
        const url = await uploadFileAsBase64(file);
        const updatedExperiences = [...experiences];
        updatedExperiences[index].payslip_path = url;
        setExperiences(updatedExperiences);
        toast({ title: "Success", description: "Payslip uploaded successfully." });
      } catch (error) {
        toast({ title: "Error", description: "Failed to upload payslip.", variant: "destructive" });
      } finally {
        setIsUploading(null);
      }
    }
  };

  const validateExperiences = () => {
    let isValid = true;
    const newErrors = experiences.map(exp => {
      const expErrors: any = {};
      if (!exp.industry.trim()) { expErrors.industry = "Industry is required."; isValid = false; }
      if (!exp.job_title.trim()) { expErrors.job_title = "Job title is required."; isValid = false; }
      if (!exp.start_date) { expErrors.start_date = "Start date is required."; isValid = false; }
      return expErrors;
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSaveChanges = () => {
    if (validateExperiences() && user && user.job_seeker) {
      setIsLoading(true);
      saveJobSeekerExperiences({ jobseeker_id: user.job_seeker.id, experiences })
        .then(() => {
          toast({ title: "Success", description: "Job experiences saved successfully." });
          fetchExperiences(); // Re-fetch data on success
        })
        .catch(error => {
          const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
          toast({ title: "Error", description: errorMsg, variant: "destructive" });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Job Experience</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <div className="flex justify-end">
          <Button onClick={handleAddExperience} className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Add Experience
          </Button>
      </div>

      {isLoading && !experiences.length ? <p>Loading...</p> : experiences.map((exp, index) => (
        <Card key={exp.id || index} className="border-l-4 border-l-purple-600 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between bg-gray-50 p-4">
            <CardTitle className="text-base font-semibold">{exp.job_title || "New Experience"}</CardTitle>
            <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleRemoveExperience(index)}>
                <Trash2 className="w-4 h-4 mr-2"/> Delete
            </Button>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Industry</Label>
                    <Input value={exp.industry} onChange={e => handleExperienceChange(index, 'industry', e.target.value)} className={errors[index]?.industry ? "border-red-500" : ""} />
                    {errors[index]?.industry && <p className="text-sm text-red-500">{errors[index]?.industry}</p>}
                </div>
                <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input value={exp.job_title} onChange={e => handleExperienceChange(index, 'job_title', e.target.value)} className={errors[index]?.job_title ? "border-red-500" : ""} />
                    {errors[index]?.job_title && <p className="text-sm text-red-500">{errors[index]?.job_title}</p>}
                </div>
            </div>
            <div className="space-y-2">
                <Label>Job Description</Label>
                <Textarea value={exp.job_description} onChange={e => handleExperienceChange(index, 'job_description', e.target.value)} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Pay Rate Range (Min)</Label>
                    <Input type="number" value={exp.pay_min} onChange={e => handleExperienceChange(index, 'pay_min', e.target.value)} placeholder="e.g., 25"/>
                </div>
                <div className="space-y-2">
                    <Label>Pay Rate Range (Max)</Label>
                    <Input type="number" value={exp.pay_max} onChange={e => handleExperienceChange(index, 'pay_max', e.target.value)} placeholder="e.g., 45" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input type="date" value={exp.start_date} onChange={e => handleExperienceChange(index, 'start_date', e.target.value)} className={errors[index]?.start_date ? "border-red-500" : ""} />
                     {errors[index]?.start_date && <p className="text-sm text-red-500">{errors[index]?.start_date}</p>}
                </div>
                <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input type="date" value={exp.end_date} onChange={e => handleExperienceChange(index, 'end_date', e.target.value)} />
                </div>
            </div>
             <div className="space-y-2">
                <Label>Payslip</Label>
                <div className="flex items-center gap-4">
                    <Input id={`payslip-${index}`} type="file" onChange={e => handleFileChange(index, e.target.files ? e.target.files[0] : null)} className="hidden" disabled={isUploading === index} />
                    <Label htmlFor={`payslip-${index}`} className={`cursor-pointer inline-flex items-center bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 ${isUploading === index ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isUploading === index ? <Loader2 className="w-4 h-4 mr-2 animate-spin"/> : <Upload className="w-4 h-4 mr-2"/>}
                        {isUploading === index ? 'Uploading...' : 'Upload File'}
                    </Label>
                    {exp.payslip_path && (
                        <a href={exp.payslip_path} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline truncate">
                          {exp.payslip_path.split('/').pop()}
                        </a>
                    )}
                </div>
             </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleSaveChanges} className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" disabled={isLoading || isUploading !== null}>
          {isLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2"/>Save All Experience</>}
        </Button>
      </div>
    </div>
  );
};

export default JobExperience;
