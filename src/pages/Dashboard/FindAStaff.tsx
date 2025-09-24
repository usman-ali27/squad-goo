
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Clock } from "lucide-react";

const candidates = [
  {
    name: "Aisha Khan",
    role: "Barista",
    experience: "3 yrs",
    distance: "8 km",
    language: "English",
  },
  {
    name: "John Smith",
    role: "Electrician",
    experience: "5 yrs",
    distance: "12 km",
    language: "English",
  },
  {
    name: "Mei Lin",
    role: "Front Desk",
    experience: "2 yrs",
    distance: "5 km",
    language: "English, Mandarin",
  },
];

const FindAStaff = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">Find A Staff</h1>
            <p className="text-gray-500">Choose Quick Search for guided form or Manual Search for full control</p>
        </div>
        <div className="flex items-center gap-2 bg-gray-200 rounded-full p-1">
            <Button className="bg-purple-600 text-white rounded-full">Quick Search</Button>
            <Button variant="ghost" className="rounded-full">Manual Search</Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-purple-700">Quick Search Form</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-500 mb-6">Fill required fields to run a quick candidate match</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            
            <div>
              <label className="font-semibold text-gray-700">Industry</label>
              <Select defaultValue="hospitality">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Job Title</label>
              <Input placeholder="e.g. Front Desk, Barista, Electrician" />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Work Location</label>
              <Input placeholder="City, Suburb or Address" />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Range from location (km)</label>
              <Input placeholder="e.g. 20" />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Number of staff required</label>
              <Input defaultValue="1" />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Total experience needed (years)</label>
              <Input defaultValue="0" />
            </div>

            <div>
                <label className="font-semibold text-gray-700">Availability to work</label>
                <Select defaultValue="immediate">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="nextweek">Next Week</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
              <label className="font-semibold text-gray-700">Salary & payment</label>
              <Input placeholder="e.g. $25/hr or $300/day" />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Required educational qualifications</label>
              <Input placeholder="e.g. High School / Diploma / Degree" />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Required extra qualifications / certificates</label>
              <Input placeholder="e.g. RSA, First Aid" />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Preferred language</label>
              <Input placeholder="e.g. English" />
            </div>

            <div>
              <label className="font-semibold text-gray-700">Number of locations (optional)</label>
              <Input defaultValue="1" />
            </div>

            <div className="relative">
                <label className="font-semibold text-gray-700">Job start date</label>
                <Input placeholder="mm/dd/yyyy"/>
                <CalendarIcon className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
                <label className="font-semibold text-gray-700">Job start time</label>
                <Input placeholder="-- : --"/>
                <Clock className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
                <label className="font-semibold text-gray-700">Job finish date</label>
                <Input placeholder="mm/dd/yyyy"/>
                <CalendarIcon className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
                <label className="font-semibold text-gray-700">Job finish time</label>
                <Input placeholder="-- : --"/>
                <Clock className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
            </div>
            <div>
                <label className="font-semibold text-gray-700">Offer expiry (minutes from now)</label>
                <Input defaultValue="120"/>
            </div>
          </div>

          <div className="mt-6">
            <label className="font-semibold text-gray-700">Offer / Job description</label>
            <Textarea placeholder="Describe the role, duties and expectations" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mt-6">
            <div>
                <label className="font-semibold text-gray-700">Required Tax Type</label>
                <Select defaultValue="standard">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <label className="font-semibold text-gray-700">Additional requirements</label>
                <Input placeholder="e.g. Police check, uniform" />
            </div>
          </div>

          <div className="mt-6">
            <label className="font-semibold text-gray-700">Map / Range selector</label>
            <div className="h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                Map placeholder — click to choose location
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-500">Offer Expires in: 120 minutes</p>
            <div className="flex gap-2">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Run Quick Search</Button>
                <Button variant="outline">Save Template</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <p className="text-gray-500">Matching candidates will appear here. (Demo list)</p>

        <div className="mt-4">
          <h3 className="text-lg font-semibold">Quick search for "(no title)" — demo results</h3>
          <div className="space-y-4 mt-4">
            {candidates.map((candidate, index) => (
              <Card key={index} className="shadow-md">
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-lg"><span className="text-purple-700">{candidate.name}</span> — {candidate.role}</h4>
                    <p className="text-sm text-gray-600">Exp: {candidate.experience} • {candidate.distance} • {candidate.language}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6">Send Offer</Button>
                    <Button variant="outline" className="rounded-full px-6">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAStaff;
