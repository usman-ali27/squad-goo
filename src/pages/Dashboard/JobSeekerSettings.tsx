
import { useState } from "react";
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
import { updateJobSeekerSettings, JobSeekerSettingsPayload } from "@/services/settingsService";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

const JobSeekerSettings = () => {
  const { toast } = useToast();
  const user = useUser();
  const [activeTab, setActiveTab] = useState("job");
  const [date, setDate] = useState<Date>();

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
  
  const [selectedIndustries, setSelectedIndustries] = useState({
    technology: false,
    healthcare: false,
    finance: false,
    retail: false,
    manufacturing: false,
    education: false,
  });

  const [appSettings, setAppSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
  });

  const mutation = useMutation({
    mutationFn: updateJobSeekerSettings,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.data.message || "Your settings have been updated successfully.",
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

  const handleSave = () => {
    if (!user || user.role !== 'job_seeker') return;

    const payload: JobSeekerSettingsPayload = {
      offer_preference_type: "both",
      offer_from_preference: "both",
      quick_offer_only_platform_payment: quickOfferSettings.directPayments,
      quick_offer_only_full_balance: quickOfferSettings.enoughBalance,
      quick_offer_only_from_pro: quickOfferSettings.proRecruiter,
      manual_offer_only_from_pro: manualOfferSettings.proRecruiter,
      individual_offer_only_from_pro: individualOfferSettings.proRecruiter,
      individual_offer_only_platform_payment: individualOfferSettings.platformPayments,
      individual_offer_industries: Object.entries(selectedIndustries)
        .filter(([, checked]) => checked)
        .map(([key]) => key),
      jobseeker_id: user.id,
    };

    mutation.mutate(payload);
  };

  const renderContent = () => {
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
            <div className="bg-white border border-gray-200 rounded-md px-4 py-2 text-sm">Both Manual & Quick</div>
          </div>
          <hr/>
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Offers from User Type Preference</p>
            <div className="bg-white border border-gray-200 rounded-md px-4 py-2 text-sm">Individual & Recruiter</div>
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

          <div className="bg-[#EFECF8] rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-gray-800 mb-4">Quick Offer Availability Settings</h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-center text-center font-normal bg-white py-10 flex-col h-auto",
                    !date && "text-muted-foreground"
                  )}
                >
                  <div>Calendar widget for selecting available dates and times</div>
                  <div className="text-xs">Click to set your availability for quick offers</div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
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
          <div className="bg-[#FFF9F6] border border-[#F9EAE1] rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-orange-600 mb-4">Manual Offer Availability Settings</h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-center text-center font-normal bg-white py-10 flex-col h-auto"
                >
                  <div>Calendar widget for selecting available dates and times</div>
                  <div className="text-xs">Click to set your availability for manual offers</div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
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

          <div className="grid grid-cols-4 gap-4 p-3 bg-white rounded-md">
            {Object.entries(selectedIndustries).map(([key, checked]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={checked}
                  onCheckedChange={(checked) =>
                    setSelectedIndustries((prev) => ({ ...prev, [key]: checked as boolean }))
                  }
                />
                <label htmlFor={key} className="text-sm capitalize cursor-pointer text-gray-600">
                  {key}
                </label>
              </div>
            ))}
          </div>

          <div className="bg-[#FFF9F6] border border-[#F9EAE1] rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-orange-600 mb-4">Individual Offers Availability Settings</h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-center text-center font-normal bg-white py-10 flex-col h-auto"
                >
                  <div>Calendar widget for selecting available dates and times</div>
                  <div className="text-xs">Click to set your availability for individual offers</div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
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

  const AppSettings = () => (
    <div className="space-y-6">
       <h1 className="text-2xl font-bold text-gray-800">App Settings</h1>
        <Card className="bg-[#F7F7FD] border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
                <Users className="h-5 w-5" />
                Account Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3">
                <p className="text-gray-600">Sign Out (Job Seeker ID: #JS12345)</p>
                <Button variant="outline" className="bg-gray-700 text-white">Sign Out</Button>
              </div>
              <hr/>
              <div className="flex justify-between items-center p-3">
                <p className="text-gray-600">Manage Account/Profile</p>
                <Button variant="outline" className="bg-blue-600 text-white">Manage Profile</Button>
              </div>
              <hr/>
              <div className="flex justify-between items-center p-3">
                <p className="text-gray-600">Switch Profile</p>
                <Button variant="outline" className="bg-purple-600 text-white">Switch to Squad Profile</Button>
              </div>
          </CardContent>
        </Card>

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
        
        <Card className="bg-[#F7F7FD] border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <Shield className="h-5 w-5" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-3">
              <p className="text-gray-600">Security and Passwords</p>
              <Button className="bg-blue-600 text-white">Manage Security</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F7F7FD] border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <LifeBuoy className="h-5 w-5" />
              Support & Help
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-3">
              <p className="text-gray-600">Tips & Help</p>
              <Button className="bg-green-600 text-white">Get Help</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#F7F7FD] border-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-600">
              <AlertTriangle className="h-5 w-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center p-3">
              <p className="text-gray-600">Close Your Account Permanently</p>
              <Button className="bg-red-600 text-white">Delete Account</Button>
            </div>
          </CardContent>
        </Card>
    </div>
  );

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
