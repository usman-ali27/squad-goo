
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Save, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { getJobSeekerEducation, saveJobSeekerEducation } from "@/services/educationService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Education = () => {
  const { toast } = useToast();
  const user = useUser();
  const queryClient = useQueryClient();

  const [education, setEducation] = useState<any[]>([]);
  const [errors, setErrors] = useState<any[]>([]);

  const jobSeekerId = user?.job_seeker?.id;

  const { data: fetchedEducation, isLoading: isLoadingEducation } = useQuery({
    queryKey: ['education', jobSeekerId],
    queryFn: () => getJobSeekerEducation(jobSeekerId!),
    enabled: !!jobSeekerId,
    select: (response) => response.data.data || [],
    onSuccess: (data) => {
      setEducation(data);
      setErrors(data.map(() => ({})));
    },
  });

  useEffect(() => {
    if (fetchedEducation) {
      setEducation(fetchedEducation);
      setErrors(fetchedEducation.map(() => ({})));
    }
  }, [fetchedEducation]);

  const saveMutation = useMutation({
    mutationFn: (educationData: any) => saveJobSeekerEducation(jobSeekerId!, educationData),
    onSuccess: (response) => {
      toast({ title: "Success", description: "Education details saved successfully." });
      const updatedEducations = response.data.data.educations || [];
      setEducation(updatedEducations);
      setErrors(updatedEducations.map(() => ({})));
      queryClient.invalidateQueries({ queryKey: ['education', jobSeekerId] });
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
      toast({ title: "Error", description: errorMsg, variant: "destructive" });
    },
  });

  const handleAddEducation = () => {
    setEducation(prev => [...prev, { qualification_type: '', institution: '', year_completed: '', grade: '' }]);
    setErrors(prev => [...prev, {}]);
  };

  const handleRemoveEducation = (index) => {
    setEducation(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);

    if (errors[index] && errors[index][field]) {
      const updatedErrors = [...errors];
      delete updatedErrors[index][field];
      setErrors(updatedErrors);
    }
  };

  const validateEducation = () => {
    let isValid = true;
    const newErrors = education.map(edu => {
      const eduErrors: any = {};
      if (!edu.qualification_type.trim()) {
        eduErrors.qualification_type = "Qualification type is required.";
        isValid = false;
      }
      if (!edu.institution.trim()) {
        eduErrors.institution = "Institution is required.";
        isValid = false;
      }
      if (!edu.year_completed.trim()) {
        eduErrors.year_completed = "Year completed is required.";
        isValid = false;
      } else if (!/^\d{4}$/.test(edu.year_completed) || parseInt(edu.year_completed) > new Date().getFullYear()) {
        eduErrors.year_completed = "Please enter a valid 4-digit year.";
        isValid = false;
      }
      return eduErrors;
    });
    setErrors(newErrors);
    return isValid;
  };

  const handleSaveEducation = () => {
    if (validateEducation()) {
      saveMutation.mutate(education);
    }
  };

  if (user?.role !== 'job_seeker') {
    return <div className="p-4">This section is for job seekers only.</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Qualifications & Education</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h3 className="text-lg font-semibold text-purple-700">Educational Details</h3>
          <Button onClick={handleAddEducation} className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Education
          </Button>
        </div>
        {isLoadingEducation ? <LoadingSpinner text="Loading education details..."/> : education.map((edu, index) => (
          <Card key={edu.id || index} className="border-l-4 border-l-purple-600 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-gray-50 p-4">
              <CardTitle className="text-base font-semibold">
                {edu.qualification_type || "New Education"}
              </CardTitle>
              <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleRemoveEducation(index)} aria-label="Remove education">
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Qualification Type</Label>
                  <Input
                    value={edu.qualification_type}
                    onChange={e => handleEducationChange(index, 'qualification_type', e.target.value)}
                    placeholder="e.g., Bachelor's Degree"
                    className={errors[index]?.qualification_type ? "border-red-500" : ""}
                  />
                  {errors[index]?.qualification_type && <p className="text-sm text-red-500">{errors[index]?.qualification_type}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    value={edu.institution}
                    onChange={e => handleEducationChange(index, 'institution', e.target.value)}
                    placeholder="e.g., University of Sydney"
                    className={errors[index]?.institution ? "border-red-500" : ""} />
                  {errors[index]?.institution && <p className="text-sm text-red-500">{errors[index]?.institution}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Year Completed</Label>
                  <Input
                    value={edu.year_completed}
                    onChange={e => handleEducationChange(index, 'year_completed', e.target.value)}
                    placeholder="e.g., 2019"
                    className={errors[index]?.year_completed ? "border-red-500" : ""} />
                  {errors[index]?.year_completed && <p className="text-sm text-red-500">{errors[index]?.year_completed}</p>}
                </div>
                <div className="space-y-2">
                  <Label>Grade/GPA</Label>
                  <Input value={edu.grade} onChange={e => handleEducationChange(index, 'grade', e.target.value)} placeholder="e.g., Distinction" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleSaveEducation} className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" disabled={saveMutation.isPending}>
          {saveMutation.isPending ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save All Education</>}
        </Button>
      </div>
    </div>
  );
};

export default Education;
