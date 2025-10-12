
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  quickSearchStaff,
  manualSearchStaff,
  sendOffer,
  SendOfferPayload,
} from "@/services/recruiterService";
import { useState } from "react";
import { industries } from "@/constants/industries";
import { useMutation } from "@tanstack/react-query";
import { Zap } from "lucide-react";
import { useUser } from "@/stores/authStore";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const manualSearchSchema = z.object({
  industry: z.string().nonempty("Industry is required."),
  job_title: z.string().nonempty("Job title is required."),
  work_location: z.string().nonempty("Work location is required."),
  range_km: z.number().optional(),
  experience_years: z.number().optional(),
  salary_min: z.number({ required_error: "Minimum salary is required." }).min(1, "Minimum salary must be at least 1."),
  salary_max: z.number({ required_error: "Maximum salary is required." }).min(1, "Maximum salary must be at least 1."),
  job_description: z.string().nonempty("Job description is required."),
  tax_type: z.string().nonempty("Tax type is required."),
}).refine((data) => data.salary_max > data.salary_min, {
    message: "Maximum salary must be greater than minimum salary.",
    path: ["salary_max"],
});

const quickSearchSchema = z.object({
    industry: z.string().nonempty("Industry is required."),
    job_title: z.string().nonempty("Job title is required."),
    work_location: z.string().nonempty("Work location is required to send an offer."),
    range_km: z.number().optional(),
    experience_years: z.number().optional(),
    salary_min: z.number({ required_error: "Minimum salary is required." }).min(1, "Minimum salary must be at least 1."),
    salary_max: z.number({ required_error: "Maximum salary is required." }).min(1, "Maximum salary must be at least 1."),
    education: z.array(z.string()).optional(),
    preferred_language: z.string().optional(),
    tax_type: z.string().optional(),
    job_description: z.string().nonempty("Job description is required to send an offer."),
}).refine((data) => !data.salary_min || !data.salary_max || data.salary_max > data.salary_min, {
    message: "Maximum salary must be greater than minimum salary.",
    path: ["salary_max"],
});


