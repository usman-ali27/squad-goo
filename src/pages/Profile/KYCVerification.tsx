
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/stores/authStore";
import { useProfileData } from "@/contexts/ProfileDataContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { startIdentityVerification, purchaseResumeVerification } from "@/services/kycService";
import { Loader2 } from "lucide-react";

type KycStatus = 'Not Verified' | 'Pending' | 'Verified' | 'Rejected' | 'Not Started';

const KYCVerification = () => {
  const { toast } = useToast();
  const user = useUser();
  const profileData = useProfileData();
  const queryClient = useQueryClient();

  const kyc = profileData?.kyc || {};
  const identityStatus: KycStatus = kyc.identity_status || 'Not Verified';
  const addressStatus: KycStatus = kyc.address_status || 'Not Verified';
  const resumeStatus: KycStatus = kyc.resume_status || 'Not Started';

  const getStatusBadgeVariant = (status: KycStatus) => {
    switch (status) {
      case 'Verified':
        return 'green';
      case 'Pending':
        return 'yellow';
      case 'Rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const identityMutation = useMutation({
    mutationFn: () => startIdentityVerification(),
    onSuccess: () => {
      toast({ title: "Success", description: "Identity verification process has been initiated." });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.role, user?.id] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to start identity verification.", variant: "destructive" });
    },
  });

  const resumeMutation = useMutation({
    mutationFn: () => purchaseResumeVerification(),
    onSuccess: () => {
      toast({ title: "Success", description: "Resume verification has been purchased and initiated." });
      queryClient.invalidateQueries({ queryKey: ['profile', user?.role, user?.id] });
    },
    onError: (error: any) => {
      toast({ title: "Error", description: error.response?.data?.message || "Failed to purchase resume verification.", variant: "destructive" });
    },
  });

  const handleStartIdentity = () => {
    identityMutation.mutate();
  };

  const handlePurchaseResume = () => {
    resumeMutation.mutate();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">KYC Verification</h2>
        <div className="w-full h-1 bg-orange-500 rounded-full mt-2" />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-700">Identity and Address Verification</h3>
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex-grow">
            <h4 className="font-semibold">Identity Verification</h4>
            <p className="text-sm text-gray-500">Verify your identity using government-issued ID</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Badge variant={getStatusBadgeVariant(identityStatus)}>{identityStatus}</Badge>
            <Button onClick={handleStartIdentity} disabled={identityStatus !== 'Not Verified' || identityMutation.isPending} className="bg-orange-500 hover:bg-orange-600">
              {identityMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {identityStatus === 'Not Verified' ? 'Start Identity Verification' : 'Verification in Progress'}
            </Button>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div className="flex-grow">
            <h4 className="font-semibold">Address Verification</h4>
            <p className="text-sm text-gray-500">Verify your residential address</p>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <Badge variant={getStatusBadgeVariant(addressStatus)}>{addressStatus}</Badge>
            <Button disabled variant="outline">In Progress</Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-700">Resume Verification</h3>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h4 className="font-semibold">Professional Experience Verification</h4>
              <p className="text-sm text-gray-500">Premium service - Manual verification of your work experience and references</p>
              <p className="text-orange-500 font-bold mt-1">$99 AUD</p>
            </div>
            <Badge variant={getStatusBadgeVariant(resumeStatus)}>{resumeStatus}</Badge>
          </div>
          <div className="mt-4">
            <Button onClick={handlePurchaseResume} disabled={resumeStatus !== 'Not Started' || resumeMutation.isPending} className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto">
               {resumeMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Purchase & start verification
            </Button>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-500 mt-4 space-y-1">
            <li>Verified experience badge on profile</li>
            <li>Higher priority in job matching</li>
            <li>Downloadable verification certificate</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
