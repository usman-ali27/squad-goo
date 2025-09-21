
import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { getJobSeekerPreferences, saveJobSeekerPreferences, Preference, PreferencePayload } from "@/services/preferenceService";
import { AnimatePresence, motion } from "framer-motion";
import { industries } from "@/constants/industries";

const JobPreferences = () => {
  const { toast } = useToast();
  const user = useUser();
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const payRateInputsRef = useRef<Record<string, { pay_min: number; pay_max: number }>>({});

  const availabilityDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const offerTypes = ["Manual", "Quick"];
  const taxOptions = ["TFN", "ABN"];

  const fetchPreferences = useCallback(async () => {
    if (!user?.job_seeker) return;
    setIsFetching(true);
    try {
      const response = await getJobSeekerPreferences(user.job_seeker.id);
      if (response.data && response.data.data.length > 0) {
        const fetchedPreferences = response.data.data.map((pref: any, index: number) => {
          payRateInputsRef.current[index] = { pay_min: parseFloat(pref.pay_min) || 0, pay_max: parseFloat(pref.pay_max) || 0 };
          return {
            ...pref,
            pay_min: parseFloat(pref.pay_min) || 0,
            pay_max: parseFloat(pref.pay_max) || 0,
            days: pref.days ? JSON.parse(pref.days) : [],
            offer_types: pref.offer_types ? JSON.parse(pref.offer_types) : [],
          };
        });
        setPreferences(fetchedPreferences);
      } else {
        handleAddPreference();
      }
    } catch (error) {
      toast({
        title: "Error fetching preferences",
        description: "Could not load your job preferences. Please try again later.",
        variant: "destructive",
      });
      handleAddPreference();
    } finally {
      setIsFetching(false);
    }
  }, [user?.job_seeker?.id, toast]);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);


  const handleAddPreference = () => {
    const newIndex = preferences.length;
    const newPreference: Preference = {
      industry: '',
      job_title: '',
      pay_min: 0,
      pay_max: 0,
      days: [],
      time_from: '09:00',
      time_to: '17:00',
      offer_types: [],
      distance: 25,
      tax_option: 'TFN',
    };
    setPreferences(prev => [...prev, newPreference]);
    setErrors(prev => [...prev, {}]);
    payRateInputsRef.current[newIndex] = { pay_min: 0, pay_max: 0 };
  };

  const handleRemovePreference = (index: number) => {
    setPreferences(prev => prev.filter((_, i) => i !== index));
    setErrors(prev => prev.filter((_, i) => i !== index));
    const newPayRateInputs = { ...payRateInputsRef.current };
    delete newPayRateInputs[index];
    payRateInputsRef.current = newPayRateInputs;
  };

  const handleChange = (index: number, field: keyof Preference, value: any) => {
    const newPreferences = [...preferences];
    const currentPreference = { ...newPreferences[index], [field]: value };

    if (field === 'pay_min' || field === 'pay_max') {
      const payMin = field === 'pay_min' ? value : currentPreference.pay_min;
      const payMax = field === 'pay_max' ? value : currentPreference.pay_max;
      const prevPayMin = payRateInputsRef.current[index]?.pay_min;
      const prevPayMax = payRateInputsRef.current[index]?.pay_max;

      if (payMin && payMax && parseFloat(payMin) > parseFloat(payMax)) {
        if (field === 'pay_min' && value !== prevPayMin) {
            currentPreference.pay_max = payMin;
        } else if (field === 'pay_max' && value !== prevPayMax) {
            currentPreference.pay_min = payMax;
        }
      }
      payRateInputsRef.current[index] = { pay_min: currentPreference.pay_min, pay_max: currentPreference.pay_max };
    }
    
    (newPreferences[index] as any) = currentPreference;
    setPreferences(newPreferences);
  };

  const handleDayChange = (index: number, day: string) => {
    const newPreferences = [...preferences];
    const currentDays = newPreferences[index].days;
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    handleChange(index, 'days', newDays);
  };

  const handleOfferTypeChange = (index: number, type: string) => {
    const newPreferences = [...preferences];
    const currentTypes = newPreferences[index].offer_types;
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    handleChange(index, 'offer_types', newTypes);
  };

  const validate = () => {
    let isValid = true;
    const newErrors = preferences.map(pref => {
      const error: any = {};
      if (!pref.industry) error.industry = "Industry is required.";
      if (!pref.job_title) error.job_title = "Job title is required.";
      if (pref.pay_min < 0) error.pay_min = "Min pay cannot be negative.";
      if (pref.pay_max <= pref.pay_min) error.pay_max = "Max pay must be greater than min pay.";
      if (pref.days.length === 0) error.days = "At least one day must be selected.";
      if (Object.keys(error).length > 0) isValid = false;
      return error;
    });
    setErrors(newErrors);
    return isValid;
  };


  const handleSavePreferences = async () => {
    if (!validate()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
      return;
    }

    if (!user?.job_seeker?.id) {
      toast({ title: "Authentication Error", description: "Could not verify user.", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    const payload: PreferencePayload = {
      jobseeker_id: user?.job_seeker?.id,
      preferences: preferences,
    };

    try {
      await saveJobSeekerPreferences(payload);
      toast({
        title: "Preferences Saved",
        description: "Your job preferences have been updated successfully.",
      });
      // Refetch to get IDs for newly created preferences
      fetchPreferences();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Handle validation errors from backend
        const backendErrors = error.response.data.errors;
        // You might want to map these to your errors state
        toast({
          title: "Save Failed",
          description: "There were errors in your submission.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Save Error",
          description: "Could not save your preferences. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-foreground">Loading your preferences...</p>
      </div>
    );
  }


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Job Preferences</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleAddPreference} className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Add Another Preference
        </Button>
      </div>

      <Card className="border-l-4 border-l-purple-600 overflow-hidden">
        <AnimatePresence>
          {preferences.map((preference, index) => (
            <motion.div
              key={preference.id || index}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.3 }}
            >
              <PreferenceCard
                preference={preference}
                index={index}
                onChange={handleChange}
                onDayChange={handleDayChange}
                onOfferTypeChange={handleOfferTypeChange}
                onRemove={handleRemovePreference}
                errors={errors[index] || {}}
                availabilityDays={availabilityDays}
                offerTypes={offerTypes}
                taxOptions={taxOptions}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </Card>

      <div className="flex justify-end pt-4">
        <Button size="lg" onClick={handleSavePreferences} className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" disabled={isLoading}>
          {isLoading ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save All Preferences</>}
        </Button>
      </div>
    </div>
  );
};

// Sub-component for individual preference cards
interface PreferenceCardProps {
  preference: Preference;
  index: number;
  onChange: (index: number, field: keyof Preference, value: any) => void;
  onDayChange: (index: number, day: string) => void;
  onOfferTypeChange: (index: number, type: string) => void;
  onRemove: (index: number) => void;
  errors: any;
  availabilityDays: string[];
  offerTypes: string[];
  taxOptions: string[];
}

const PreferenceCard: React.FC<PreferenceCardProps> = ({ preference, index, onChange, onDayChange, onOfferTypeChange, onRemove, errors, availabilityDays, offerTypes, taxOptions }) => (
  <div className="border p-4 rounded-lg space-y-4 relative">
    <div className="flex justify-between items-center">
      <div className="text-lg font-semibold">Preference #{index + 1}</div>
      <Button size="sm" variant="outline" className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => onRemove(index)} aria-label="Remove preference">
        <Trash2 className="w-4 h-4" /> Delete
      </Button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor={`industry-${index}`}>Industry</Label>
        <Select value={preference.industry} onValueChange={value => onChange(index, 'industry', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select an industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map(industry => (
              <SelectItem key={industry} value={industry}>{industry}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.industry && <p className="text-sm text-destructive">{errors.industry}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor={`job_title-${index}`}>Job Title</Label>
        <Input id={`job_title-${index}`} value={preference.job_title} onChange={e => onChange(index, 'job_title', e.target.value)} />
        {errors.job_title && <p className="text-sm text-destructive">{errors.job_title}</p>}
      </div>
    </div>

    <div className="space-y-2">
      <Label>Expected Pay Rate ($/hr)</Label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`pay_min-${index}`} className="sr-only">Minimum Pay</Label>
          <Input id={`pay_min-${index}`} type="number" placeholder="Min" value={preference.pay_min} onChange={e => onChange(index, 'pay_min', parseFloat(e.target.value) || 0)} />
          {errors.pay_min && <p className="text-sm text-destructive">{errors.pay_min}</p>}
        </div>
        <div>
          <Label htmlFor={`pay_max-${index}`} className="sr-only">Maximum Pay</Label>
          <Input id={`pay_max-${index}`} type="number" placeholder="Max" value={preference.pay_max} onChange={e => onChange(index, 'pay_max', parseFloat(e.target.value) || 0)} />
          {errors.pay_max && <p className="text-sm text-destructive">{errors.pay_max}</p>}
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <Label>Availability</Label>
      <div className="flex flex-wrap gap-4">
        {availabilityDays.map(day => (
          <div key={day} className="flex items-center space-x-2">
            <Checkbox id={`${day}-${index}`} checked={preference.days.includes(day)} onCheckedChange={() => onDayChange(index, day)} />
            <Label htmlFor={`${day}-${index}`} className="font-normal">{day}</Label>
          </div>
        ))}
      </div>
      {errors.days && <p className="text-sm text-destructive">{errors.days}</p>}
    </div>

    <div className="space-y-2">
      <Label>Availability Time</Label>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`time_from-${index}`}>From</Label>
          <Input id={`time_from-${index}`} type="time" value={preference.time_from} onChange={e => onChange(index, 'time_from', e.target.value)} />
        </div>
        <div>
          <Label htmlFor={`time_to-${index}`}>To</Label>
          <Input id={`time_to-${index}`} type="time" value={preference.time_to} onChange={e => onChange(index, 'time_to', e.target.value)} />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Preferred Offer Types</Label>
        <div className="flex items-center space-x-4">
          {offerTypes.map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={`${type}-${index}`} checked={preference.offer_types.includes(type)} onCheckedChange={() => onOfferTypeChange(index, type)} />
              <Label htmlFor={`${type}-${index}`} className="font-normal">{type}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        <Label>Preferred Tax Option</Label>
        <RadioGroup value={preference.tax_option} onValueChange={value => onChange(index, 'tax_option', value)} className="flex items-center">
          {taxOptions.map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`${option}-${index}`} />
              <Label htmlFor={`${option}-${index}`} className="font-normal">{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>


    <div className="space-y-2">
      <Label htmlFor={`distance-${index}`}>Willing to travel (km)</Label>
      <Input type="range" min="0" max="100" id={`distance-${index}`} value={preference.distance} onChange={e => onChange(index, 'distance', parseInt(e.target.value))} />
      <div className="text-center text-sm font-medium">{preference.distance} km</div>
    </div>
  </div>
);

export default JobPreferences;
