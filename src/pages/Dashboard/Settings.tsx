import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Target, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const Settings = () => {
  const [date, setDate] = useState<Date>();
  const [quickOfferSettings, setQuickOfferSettings] = useState({
    directPayments: true,
    enoughBalance: false,
    proRecruiter: false
  });
  
  const [manualOfferSettings, setManualOfferSettings] = useState({
    proRecruiter: false
  });

  const [individualSettings, setIndividualSettings] = useState({
    proRecruiter: false,
    platformPayments: true,
    selectedIndustries: false
  });

  const [selectedIndustries, setSelectedIndustries] = useState({
    technology: false,
    healthcare: false,
    finance: false,
    retail: false,
    manufacturing: false,
    education: false
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-8 px-6 rounded-xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">SETTINGS</h1>
          <p className="text-purple-100">Customize your job preferences and account settings</p>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2">
        <Button variant="outline" className="bg-white">Job Settings</Button>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">App Settings</Button>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">Squad Settings</Button>
      </div>

      {/* Job Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Job Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Job Offer Preferences */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Target className="h-4 w-4 text-red-500" />
              Job Offer Preferences
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Type of Job Offer Preference</label>
                <div className="mt-1 text-sm text-muted-foreground">Both Manual & Quick</div>
              </div>
              <div>
                <label className="text-sm font-medium">Offers from User Type Preference</label>
                <div className="mt-1 text-sm text-muted-foreground">Individual & Recruiter</div>
              </div>
            </div>
          </div>

          {/* Quick Offer Settings */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Clock className="h-4 w-4 text-yellow-500" />
              Quick Offer Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Only receive offers where payments are handled directly from platform</div>
                </div>
                <Switch 
                  checked={quickOfferSettings.directPayments}
                  onCheckedChange={(checked) => 
                    setQuickOfferSettings(prev => ({ ...prev, directPayments: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Only receive offers where recruiter has enough balance for full hours</div>
                </div>
                <Switch 
                  checked={quickOfferSettings.enoughBalance}
                  onCheckedChange={(checked) => 
                    setQuickOfferSettings(prev => ({ ...prev, enoughBalance: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Only get offers from PRO BADGE or above recruiters/individuals</div>
                </div>
                <Switch 
                  checked={quickOfferSettings.proRecruiter}
                  onCheckedChange={(checked) => 
                    setQuickOfferSettings(prev => ({ ...prev, proRecruiter: checked }))
                  }
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">Quick Offer Availability Settings</h4>
                <p className="text-sm text-orange-700">
                  Calendar widget for selecting available dates and times. 
                  Click to set your availability for quick offers.
                </p>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full mt-3 justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select availability dates"}
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
            </div>
          </div>

          {/* Manual Offer Settings */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Users className="h-4 w-4 text-blue-500" />
              Manual Offer Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Only get offers from PRO BADGE or above recruiters/individuals</div>
                </div>
                <Switch 
                  checked={manualOfferSettings.proRecruiter}
                  onCheckedChange={(checked) => 
                    setManualOfferSettings(prev => ({ ...prev, proRecruiter: checked }))
                  }
                />
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">Manual Offer Availability Settings</h4>
                <p className="text-sm text-orange-700">
                  Calendar widget for selecting available dates and times. 
                  Click to set your availability for manual offers.
                </p>
              </div>
            </div>
          </div>

          {/* Individual Offers Settings */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Users className="h-4 w-4 text-blue-500" />
              Individual Offers Settings
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Only get offers from PRO BADGE or above recruiters/individuals</div>
                </div>
                <Switch 
                  checked={individualSettings.proRecruiter}
                  onCheckedChange={(checked) => 
                    setIndividualSettings(prev => ({ ...prev, proRecruiter: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Only accept offers where payments are handled by platform</div>
                </div>
                <Switch 
                  checked={individualSettings.platformPayments}
                  onCheckedChange={(checked) => 
                    setIndividualSettings(prev => ({ ...prev, platformPayments: checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium">Only receive offers related to selected Industries</div>
                </div>
                <Switch 
                  checked={individualSettings.selectedIndustries}
                  onCheckedChange={(checked) => 
                    setIndividualSettings(prev => ({ ...prev, selectedIndustries: checked }))
                  }
                />
              </div>

              {/* Industry Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                {Object.entries(selectedIndustries).map(([key, checked]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox 
                      id={key}
                      checked={checked}
                      onCheckedChange={(checked) => 
                        setSelectedIndustries(prev => ({ ...prev, [key]: checked as boolean }))
                      }
                    />
                    <label htmlFor={key} className="text-sm capitalize cursor-pointer">
                      {key}
                    </label>
                  </div>
                ))}
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2">Individual Offers Availability Settings</h4>
                <p className="text-sm text-orange-700">
                  Calendar widget for selecting available dates and times. 
                  Click to set your availability for individual offers.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;