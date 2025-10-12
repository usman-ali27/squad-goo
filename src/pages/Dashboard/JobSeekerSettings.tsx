
import { useState, useEffect } from "react";
import { useUser } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { 
  Target, 
  Zap, 
  Briefcase, 
  Wrench, 
  Users, 
  Bell,
  Shield, 
  LifeBuoy,
  AlertTriangle,
  Save
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  updateJobSeekerSettings, 
  JobSeekerSettingsPayload, 
  updateNotificationSettings, 
  NotificationSettingsPayload,
  getJobSeekerSettings
} from "@/services/settingsService";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { industries } from "@/constants/industries";

const JobSeekerSettings = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const user = useUser();
  const [activeTab, setActiveTab] = useState("job");
  const [date, setDate] = useState<Date>();

  const [offerPreference, setOfferPreference] = useState("both");
  const [offerFromPreference, setOfferFromPreference] = useState("both");

  const [quickOfferSettings, setQuickOfferSettings] = useState({
    directPayments: true,
    enoughBalance: false,
    proRecruiter: false
  });

  const [manualOfferSettings, setManualOfferSettings] = useState({
    proRecruiter: false,
  });

  const [individualOfferSettings, setIndividualOfferSettings] = useState({
    proRecruiter: false,
    platformPayments: true,
    selectedIndustries: false,
  });
  
  const initialIndustriesState = industries.reduce((acc, industry) => {
    acc[industry] = false;
    return acc;
  }, {} as { [key: string]: boolean });

  const [selectedIndustries, setSelectedIndustries] = useState(initialIndustriesState);

  const [appSettings, setAppSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
  });

  const { data: settingsData, isLoading: areSettingsLoading } = useQuery({
    queryKey: ["jobSeekerSettings", user?.job_seeker?.id],
    queryFn: () => getJobSeekerSettings(user!.job_seeker!.id),
    enabled: !!user && !!user.job_seeker,
  });

  useEffect(() => {
    if (settingsData) {
      const settings = settingsData.data.data;
      setOfferPreference(settings.offer_preference_type || 'both');
      setOfferFromPreference(settings.offer_from_preference || 'both');
      setQuickOfferSettings({
          directPayments: !!settings.quick_offer_only_platform_payment,
          enoughBalance: !!settings.quick_offer_only_full_balance,
          proRecruiter: !!settings.quick_offer_only_from_pro
      });
      setManualOfferSettings({
          proRecruiter: !!settings.manual_offer_only_from_pro
      });
      setIndividualOfferSettings({
          proRecruiter: !!settings.individual_offer_only_from_pro,
          platformPayments: !!settings.individual_offer_only_platform_payment,
          selectedIndustries: !!settings.individual_offer_industries
      });
      const industries = JSON.parse(settings.individual_offer_industries || '[]') as string[];
      const newSelectedIndustries = { ...initialIndustriesState };
      for (const industry of industries) {
          if (industry in newSelectedIndustries) {
              (newSelectedIndustries as any)[industry] = true;
          }
      }
      setSelectedIndustries(newSelectedIndustries);
      setAppSettings({
          pushNotifications: !!settings.push_notification,
          emailNotifications: !!settings.email_notification
      });
    }
  }, [settingsData]);

  const mutation = useMutation({
    mutationFn: updateJobSeekerSettings,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.data.message || "Your settings have been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["jobSeekerSettings", user?.job_seeker?.id] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });

  const handleSave = () => {
    if (!user || user.role !== 'job_seeker' || !user.job_seeker) return;

    const payload: JobSeekerSettingsPayload = {
      offer_preference_type: offerPreference,
      offer_from_preference: offerFromPreference,
      quick_offer_only_platform_payment: quickOfferSettings.directPayments,
      quick_offer_only_full_balance: quickOfferSettings.enoughBalance,
      quick_offer_only_from_pro: quickOfferSettings.proRecruiter,
      manual_offer_only_from_pro: manualOfferSettings.proRecruiter,
      individual_offer_only_from_pro: individualOfferSettings.proRecruiter,
      individual_offer_only_platform_payment: individualOfferSettings.platformPayments,
      individual_offer_industries: Object.entries(selectedIndustries)
        .filter(([, checked]) => checked)
        .map(([key]) => key),
      jobseeker_id: user.job_seeker.id,
    };

    mutation.mutate(payload);
  };

  const renderContent = () => {
    if (areSettingsLoading) {
        return <div>Loading...</div>
    }
    switch (activeTab) {
      case "job":
        return <JobSettings />;
      case "app":
        return <AppSettings />;
      case "squad":
        return <SquadSettings />;
      default:
        return <JobSettings />;
    }
  };

  const JobSettings = () => (
    <div className="space-y-8 shadow-md bg-white p-4 rounded-md">
      <div className="flex items-center gap-4">
        <Briefcase className="h-8 w-8 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-800">Job Settings</h1>
      </div>
      <Card className="bg-[#F7F7FD] border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Target className="h-5 w-5" />
            Job Offer Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Type of Job Offer Preference</p>
            <Select value={offerPreference} onValueChange={setOfferPreference}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="quick">Quick</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <hr/>
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Offers from User Type Preference</p>
            <Select value={offerFromPreference} onValueChange={setOfferFromPreference}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#F7F7FD] border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-500">
            <Zap className="h-5 w-5" />
            Quick Offer Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only receive offers where payments are handled directly from platform</p>
            <Switch 
              checked={quickOfferSettings.directPayments}
              onCheckedChange={(checked) => 
                setQuickOfferSettings(prev => ({ ...prev, directPayments: checked }))
              }
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
          <hr/>
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only receive offers where recruiter has enough balance for full hours</p>
            <Switch 
              checked={quickOfferSettings.enoughBalance}
              onCheckedChange={(checked) => 
                setQuickOfferSettings(prev => ({ ...prev, enoughBalance: checked }))
              }
            />
          </div>
          <hr/>
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only get offers from PRO BADGE or above recruiters/individuals</p>
            <Switch 
              checked={quickOfferSettings.proRecruiter}
              onCheckedChange={(checked) => 
                setQuickOfferSettings(prev => ({ ...prev, proRecruiter: checked }))
              }
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#F7F7FD] border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Wrench className="h-5 w-5" />
            Manual Offer Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only get offers from PRO BADGE or above recruiters/individuals</p>
            <Switch
              checked={manualOfferSettings.proRecruiter}
              onCheckedChange={(checked) =>
                setManualOfferSettings(prev => ({...prev, proRecruiter: checked}))
              }
            />
          </div>
         
        </CardContent>
      </Card>

      <Card className="bg-[#F7F7FD] border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-600">
            <Users className="h-5 w-5" />
            Individual Offers Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only get offers from PRO BADGE or above individuals</p>
            <Switch
              checked={individualOfferSettings.proRecruiter}
              onCheckedChange={(checked) =>
                setIndividualOfferSettings(prev => ({...prev, proRecruiter: checked}))
              }
            />
          </div>
          <hr/>
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only accept offers where payments are handled by platform</p>
            <Switch
              checked={individualOfferSettings.platformPayments}
              onCheckedChange={(checked) =>
                setIndividualOfferSettings(prev => ({...prev, platformPayments: checked}))
              }
              className="data-[state=checked]:bg-orange-500"
            />
          </div>
          <hr/>
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only receive offers related to selected industries</p>
            <Switch
              checked={individualOfferSettings.selectedIndustries}
              onCheckedChange={(checked) =>
                setIndividualOfferSettings(prev => ({...prev, selectedIndustries: checked}))
              }
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-3 bg-white rounded-md">
            {industries.map((industry) => (
              <div key={industry} className="flex items-center space-x-2">
                <Checkbox
                  id={industry}
                  checked={selectedIndustries[industry] || false}
                  onCheckedChange={(checked) =>
                    setSelectedIndustries((prev) => ({ ...prev, [industry]: checked as boolean }))
                  }
                />
                <label htmlFor={industry} className="text-sm capitalize cursor-pointer text-gray-600">
                  {industry}
                </label>
              </div>
            ))}
          </div>
        
        </CardContent>
      </Card>
       <div className="flex justify-end pt-6">
        <Button onClick={handleSave} variant="orange" className="px-8" disabled={mutation.isPending}>
          {mutation.isPending ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
        </Button>
      </div>
    </div>
  );

  const AppSettings = () => {
    const { toast } = useToast();
    const user = useUser();

    const notificationMutation = useMutation({
      mutationFn: updateNotificationSettings,
      onSuccess: (data) => {
        toast({
          title: "Success",
          description: data.data.message || "Notification settings updated successfully.",
        });
      },
      onError: (error: AxiosError<{ message: string }>) => {
        const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      },
    });

    const handleNotificationSave = () => {
      if (!user || !user.job_seeker) return;

      const payload: NotificationSettingsPayload = {
        push_notification: appSettings.pushNotifications ? 1 : 0,
        email_notification: appSettings.emailNotifications ? 1 : 0,
        jobseeker_id: user.job_seeker.id,
      };

      notificationMutation.mutate(payload);
    };

    return (
      <div className="space-y-6">
         <h1 className="text-2xl font-bold text-gray-800">App Settings</h1>
          <Card className="bg-[#F7F7FD] border-none">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-500">
                  <Bell className="h-5 w-5" />
                  Notifications & Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3">
                  <p className="text-gray-600">Push Notifications</p>
                  <Switch
                    checked={appSettings.pushNotifications}
                    onCheckedChange={(checked) =>
                      setAppSettings(prev => ({...prev, pushNotifications: checked}))
                    }
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
                <hr/>
                <div className="flex justify-between items-center p-3">
                  <p className="text-gray-600">Email Notifications</p>
                  <Switch
                    checked={appSettings.emailNotifications}
                    onCheckedChange={(checked) =>
                      setAppSettings(prev => ({...prev, emailNotifications: checked}))
                    }
                    className="data-[state=checked]:bg-blue-500"
                  />
                </div>
            </CardContent>
          </Card>
          <div className="flex justify-end pt-6">
              <Button onClick={handleNotificationSave} variant="orange" className="px-8" disabled={notificationMutation.isPending}>
                {notificationMutation.isPending ? 'Saving...' : <><Save className="w-4 h-4 mr-2" />Save Changes</>}
              </Button>
          </div>
      </div>
    );
  }

  const SquadSettings = () => (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Squad Settings</h1>
      <Card className="bg-[#FFF9F6] border border-green-200 rounded-lg">
        <CardHeader>
          <CardTitle className="text-teal-600">Squad Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Pair with Another User (Create Squad Account)</p>
            <Button className="bg-blue-600 text-white">Create Squad</Button>
          </div>
          <hr/>
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Active/Dismantle Current Squad</p>
            <div className="flex gap-2">
              <Button className="bg-green-600 text-white">Activate Squad</Button>
              <Button className="bg-red-600 text-white">Dismantle Squad</Button>
            </div>
          </div>
          <hr/>
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Manage Members in Squad</p>
            <Button className="bg-blue-600 text-white">Manage Members</Button>
          </div>

          <div className="bg-white rounded-lg mt-4">
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">JD</div>
                <div>
                  <p className="font-semibold">John Doe</p>
                  <p className="text-sm text-gray-500">Squad Leader</p>
                </div>
              </div>
              <Button className="bg-gray-700 text-white">Manage</Button>
            </div>
            <hr/>
            <div className="flex justify-between items-center p-3">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold">SM</div>
                <div>
                  <p className="font-semibold">Sarah Miller</p>
                  <p className="text-sm text-gray-500">Member</p>
                </div>
              </div>
              <Button className="bg-red-600 text-white">Remove</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-8 shadow-md bg-white p-4 rounded-md">
      {/* Header */}
      <div className="text-center">
        <div className="bg-[#2A004E] text-white py-8 px-6 rounded-xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">SETTINGS</h1>
          <p className="text-purple-100">Customize your job preferences and account settings</p>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button 
          onClick={() => setActiveTab("job")} 
          variant={activeTab === 'job' ? 'outline' : 'default'}
          className={activeTab === 'job' 
            ? "bg-white rounded-full text-purple-600 border-purple-600" 
            : "bg-[#2A004E] text-white hover:bg-[#2A004E] rounded-full"}
        >
          Job Settings
        </Button>
        <Button 
          onClick={() => setActiveTab("app")} 
          variant={activeTab === 'app' ? 'outline' : 'default'}
          className={activeTab === 'app' 
            ? "bg-white rounded-full text-purple-600 border-purple-600" 
            : "bg-[#2A004E] text-white hover:bg-[#2A004E] rounded-full"}>
          App Settings
        </Button>
        <Button 
          onClick={() => setActiveTab("squad")}
          variant={activeTab === 'squad' ? 'outline' : 'default'}
          className={activeTab === 'squad' 
            ? "bg-white rounded-full text-purple-600 border-purple-600" 
            : "bg-[#2A004E] text-white hover:bg-[#2A004E] rounded-full"}>
          Squad Settings
        </Button>
      </div>

      {renderContent()}
    </div>
  );
}

export default JobSeekerSettings;
