
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

const socialLinks = [
  { id: "linkedin", label: "LinkedIn Profile", placeholder: "http://linkedin.com/in/yourprofile" },
  { id: "facebook", label: "Facebook Profile", placeholder: "http://facebook.com/in/yourprofile" },
  { id: "twitter", label: "Twitter Profile", placeholder: "http://twitter.com/in/yourprofile" },
  { id: "instagram", label: "Instagram Profile", placeholder: "http://instagram.com/in/yourprofile" },
  { id: "github", label: "GitHub Profile", placeholder: "http://github.com/in/yourprofile" },
];

const SocialMediaLinks = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Social Media Links</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <Info className="h-5 w-5 text-blue-500" />
        <p className="text-sm text-blue-700">
          These links will only be visible to matched recruiters
        </p>
      </div>

      <form className="space-y-6">
        {socialLinks.map((link) => (
          <div className="space-y-2" key={link.id}>
            <Label htmlFor={link.id}>{link.label}</Label>
            <Input id={link.id} placeholder={link.placeholder} />
          </div>
        ))}

        <div className="flex justify-start pt-4">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
            Save Social Media Links
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SocialMediaLinks;
