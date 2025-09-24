
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Eye, 
  Calendar, 
  DollarSign, 
  Clock,
  MapPin,
  User,
  Briefcase,
  Star
} from "lucide-react";

const DashboardCard = ({ title, value, subtext, icon, trend }) => (
  <Card className="shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-xs ${trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
        {subtext}
      </p>
    </CardContent>
  </Card>
);

const JobCard = ({ title, company, location, type, salary, posted, urgent = false }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-4">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-muted-foreground flex items-center gap-1">
            <User className="h-4 w-4" />
            {company}
          </p>
        </div>
        {urgent && (
          <Badge variant="destructive" className="ml-2">Urgent</Badge>
        )}
      </div>
      
      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {location}
        </div>
        <div className="flex items-center gap-1">
          <Briefcase className="h-4 w-4" />
          {type}
        </div>
        <div className="flex items-center gap-1">
          <DollarSign className="h-4 w-4" />
          {salary}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          Posted {posted}
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white">
          Apply Now
        </Button>
        <Button size="sm" variant="outline">
          Save Job
        </Button>
      </div>
    </CardContent>
  </Card>
);

const JobSeekerDashboard = () => {
  const stats = [
    {
      title: 'Applications Sent',
      value: '12',
      subtext: '3 this week',
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      trend: 'up'
    },
    {
      title: 'Profile Views',
      value: '45',
      subtext: '12% increase',
      icon: <Eye className="h-5 w-5 text-blue-500" />,
      trend: 'up'
    },
    {
      title: 'Interviews Scheduled',
      value: '3',
      subtext: '2 this week',
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      trend: 'up'
    },
    {
      title: 'Avg. Response Time',
      value: '2.5 days',
      subtext: 'Industry avg: 4 days',
      icon: <Clock className="h-5 w-5 text-orange-500" />,
      trend: 'neutral'
    }
  ];

  const recentJobs = [
    {
      title: "Frontend Developer",
      company: "Tech Solutions Ltd",
      location: "Sydney, NSW",
      type: "Full-time",
      salary: "$80,000 - $100,000",
      posted: "2 hours ago",
      urgent: true
    },
    {
      title: "Marketing Coordinator",
      company: "Digital Agency",
      location: "Melbourne, VIC",
      type: "Contract",
      salary: "$35/hour",
      posted: "1 day ago"
    },
    {
      title: "Data Analyst",
      company: "Financial Corp",
      location: "Brisbane, QLD",
      type: "Part-time",
      salary: "$65,000 - $75,000",
      posted: "3 days ago"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Welcome back, John!</h1>
          <p className="text-muted-foreground">Here's what's happening with your job search</p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Complete Profile
          </Button>
          <Button variant="outline">
            Browse Jobs
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Job Matches */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recommended Jobs</CardTitle>
              <Button variant="link" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentJobs.map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Completion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Completion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Profile Progress</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Basic Details Complete</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Experience Added</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Skills Section</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    <span>Portfolio/Documents</span>
                  </div>
                </div>
                <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Complete Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Application Sent</p>
                    <p className="text-muted-foreground">Frontend Developer at Tech Corp</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Profile Viewed</p>
                    <p className="text-muted-foreground">By 3 employers</p>
                    <p className="text-xs text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Interview Scheduled</p>
                    <p className="text-muted-foreground">Marketing role at Digital Agency</p>
                    <p className="text-xs text-muted-foreground">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                View Saved Jobs
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Application Status
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Interview Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerDashboard;