const FindStaffPage = () => {
  const [searchType, setSearchType] = useState<"quick" | "manual">("quick");
  const user = useUser();
  const { toast } = useToast();

  const manualForm = useForm({
    resolver: zodResolver(manualSearchSchema),
    defaultValues: {
        industry: "",
        job_title: "",
        work_location: "",
        range_km: undefined,
        experience_years: undefined,
        salary_min: undefined,
        salary_max: undefined,
        job_description: "",
        tax_type: "",
    },
  });

  const quickForm = useForm({
    resolver: zodResolver(quickSearchSchema),
    defaultValues: {
        industry: "",
        job_title: "",
        work_location: "",
        range_km: undefined,
        experience_years: undefined,
        salary_min: undefined,
        salary_max: undefined,
        education: [],
        preferred_language: "",
        tax_type: "",
        job_description: "",
    },
  });

  const quickSearchMutation = useMutation({ 
    mutationFn: quickSearchStaff,
    onError: (error: any) => {
      toast({
        title: "Error searching staff",
        description: error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  const manualSearchMutation = useMutation({ 
    mutationFn: manualSearchStaff,
    onError: (error: any) => {
      toast({
        title: "Error searching staff",
        description: error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  const sendOfferMutation = useMutation({ 
    mutationFn: sendOffer,
    onSuccess: (data) => {
      toast({
        title: "Offer Sent Successfully",
        description: data.data.message || "Your offer has been sent.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error sending offer",
        description: error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (data: any) => {
    if (searchType === "quick") {
        quickSearchMutation.mutate(data);
    } else {
        manualSearchMutation.mutate(data);
    }
  };

  const handleSendOffer = (candidateId: number) => {
    if (!user?.recruiter?.id) {
      toast({
        title: "Error",
        description: "You must be logged in as a recruiter to send offers.",
        variant: "destructive",
      });
      return;
    }

    const now = new Date();
    const startDate = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
    const finishDate = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');
    const offerExpiry = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 19).replace('T', ' ');

    if (searchType === 'quick') {
        const quickSearchPayload = quickForm.getValues();
        const { education, preferred_language, experience_years, ...rest } = quickSearchPayload;
        const payload: SendOfferPayload = {
            ...rest,
            job_type: 'quick',
            recruiter_id: user.recruiter.id,
            start_date: startDate,
            finish_date: finishDate,
            offer_expiry: offerExpiry,
        };
        sendOfferMutation.mutate(payload);
    } else {
        const manualSearchPayload = manualForm.getValues();
        const { range_km, experience_years, salary_min, salary_max, ...rest } = manualSearchPayload;
        const payload: SendOfferPayload = {
            ...rest,
            job_type: 'manual',
            job_seeker_id: candidateId,
            recruiter_id: user?.recruiter?.id,
            pay_min: salary_min,
            pay_max: salary_max,
            start_date: startDate,
            end_date: finishDate,
            offer_expiry: offerExpiry,
        };
        sendOfferMutation.mutate(payload);
    }
  }

  const handleSetSearchType = (type: "quick" | "manual") => {
    setSearchType(type);
    manualForm.reset();
    quickForm.reset();
  };

  const isLoading = quickSearchMutation.isPending || manualSearchMutation.isPending;
  const searchResults =
    searchType === "quick" ? quickSearchMutation.data : manualSearchMutation.data;
  const candidates = searchResults?.data?.data?.data || [];
  const form = searchType === 'quick' ? quickForm : manualForm;

  return (
    <div className="bg-white">
      <div 
        className="text-white text-center bg-cover bg-center relative" 
        style={{ backgroundImage: "url('/assets/images/recurities.jpeg')" }}
      >
        <div className="py-16">
            <h1 className="text-4xl font-bold">FIND A STAFF</h1>
            <p className="text-lg mt-2">Discover and connect with the perfect candidates for your business needs</p>
            <div className="flex justify-center gap-4 mt-8">
            <Button onClick={() => handleSetSearchType("quick")} className={`rounded-md px-8 py-3 ${searchType === 'quick' ? 'bg-purple-800 hover:bg-purple-900 text-white' : 'bg-gray-200 text-black'}`}>Quick Search</Button>
            <Button onClick={() => handleSetSearchType("manual")} variant="outline" className={`rounded-md px-8 py-3 ${searchType === 'manual' ? 'bg-purple-800 hover:bg-purple-900 text-white' : 'bg-gray-200 text-black'}`}>Manual Search</Button>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <Card className="shadow-2xl bg-white">
            <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-8">
                    <Zap className="text-yellow-500"/>
                    <h2 className="text-2xl font-bold">{searchType === "quick" ? "Quick Search" : "Manual Search"}</h2>
                </div>

                <form onSubmit={form.handleSubmit(handleSearch)}>
                    {searchType === "quick" ? (
                        <QuickSearchForm control={quickForm.control} errors={quickForm.formState.errors} />
                    ) : (
                        <ManualSearchForm control={manualForm.control} errors={manualForm.formState.errors} />
                    )}

                    <div className="text-center mt-8">
                        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-12 py-6 text-lg">
                            {isLoading ? "Searching..." : `Start ${searchType === 'quick' ? 'Quick' : 'Manual'} Search`}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-2xl font-bold">Search Results</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : candidates.length > 0 ? (
            <div className="space-y-4 mt-4">
              {candidates.map((candidate: any, index: number) => (
                <Card key={index} className="shadow-md">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-lg">
                        <span className="text-purple-700">{`${candidate.first_name} ${candidate.last_name || ''}`}</span> — {candidate.preferences[0]?.job_title || 'N/A'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Exp: {candidate.experiences[0]?.job_title || 'N/A'} • {candidate.distance_range} km
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <Button onClick={() => handleSendOffer(candidate.id)} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">Send Offer</Button>
                      <Button variant="outline" className="rounded-full px-6">View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Matching candidates will appear here.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const QuickSearchForm = ({ control, errors }: { control: any, errors: any }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
            <Label htmlFor="industry">Industry *</Label>
            <Controller
                name="industry"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="industry" className={errors.industry ? "border-red-500" : ""}><SelectValue placeholder="Select Industry" /></SelectTrigger>
                        <SelectContent>
                            {industries.map((industry) => (
                                <SelectItem key={industry} value={industry.toLowerCase().replace(/ & /g, '_and_')}>
                                {industry}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="job_title">Job Title *</Label>
            <Controller
                name="job_title"
                control={control}
                render={({ field }) => <Input id="job_title" placeholder="e.g. Software Developer" {...field} className={errors.job_title ? "border-red-500" : ""} />}
            />
            {errors.job_title && <p className="text-sm text-red-500">{errors.job_title.message}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="work_location">Work Location *</Label>
            <Controller
                name="work_location"
                control={control}
                render={({ field }) => <Input id="work_location" placeholder="City, State" {...field} className={errors.work_location ? "border-red-500" : ""} />}
            />
            {errors.work_location && <p className="text-sm text-red-500">{errors.work_location.message}</p>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="range_km">Range from location (km)</Label>
            <Controller
                name="range_km"
                control={control}
                render={({ field }) => <Input id="range_km" placeholder="e.g. 20" type="number" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="experience_years">Total experience needed (years)</Label>
            <Controller
                name="experience_years"
                control={control}
                render={({ field }) => <Input id="experience_years" placeholder="e.g. 3" type="number" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />}
            />
        </div>
        <div className="space-y-2">
            <Label>Salary Range *</Label>
            <div className="flex gap-2">
                <div className="w-full">
                    <Controller
                        name="salary_min"
                        control={control}
                        render={({ field }) => <Input placeholder="Min" type="number" {...field} value={field.value ?? ''} className={errors.salary_min ? "border-red-500" : ""} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />}
                    />
                    {errors.salary_min && <p className="text-sm text-red-500">{errors.salary_min.message}</p>}
                </div>
                <div className="w-full">
                    <Controller
                        name="salary_max"
                        control={control}
                        render={({ field }) => <Input placeholder="Max" type="number" {...field} value={field.value ?? ''} className={errors.salary_max ? "border-red-500" : ""} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />}
                    />
                    {errors.salary_max && <p className="text-sm text-red-500">{errors.salary_max.message}</p>}
                </div>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="education">Required educational qualifications</Label>
            <Controller
                name="education"
                control={control}
                render={({ field }) => <Input id="education" placeholder="e.g. High School / Diploma / Degree" value={field.value?.join(', ') ?? ''} onChange={e => field.onChange(e.target.value.split(', ').filter(Boolean))} />}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="preferred_language">Preferred language</Label>
            <Controller
                name="preferred_language"
                control={control}
                render={({ field }) => <Input id="preferred_language" placeholder="e.g. English" {...field} />}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="tax_type">Required Tax Type</Label>
            <Controller
                name="tax_type"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger id="tax_type"><SelectValue placeholder="Select a tax type" /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="TFN">TFN</SelectItem>
                        <SelectItem value="ABN">ABN</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            />
        </div>
        <div className="space-y-2 md:col-span-3">
            <Label htmlFor="job_description">Job Description *</Label>
            <Controller
                name="job_description"
                control={control}
                render={({ field }) => <Textarea id="job_description" placeholder="Enter job description..." {...field} className={errors.job_description ? "border-red-500" : ""} />}
            />
            {errors.job_description && <p className="text-sm text-red-500">{errors.job_description.message}</p>}
        </div>
    </div>
);

const ManualSearchForm = ({ control, errors }: { control: any, errors: any }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
            <div className="space-y-2">
                <Label htmlFor="manual_industry">Industry *</Label>
                <Controller
                    name="industry"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="manual_industry" className={errors.industry ? "border-red-500" : ""}><SelectValue placeholder="Select an industry" /></SelectTrigger>
                            <SelectContent>
                            {industries.map((industry) => (
                                <SelectItem key={industry} value={industry.toLowerCase().replace(/ & /g, '_and_')}>
                                {industry}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="manual_job_title">Job Title *</Label>
                <Controller
                    name="job_title"
                    control={control}
                    render={({ field }) => <Input id="manual_job_title" placeholder="e.g. Physician" {...field} className={errors.job_title ? "border-red-500" : ""} />}
                />
                {errors.job_title && <p className="text-sm text-red-500">{errors.job_title.message}</p>}
            </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="manual_range_km">Range from location (km)</Label>
            <Controller
                name="range_km"
                control={control}
                render={({ field }) => <Input id="manual_range_km" placeholder="e.g. 15" type="number" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />}
            />
        </div>
        <div className="space-y-2">
            <Label htmlFor="manual_experience_years">Experience needed (years)</Label>
            <Controller
                name="experience_years"
                control={control}
                render={({ field }) => <Input id="manual_experience_years" placeholder="e.g. 2" type="number" {...field} value={field.value ?? ''} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />}
            />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 col-span-2">
            <div className="space-y-2">
                <Label htmlFor="manual_work_location">Work Location *</Label>
                <Controller
                    name="work_location"
                    control={control}
                    render={({ field }) => <Input id="manual_work_location" placeholder="e.g. Melbourne, VIC" {...field} className={errors.work_location ? "border-red-500" : ""} />}
                />
                {errors.work_location && <p className="text-sm text-red-500">{errors.work_location.message}</p>}
            </div>
            <div className="space-y-2">
                <Label htmlFor="manual_tax_type">Required Tax Type *</Label>
                <Controller
                    name="tax_type"
                    control={control}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger id="manual_tax_type" className={errors.tax_type ? "border-red-500" : ""}><SelectValue placeholder="Select a tax type" /></SelectTrigger>
                            <SelectContent>
                            <SelectItem value="TFN">TFN</SelectItem>
                            <SelectItem value="ABN">ABN</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.tax_type && <p className="text-sm text-red-500">{errors.tax_type.message}</p>}
            </div>
        </div>

        <div className="space-y-2 col-span-2">
            <Label>Salary Range *</Label>
            <div className="flex gap-2">
                <div className="w-full">
                    <Controller
                        name="salary_min"
                        control={control}
                        render={({ field }) => <Input placeholder="Min" type="number" {...field} value={field.value ?? ''} className={errors.salary_min ? "border-red-500" : ""} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />}
                    />
                    {errors.salary_min && <p className="text-sm text-red-500">{errors.salary_min.message}</p>}
                </div>
                <div className="w-full">
                    <Controller
                        name="salary_max"
                        control={control}
                        render={({ field }) => <Input placeholder="Max" type="number" {...field} value={field.value ?? ''} className={errors.salary_max ? "border-red-500" : ""} onChange={e => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value, 10))} />}
                    />
                    {errors.salary_max && <p className="text-sm text-red-500">{errors.salary_max.message}</p>}
                </div>
            </div>
        </div>

        <div className="space-y-2 md:col-span-2">
            <Label htmlFor="manual_job_description">Job Description *</Label>
            <Controller
                name="job_description"
                control={control}
                render={({ field }) => <Textarea id="manual_job_description" placeholder="Enter job description..." {...field} className={errors.job_description ? "border-red-500" : ""} />}
            />
            {errors.job_description && <p className="text-sm text-red-500">{errors.job_description.message}</p>}
        </div>
    </div>
);

export default FindStaffPage;
