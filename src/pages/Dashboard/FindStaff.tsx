import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const FindStaff = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("quick");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Find A Staff</h1>
          <p className="text-muted-foreground">Choose Quick Search for guided form or Manual Search for full control</p>
        </div>
        
        <div className="flex gap-2">
          <Select value="Quick Search" onValueChange={() => {}}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Quick Search">Quick Search</SelectItem>
              <SelectItem value="Manual Search">Manual Search</SelectItem>
            </SelectContent>
          </Select>
          
          <Button 
            variant={activeTab === "quick" ? "default" : "outline"}
            onClick={() => setActiveTab("quick")}
            className="bg-purple-600 text-white hover:bg-purple-700"
          >
            Quick Search
          </Button>
          
          <Button 
            variant={activeTab === "manual" ? "default" : "outline"}
            onClick={() => setActiveTab("manual")}
          >
            Manual Search
          </Button>
        </div>
      </div>

      {/* Quick Search Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-purple-600">Quick Search Form</CardTitle>
          <p className="text-sm text-muted-foreground">Fill required fields to run a quick candidate match</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Hospitality" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Work Location</Label>
                <Input placeholder="City, Suburb or Address" />
              </div>

              <div>
                <Label htmlFor="staff-count">Number of staff required</Label>
                <Input type="number" defaultValue="1" />
              </div>

              <div>
                <Label htmlFor="availability">Availability to work</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Immediate" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="within-week">Within a week</SelectItem>
                    <SelectItem value="within-month">Within a month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="qualifications">Required educational qualifications</Label>
                <Input placeholder="e.g. High School / Diploma / Degree" />
              </div>

              <div>
                <Label htmlFor="certificates">Required extra qualifications / certificates</Label>
                <Input placeholder="e.g. RSA, First Aid" />
              </div>

              <div>
                <Label htmlFor="language">Preferred language</Label>
                <Input placeholder="e.g. English" />
              </div>

              <div>
                <Label htmlFor="start-date">Job start date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="end-date">Job finish date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "MM/dd/yyyy") : "mm/dd/yyyy"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="expiry">Offer expiry (minutes from now)</Label>
                <Input type="number" defaultValue="120" />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="job-title">Job Title</Label>
                <Input placeholder="e.g. Front Desk, Barista, Electrician" />
              </div>

              <div>
                <Label htmlFor="range">Range from location (km)</Label>
                <Input placeholder="e.g. 20" />
              </div>

              <div>
                <Label htmlFor="experience">Total experience needed (years)</Label>
                <Input type="number" defaultValue="0" />
              </div>

              <div>
                <Label htmlFor="salary">Salary & payment</Label>
                <Input placeholder="e.g. $25/hr or $300/day" />
              </div>

              <div>
                <Label htmlFor="locations">Number of locations (optional)</Label>
                <Input type="number" defaultValue="1" />
              </div>

              <div>
                <Label htmlFor="start-time">Job start time</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="--:-- --" />
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <Label htmlFor="finish-time">Job finish time</Label>
                <div className="flex items-center gap-2">
                  <Input placeholder="--:-- --" />
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Offer / Job description</Label>
                <Textarea 
                  placeholder="Describe the role, duties and expectations"
                  className="min-h-[120px]"
                />
              </div>

              <div>
                <Label htmlFor="tax-type">Required Tax Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Standard" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="abn">ABN</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="requirements">Additional requirements</Label>
                <Input placeholder="e.g. Police check, uniform" />
              </div>

              <div>
                <Label htmlFor="map-selector">Map / Range selector</Label>
                <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-8 w-8 mx-auto mb-2" />
                    <p>Map placeholder — click to choose location</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground py-4">
            Offer Expires in: 120 minutes
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8">
              Run Quick Search
            </Button>
            <Button variant="outline" className="px-8">
              Save Template
            </Button>
          </div>

          {/* Search Results */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Matching candidates will appear here. (Demo list)
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default FindStaff;