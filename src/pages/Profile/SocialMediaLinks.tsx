import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Linkedin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Github, 
  Globe, 
  Info,
  ExternalLink 
} from "lucide-react";

const SocialMediaLinks = () => {
  const socialPlatforms = [
    {
      id: "linkedin",
      name: "LinkedIn Profile",
      icon: Linkedin,
      placeholder: "http://linkedin.com/in/yourprofile",
      description: "Professional networking profile"
    },
    {
      id: "facebook", 
      name: "Facebook Profile",
      icon: Facebook,
      placeholder: "http://facebook.com/in/yourprofile",
      description: "Personal social media profile"
    },
    {
      id: "twitter",
      name: "Twitter Profile", 
      icon: Twitter,
      placeholder: "http://twitter.com/in/yourprofile",
      description: "Microblogging and social updates"
    },
    {
      id: "instagram",
      name: "Instagram Profile",
      icon: Instagram,
      placeholder: "http://instagram.com/in/yourprofile", 
      description: "Photo and video sharing"
    },
    {
      id: "github",
      name: "GitHub Profile",
      icon: Github,
      placeholder: "http://github.com/in/yourprofile",
      description: "Code repository and projects"
    },
    {
      id: "portfolio",
      name: "Portfolio Website",
      icon: Globe,
      placeholder: "https://yourportfolio.com",
      description: "Personal website or portfolio"
    }
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">Social Media Links</h1>
          <p className="text-sm text-muted-foreground mt-1">Add your social media profiles and professional links</p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            These links will only be visible to matched recruiters and employers. Make sure your profiles are professional and up-to-date.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Professional & Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.id} className="space-y-2">
                  <Label htmlFor={platform.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {platform.name}
                  </Label>
                  <div className="flex gap-2">
                    <Input 
                      id={platform.id}
                      type="url"
                      placeholder={platform.placeholder}
                      className="flex-1"
                    />
                    <Button variant="outline" size="icon" className="flex-shrink-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {platform.description}
                  </p>
                </div>
              );
            })}

            {/* Additional Links Section */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-medium">Additional Professional Links</h3>
              
              <div className="space-y-2">
                <Label htmlFor="behance">Behance Portfolio</Label>
                <Input 
                  id="behance"
                  type="url"
                  placeholder="https://behance.net/yourprofile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dribbble">Dribbble Profile</Label>
                <Input 
                  id="dribbble"
                  type="url"
                  placeholder="https://dribbble.com/yourprofile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="medium">Medium Blog</Label>
                <Input 
                  id="medium"
                  type="url"
                  placeholder="https://medium.com/@yourprofile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stackoverflow">Stack Overflow Profile</Label>
                <Input 
                  id="stackoverflow"
                  type="url"
                  placeholder="https://stackoverflow.com/users/yourprofile"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube Channel</Label>
                <Input 
                  id="youtube"
                  type="url"
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="personal">Personal Website</Label>
                <Input 
                  id="personal"
                  type="url"
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            {/* Profile Visibility Settings */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-lg font-medium">Privacy Settings</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Show links to all employers</p>
                    <p className="text-sm text-muted-foreground">Allow all employers to see your social media links</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Show links to matched employers only</p>
                    <p className="text-sm text-muted-foreground">Only show links after successful job matching</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Keep all links private</p>
                    <p className="text-sm text-muted-foreground">Don't show any social media links to employers</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button className="w-full sm:w-auto">
            Save Social Media Links
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaLinks;