
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const FindStaff = () => {
  const [searchType, setSearchType] = useState('quick');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Find A Staff</h1>
        <div className="flex items-center gap-2 p-1 bg-gray-200 rounded-lg">
          <Button 
            size="sm"
            variant={searchType === 'quick' ? 'secondary' : 'ghost'}
            onClick={() => setSearchType('quick')}
            className="w-28"
          >
            Quick Search
          </Button>
          <Button 
            size="sm"
            variant={searchType === 'manual' ? 'secondary' : 'ghost'}
            onClick={() => setSearchType('manual')}
            className="w-28"
          >
            Manual Search
          </Button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
            <div className='mb-6 border-b pb-4'>
                <h3 className="text-lg font-semibold text-gray-800">Quick Search Form</h3>
                <p className='text-sm text-gray-500'>Fill required fields to run a quick candidate match</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Row 1 */}
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Industry</label>
                <Select>
                    <SelectTrigger><SelectValue placeholder="e.g. Hospitality" /></SelectTrigger>
                    <SelectContent> 
                        <SelectItem value="hospitality">Hospitality</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="construction">Construction</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Job Title</label>
                <Input placeholder="e.g. Front Desk, Barista, Electrician" />
              </div>

              {/* Row 2 */}
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Work Location</label>
                <Input placeholder="e.g. Suburb or Address" />
              </div>
              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Range from location (km)</label>
                <Input type="number" placeholder="e.g. 25" />
              </div>

              {/* ... and so on for all the form fields ... */}

              <div className="space-y-2">
                <label className="font-semibold text-gray-700">Offer expiry (minutes from now)</label>
                <Input type="number" defaultValue={120} />
              </div>

            </div>

            <div className="mt-6 space-y-2">
                <label className="font-semibold text-gray-700">Offer / Job description</label>
                <Textarea placeholder="Describe the role, duties and expectations" rows={5} />
            </div>
            
            <div className="mt-8 flex justify-end gap-4">
                <Button variant="outline">Save Template</Button>
                <Button variant="orange">Run Quick Search</Button>
            </div>
            
        </CardContent>
      </Card>

      <div className="mt-8">
          <h3 className='text-lg font-semibold'>Search Results</h3>
          <div className='mt-4 bg-gray-100 h-40 rounded-lg flex items-center justify-center'>
              <p className='text-gray-500'>Matching candidates will appear here. (Demo list)</p>
          </div>
      </div>
    </div>
  );
};

export default FindStaff;
