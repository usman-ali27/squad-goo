import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Clock,
  Search,
  Plus
} from "lucide-react";

// Mock data - in real app this would come from API
const USER_TYPE = "jobseeker"; // or "recruiter"

const DashboardHome = () => {
  if (USER_TYPE === "jobseeker") {
    return (
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Welcome back, Pusparaj!</h1>
            <p className="text-muted-foreground">Find your next opportunity and track your applications</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Search className="h-4 w-4 mr-2" />
            Find Jobs
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 unread</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">Interview rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Applications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { company: "TechCorp", position: "Frontend Developer", status: "pending", time: "2 days ago" },
                { company: "StartupXYZ", position: "React Developer", status: "interview", time: "5 days ago" },
                { company: "BigTech Inc", position: "Senior Developer", status: "rejected", time: "1 week ago" },
              ].map((app, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{app.position}</p>
                    <p className="text-xs text-muted-foreground">{app.company} • {app.time}</p>
                  </div>
                  <Badge 
                    variant={app.status === "pending" ? "secondary" : app.status === "interview" ? "default" : "destructive"}
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended Jobs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { company: "InnovateNow", position: "Full Stack Developer", location: "Remote", posted: "1 day ago" },
                { company: "FutureTech", position: "UI/UX Developer", location: "Sydney", posted: "3 days ago" },
                { company: "CloudSoft", position: "Frontend Engineer", location: "Melbourne", posted: "5 days ago" },
              ].map((job, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{job.position}</p>
                    <p className="text-xs text-muted-foreground">{job.company} • {job.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{job.posted}</p>
                    <Button size="sm" variant="outline" className="mt-1">Apply</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Recruiter Dashboard
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Pusparaj!</h1>
          <p className="text-muted-foreground">Manage your job postings and find the best candidates</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Post Job
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+2 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+23 this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">5 scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hired</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Applications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Sarah Johnson", position: "Frontend Developer", time: "2 hours ago", rating: "5.0" },
              { name: "Mike Chen", position: "React Developer", time: "5 hours ago", rating: "4.8" },
              { name: "Emily Davis", position: "UI Developer", time: "1 day ago", rating: "4.9" },
            ].map((candidate, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{candidate.name}</p>
                  <p className="text-xs text-muted-foreground">{candidate.position} • {candidate.time}</p>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">⭐ {candidate.rating}</Badge>
                  <Button size="sm" variant="outline" className="mt-1 ml-2">View</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Job Postings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Senior React Developer", applications: "23", posted: "5 days ago" },
              { title: "Frontend Engineer", applications: "18", posted: "1 week ago" },
              { title: "UI/UX Developer", applications: "31", posted: "2 weeks ago" },
            ].map((job, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{job.title}</p>
                  <p className="text-xs text-muted-foreground">{job.applications} applications • {job.posted}</p>
                </div>
                <Button size="sm" variant="outline">Manage</Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardHome;