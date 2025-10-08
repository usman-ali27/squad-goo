
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  quickSearchStaff,
  QuickSearchPayload,
  manualSearchStaff,
  ManualSearchPayload,
} from "@/services/recruiterService";
import { useState } from "react";
import { industries } from "@/constants/industries";
import { useMutation } from "@tanstack/react-query";

// Define types for the form state where numeric fields can be strings
type QuickSearchFormState = Omit<QuickSearchPayload, 'range_km' | 'experience_years' | 'salary_min' | 'salary_max'> & { 
    range_km: string; 
    experience_years: string; 
    salary_min: string; 
    salary_max: string; 
};

type ManualSearchFormState = Omit<ManualSearchPayload, 'range_km' | 'experience_years' | 'salary_min' | 'salary_max'> & { 
    range_km: string; 
    experience_years: string; 
    salary_min: string; 
    salary_max: string; 
};

const FindAStaff = () => {
  const [searchType, setSearchType] = useState<"quick" | "manual">("quick");

  // Quick Search State initialized with empty values
  const [quickSearchPayload, setQuickSearchPayload] = useState<QuickSearchFormState>({
    industry: "",
    job_title: "",
    work_location: "",
    range_km: "",
    experience_years: "",
    salary_min: "",
    salary_max: "",
    education: [],
    preferred_language: "",
    tax_type: "",
  });

  const quickSearchMutation = useMutation({ mutationFn: quickSearchStaff });

  // Manual Search State initialized with empty values
  const [manualSearchPayload, setManualSearchPayload] = useState<ManualSearchFormState>({
    industry: "",
    job_title: "",
    work_location: "",
    range_km: "",
    experience_years: "",
    salary_min: "",
    salary_max: "",
  });

  const manualSearchMutation = useMutation({ mutationFn: manualSearchStaff });

  const handleQuickInputChange = (field: keyof QuickSearchPayload, value: any) => {
    setQuickSearchPayload((prev) => ({ ...prev, [field]: value }));
  };

  const handleManualInputChange = (field: keyof ManualSearchPayload, value: any) => {
    setManualSearchPayload((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (searchType === "quick") {
        let payload = { ...quickSearchPayload };
        const minSalary = Number(payload.salary_min);
        const maxSalary = Number(payload.salary_max);

        if (minSalary > 0 && maxSalary > 0 && minSalary > maxSalary) {
            payload = { ...payload, salary_min: String(maxSalary), salary_max: String(minSalary) };
            setQuickSearchPayload(payload);
        }

        quickSearchMutation.mutate({
            ...payload,
            range_km: Number(payload.range_km) || 0,
            experience_years: Number(payload.experience_years) || 0,
            salary_min: Number(payload.salary_min) || 0,
            salary_max: Number(payload.salary_max) || 0,
        });

    } else {
        let payload = { ...manualSearchPayload };
        const minSalary = Number(payload.salary_min);
        const maxSalary = Number(payload.salary_max);

        if (minSalary > 0 && maxSalary > 0 && minSalary > maxSalary) {
            payload = { ...payload, salary_min: String(maxSalary), salary_max: String(minSalary) };
            setManualSearchPayload(payload);
        }

        manualSearchMutation.mutate({
            ...payload,
            range_km: Number(payload.range_km) || 0,
            experience_years: Number(payload.experience_years) || 0,
            salary_min: Number(payload.salary_min) || 0,
            salary_max: Number(payload.salary_max) || 0,
        });
    }
  };

  const isLoading = quickSearchMutation.isPending || manualSearchMutation.isPending;
  const searchResults =
    searchType === "quick" ? quickSearchMutation.data : manualSearchMutation.data;
  const candidates = searchResults?.data?.data?.data || [];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Find A Staff</h1>
          <p className="text-gray-500">
            Choose Quick Search for guided form or Manual Search for full control
          </p>
        </div>
        <div className="flex items-center gap-2 bg-gray-200 rounded-full p-1">
          <Button
            onClick={() => setSearchType("quick")}
            className={searchType === "quick" ? "bg-purple-600 text-white rounded-full" : "rounded-full"}
            variant={searchType === "quick" ? "default" : "ghost"}>
            Quick Search
          </Button>
          <Button
            onClick={() => setSearchType("manual")}
            className={searchType === "manual" ? "bg-purple-600 text-white rounded-full" : "rounded-full"}
            variant={searchType === "manual" ? "default" : "ghost"}>
            Manual Search
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-700">
            {searchType === "quick" ? "Quick Search Form" : "Manual Search Form"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {searchType === "quick" ? (
            <QuickSearchForm
              payload={quickSearchPayload}
              onInputChange={handleQuickInputChange}
            />
          ) : (
            <ManualSearchForm
              payload={manualSearchPayload}
              onInputChange={handleManualInputChange}
            />
          )}
          <div className="flex justify-between items-center mt-6">
            <div className="flex gap-2">
              <Button
                onClick={handleSearch}
                className="bg-orange-500 hover:bg-orange-600 text-white"
              >
                {isLoading ? "Searching..." : `Run ${searchType === 'quick' ? 'Quick' : 'Manual'} Search`}
              </Button>
              <Button variant="outline">Save Template</Button>
            </div>
          </div>
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
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">Send Offer</Button>
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
  );
};

const QuickSearchForm = ({ payload, onInputChange }: { payload: QuickSearchFormState, onInputChange: (field: keyof QuickSearchPayload, value: any) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
    <div>
      <label className="font-semibold text-gray-700">Industry</label>
      <Select value={payload.industry} onValueChange={(value) => onInputChange("industry", value)}>
        <SelectTrigger><SelectValue placeholder="Select an industry" /></SelectTrigger>
        <SelectContent>
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry.toLowerCase().replace(/ & /g, '_and_')}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="font-semibold text-gray-700">Job Title</label>
      <Input
        placeholder="e.g. Front Desk, Barista, Electrician"
        value={payload.job_title}
        onChange={(e) => onInputChange("job_title", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Work Location</label>
      <Input
        placeholder="City, Suburb or Address"
        value={payload.work_location}
        onChange={(e) => onInputChange("work_location", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Range from location (km)</label>
      <Input
        placeholder="e.g. 20"
        type="number"
        value={payload.range_km}
        onChange={(e) => onInputChange("range_km", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Total experience needed (years)</label>
      <Input
        placeholder="e.g. 3"
        type="number"
        value={payload.experience_years}
        onChange={(e) => onInputChange("experience_years", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Salary Range</label>
      <div className="flex gap-2">
        <Input
          placeholder="Min"
          type="number"
          value={payload.salary_min}
          onChange={(e) => onInputChange("salary_min", e.target.value)}
        />
        <Input
          placeholder="Max"
          type="number"
          value={payload.salary_max}
          onChange={(e) => onInputChange("salary_max", e.target.value)}
        />
      </div>
    </div>
    <div>
      <label className="font-semibold text-gray-700">Required educational qualifications</label>
      <Input
        placeholder="e.g. High School / Diploma / Degree"
        value={payload.education.join(", ")}
        onChange={(e) => onInputChange("education", e.target.value.split(", ").filter(Boolean))}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Preferred language</label>
      <Input
        placeholder="e.g. English"
        value={payload.preferred_language}
        onChange={(e) => onInputChange("preferred_language", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Required Tax Type</label>
      <Select value={payload.tax_type} onValueChange={(value) => onInputChange("tax_type", value)}>
        <SelectTrigger><SelectValue placeholder="Select a tax type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="TFN">TFN</SelectItem>
          <SelectItem value="ABN">ABN</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const ManualSearchForm = ({ payload, onInputChange }: { payload: ManualSearchFormState, onInputChange: (field: keyof ManualSearchPayload, value: any) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
    <div>
      <label className="font-semibold text-gray-700">Industry</label>
      <Select value={payload.industry} onValueChange={(value) => onInputChange("industry", value)}>
        <SelectTrigger><SelectValue placeholder="Select an industry" /></SelectTrigger>
        <SelectContent>
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry.toLowerCase().replace(/ & /g, '_and_')}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div>
      <label className="font-semibold text-gray-700">Job Title</label>
      <Input
        placeholder="e.g. Physician"
        value={payload.job_title}
        onChange={(e) => onInputChange("job_title", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Work Location</label>
      <Input
        placeholder="e.g. Melbourne, VIC"
        value={payload.work_location}
        onChange={(e) => onInputChange("work_location", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Range from location (km)</label>
      <Input
        placeholder="e.g. 15"
        type="number"
        value={payload.range_km}
        onChange={(e) => onInputChange("range_km", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Experience needed (years)</label>
      <Input
        placeholder="e.g. 2"
        type="number"
        value={payload.experience_years}
        onChange={(e) => onInputChange("experience_years", e.target.value)}
      />
    </div>
    <div>
      <label className="font-semibold text-gray-700">Salary Range</label>
      <div className="flex gap-2">
        <Input
          placeholder="Min"
          type="number"
          value={payload.salary_min}
          onChange={(e) => onInputChange("salary_min", e.target.value)}
        />
        <Input
          placeholder="Max"
          type="number"
          value={payload.salary_max}
          onChange={(e) => onInputChange("salary_max", e.target.value)}
        />
      </div>
    </div>
  </div>
);

export default FindAStaff;
