
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock, MapPin, Zap } from "lucide-react";

const FindStaffPage = () => {
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
            <Button className="bg-purple-800 hover:bg-purple-900 text-white rounded-md px-8 py-3">Quick Search</Button>
            <Button variant="outline" className="bg-gray-200 text-black rounded-md px-8 py-3">Manual Search</Button>
            </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <Card className="shadow-2xl bg-white">
          <CardContent className="p-8">
            <div className="flex items-center gap-2 mb-8">
                <Zap className="text-yellow-500"/>
                <h2 className="text-2xl font-bold">Quick Search</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label>Industry *</label>
                <Select><SelectTrigger><SelectValue placeholder="Select Industry" /></SelectTrigger><SelectContent><SelectItem value="tech">Tech</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <label>Job Title *</label>
                <Input placeholder="e.g. Software Developer" />
              </div>
              <div className="space-y-2">
                <label>Work Location *</label>
                <Input placeholder="City, State" />
              </div>
              <div className="space-y-2">
                <label>Number of Staff Required *</label>
                <Input placeholder="e.g. 5" />
              </div>
              <div className="space-y-2">
                <label>Total Experience Needed</label>
                <Select><SelectTrigger><SelectValue placeholder="Select Experience Level" /></SelectTrigger><SelectContent><SelectItem value="entry">Entry</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <label>Availability to Work</label>
                <Select><SelectTrigger><SelectValue placeholder="Select Availability" /></SelectTrigger><SelectContent><SelectItem value="immediate">Immediate</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <label>Salary Range</label>
                <Input placeholder="e.g. $50,000 - $70,000" />
              </div>
              <div className="space-y-2">
                <label>Payment Type</label>
                <Select><SelectTrigger><SelectValue placeholder="Select Payment Type" /></SelectTrigger><SelectContent><SelectItem value="hourly">Hourly</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <label>Required Educational Qualifications</label>
                <Select><SelectTrigger><SelectValue placeholder="Select Education Level" /></SelectTrigger><SelectContent><SelectItem value="bachelors">Bachelor's</SelectItem></SelectContent></Select>
              </div>
              <div className="space-y-2">
                <label>Extra Qualifications & Certificates</label>
                <Input placeholder="e.g. AWS Certification, PMP" />
              </div>
               <div className="space-y-2">
                <label>Preferred Language</label>
                <Select><SelectTrigger><SelectValue placeholder="Select Language" /></SelectTrigger><SelectContent><SelectItem value="english">English</SelectItem></SelectContent></Select>
              </div>
               <div className="space-y-2">
                <label>Required Tax Type</label>
                <Select><SelectTrigger><SelectValue placeholder="Select Tax Type" /></SelectTrigger><SelectContent><SelectItem value="w2">W2</SelectItem></SelectContent></Select>
              </div>
            </div>

            <div className="mt-8">
              <label className="font-semibold">Range from Location (Map)</label>
              <div className="bg-gray-100 rounded-lg p-8 text-center mt-2">
                <MapPin className="mx-auto text-red-500 mb-2"/>
                <p className="text-gray-600">Interactive map will be displayed here</p>
                <p className="text-sm text-gray-500">Click to set search radius from work location</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 bg-yellow-50 p-4 rounded-lg">
                <div className="space-y-2">
                    <label>Job Start Date & Time</label>
                    <div className="flex gap-2">
                        <div className="relative w-full">
                            <Input placeholder="mm/dd/yyyy" type="text" className="pr-10" />
                            <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                         <div className="relative w-full">
                            <Input placeholder="--:--" type="text" className="pr-10" />
                            <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                 <div className="space-y-2">
                    <label>Job Finish Date & Time</label>
                    <div className="flex gap-2">
                         <div className="relative w-full">
                            <Input placeholder="mm/dd/yyyy" type="text" className="pr-10" />
                            <CalendarIcon className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                         <div className="relative w-full">
                            <Input placeholder="--:--" type="text" className="pr-10" />
                            <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label>Offer Expiry Timer</label>
                     <Select><SelectTrigger><SelectValue placeholder="Select Expiry Time" /></SelectTrigger><SelectContent><SelectItem value="1hour">1 Hour</SelectItem></SelectContent></Select>
                </div>
                <div className="col-span-1 md:col-span-3 space-y-2">
                    <label>Additional Requirements</label>
                    <Input placeholder="Any special requirements before work" />
                </div>
            </div>

            <div className="mt-6">
              <label>Offer/Job Description</label>
              <Textarea placeholder="Describe the role, responsibilities, and expectations..." className="min-h-[120px]"/>
            </div>

            <div className="text-center mt-8">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md px-12 py-6 text-lg">Start Quick Search</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FindStaffPage;
