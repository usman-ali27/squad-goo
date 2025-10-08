
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/stores/authStore";
import { useProfileData } from "@/contexts/ProfileDataContext";
import { saveSocialMediaLinks, SocialMediaLinksPayload } from "@/services/profileService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

const SocialMediaLinks = () => {
  const { toast } = useToast();
  const user = useUser();
  const profileData = useProfileData();
  const queryClient = useQueryClient();

  const [links, setLinks] = useState<Omit<SocialMediaLinksPayload, 'id'>>({});

  useEffect(() => {
    if (profileData) {
      const userDetails = profileData.job_seeker || profileData.recruiter || profileData.individual;
      if (userDetails) {
        setLinks({
          facebook: userDetails.facebook,
          twitter: userDetails.twitter,
          instagram: userDetails.instagram,
          linkedin: userDetails.linkedin,
          github: userDetails.github,
        });
      }
    }
  }, [profileData]);

  const mutation = useMutation({
    mutationFn: (payload: { role: string, data: SocialMediaLinksPayload }) => saveSocialMediaLinks(payload.role, payload.data),
    onSuccess: () => {
      toast({ title: "Success", description: "Social media links saved successfully." });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.role, user?.id] });
    },
    onError: (error: any) => {
      const errorMsg = error.response?.data?.message || "An unexpected error occurred.";
      toast({ title: "Error", description: errorMsg, variant: "destructive" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLinks(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && profileData) {
      const { role } = user;
      const userDetails = profileData.job_seeker || profileData.recruiter || profileData.individual;
      
      if (userDetails) {
        const payload = {
          id: userDetails.id,
          facebook: links.facebook || null,
          twitter: links.twitter || null,
          instagram: links.instagram || null,
          linkedin: links.linkedin || null,
          github: links.github || null,
        };
        mutation.mutate({ role, data: payload });
      }
    }
  };

  const socialFields = [
    { id: "linkedin", label: "LinkedIn Profile", placeholder: "https://linkedin.com/in/yourprofile" },
    { id: "facebook", label: "Facebook Profile", placeholder: "https://facebook.com/yourprofile" },
    { id: "twitter", label: "Twitter Profile", placeholder: "https://twitter.com/yourprofile" },
    { id: "instagram", label: "Instagram Profile", placeholder: "https://instagram.com/yourprofile" },
    { id: "github", label: "Github Profile", placeholder: "https://github.com/yourprofile" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Social Media Links</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <Info className="h-5 w-5 text-blue-500" />
        <p className="text-sm text-blue-700">
          These links will only be visible to matched recruiters.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {socialFields.map((field) => (
          <div className="space-y-2" key={field.id}>
            <Label htmlFor={field.id}>{field.label}</Label>
            <Input
              id={field.id}
              placeholder={field.placeholder}
              value={links[field.id as keyof Omit<SocialMediaLinksPayload, 'id'>] || ''}
              onChange={handleChange}
            />
          </div>
        ))}

        <div className="flex justify-end pt-4">
          <Button type="submit" className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto" disabled={mutation.isPending}>
            {mutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <><Save className="w-4 h-4 mr-2" />Save Social Media Links</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SocialMediaLinks;
