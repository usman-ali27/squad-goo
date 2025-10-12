
import { useState, useEffect } from "react";
import { useUser } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Bell,
  Shield,
  LifeBuoy,
  AlertTriangle,
  Save,
  Users,
  Briefcase,
  Zap,
  Wrench,
} from "lucide-react";
import { getRecruiterSettings, updateRecruiterSettings, RecruiterSettingsPayload } from "@/services/settingsService";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RecruiterSettings = () => {
  const { toast } = useToast();
  const user = useUser();
  const [activeTab, setActiveTab] = useState("staff");

  const [quickOfferSettings, setQuickOfferSettings] = useState({
    aiAutoMatching: true,
    minBadge: "pro",
    onlyProJobSeekers: false,
    inAppPayments: true,
    squadMatching: true,
  });

  const [manualOfferSettings, setManualOfferSettings] = useState({
    minBadge: "pro",
    onlyProJobSeekers: false,
    squadProfiles: true,
  });

  const [appSettings, setAppSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
  });

  const { data: settingsData, isLoading } = useQuery({
    queryKey: ["recruiterSettings", user?.recruiter?.id],
    queryFn: () => getRecruiterSettings(user!.recruiter!.id),
    enabled: !!user && !!user.recruiter,
  });

  useEffect(() => {
    if (settingsData) {
      const settings = settingsData.data.data;
      setQuickOfferSettings({
        aiAutoMatching: !!settings.quick_ai_auto_matching,
        minBadge: settings.quick_min_badge,
        onlyProJobSeekers: !!settings.quick_only_pro_jobseekers,
        inAppPayments: !!settings.quick_only_inapp_payment,
        squadMatching: !!settings.quick_enable_squad_matching,
      });
      setManualOfferSettings({
        minBadge: settings.manual_min_badge,
        onlyProJobSeekers: !!settings.manual_only_pro_jobseekers,
        squadProfiles: !!settings.manual_enable_squad_profiles,
      });
    }
  }, [settingsData]);

  const mutation = useMutation({
    mutationFn: updateRecruiterSettings,
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
    if (!user || !user.recruiter) return;

    const payload: RecruiterSettingsPayload = {
        recruiter_id: user.recruiter.id,
        quick_ai_auto_matching: quickOfferSettings.aiAutoMatching,
        quick_min_badge: quickOfferSettings.minBadge,
        quick_only_pro_jobseekers: quickOfferSettings.onlyProJobSeekers,
        quick_only_inapp_payment: quickOfferSettings.inAppPayments,
        quick_enable_squad_matching: quickOfferSettings.squadMatching,
        manual_min_badge: manualOfferSettings.minBadge,
        manual_only_pro_jobseekers: manualOfferSettings.onlyProJobSeekers,
        manual_enable_squad_profiles: manualOfferSettings.squadProfiles,
    };

    mutation.mutate(payload);
  };

  const renderContent = () => {
    if (isLoading) {
        return <div>Loading...</div>;
    }

    switch (activeTab) {
      case "staff":
        return <StaffSettings />;
      case "app":
        return <AppSettings />;
      default:
        return <StaffSettings />;
    }
  };

  const StaffSettings = () => (
    <div className="space-y-8 shadow-md bg-white p-4 rounded-md">
      <div className="flex items-center gap-4">
        <Briefcase className="h-8 w-8 text-gray-700" />
        <h1 className="text-2xl font-bold text-gray-800">Staff Preference Settings</h1>
      </div>
      <Card className="bg-[#F7F7FD] border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-500">
            <Zap className="h-5 w-5" />
            Quick Offer Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Enable/disable AI auto matching</p>
            <Switch
              checked={quickOfferSettings.aiAutoMatching}
              onCheckedChange={(checked) =>
                setQuickOfferSettings((prev) => ({ ...prev, aiAutoMatching: checked }))
              }
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
          <hr />
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only Job seeker who have at least following badge</p>
            <Select
              value={quickOfferSettings.minBadge}
              onValueChange={(value) =>
                setQuickOfferSettings((prev) => ({ ...prev, minBadge: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a badge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Bronze">Bronze</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <hr />
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only PRO job seekers</p>
            <Checkbox
              checked={quickOfferSettings.onlyProJobSeekers}
              onCheckedChange={(checked) =>
                setQuickOfferSettings((prev) => ({ ...prev, onlyProJobSeekers: !!checked }))
              }
            />
          </div>
          <hr />
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only profiles that accepts in-app payments</p>
            <Switch
              checked={quickOfferSettings.inAppPayments}
              onCheckedChange={(checked) =>
                setQuickOfferSettings((prev) => ({ ...prev, inAppPayments: checked }))
              }
            />
          </div>
          <hr />
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Enable/Disable Squad matching when needed more than 1 staff</p>
            <Switch
              checked={quickOfferSettings.squadMatching}
              onCheckedChange={(checked) =>
                setQuickOfferSettings((prev) => ({ ...prev, squadMatching: checked }))
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
            <p className="text-gray-600">Only job seeker with minimum following badges</p>
            <Select
              value={manualOfferSettings.minBadge}
              onValueChange={(value) =>
                setManualOfferSettings((prev) => ({ ...prev, minBadge: value }))
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a badge" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Gold">Gold</SelectItem>
                <SelectItem value="Silver">Silver</SelectItem>
                <SelectItem value="Bronze">Bronze</SelectItem>
                <SelectItem value="Pro">Pro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <hr />
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Only Pro job seekers</p>
            <Checkbox
              checked={manualOfferSettings.onlyProJobSeekers}
              onCheckedChange={(checked) =>
                setManualOfferSettings((prev) => ({ ...prev, onlyProJobSeekers: !!checked }))
              }
            />
          </div>
          <hr />
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Enable/Disable Squad profiles when needed more than 1 staff</p>
            <Switch
              checked={manualOfferSettings.squadProfiles}
              onCheckedChange={(checked) =>
                setManualOfferSettings((prev) => ({ ...prev, squadProfiles: checked }))
              }
            />
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
            <p className="text-gray-600">Sign Out (Recruiter ID: #{user?.recruiter?.id})</p>
            <Button variant="outline" className="bg-gray-700 text-white">Sign Out</Button>
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
                setAppSettings(prev => ({ ...prev, pushNotifications: checked }))
              }
              className="data-[state=checked]:bg-blue-500"
            />
          </div>
          <hr />
          <div className="flex justify-between items-center p-3">
            <p className="text-gray-600">Email Notifications</p>
            <Switch
              checked={appSettings.emailNotifications}
              onCheckedChange={(checked) =>
                setAppSettings(prev => ({ ...prev, emailNotifications: checked }))
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

  return (
    <div className="space-y-8 shadow-md bg-white p-4 rounded-md">
      {/* Header */}
      <div className="text-center">
        <div className="bg-[#2A004E] text-white py-8 px-6 rounded-xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">SETTINGS</h1>
          <p className="text-purple-100">Customize your staff preferences and account settings</p>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          onClick={() => setActiveTab("staff")}
          variant={activeTab === 'staff' ? 'outline' : 'default'}
          className={activeTab === 'staff'
            ? "bg-white rounded-full text-purple-600 border-purple-600"
            : "bg-[#2A004E] text-white hover:bg-[#2A004E] rounded-full"}
        >
          Staff Settings
        </Button>
        <Button
          onClick={() => setActiveTab("app")}
          variant={activeTab === 'app' ? 'outline' : 'default'}
          className={activeTab === 'app'
            ? "bg-white rounded-full text-purple-600 border-purple-600"
            : "bg-[#2A004E] text-white hover:bg-[#2A004E] rounded-full"}>
          App Settings
        </Button>
      </div>

      {renderContent()}
    </div>
  );
}

export default RecruiterSettings;
