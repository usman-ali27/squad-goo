
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  acceptJobOffer,
  getJobOffers,
  requestModification,
} from "@/services/jobSeekerService";
import { useUser } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Calendar as CalendarIcon,
  CircleDollarSign,
  Clock,
  MapPin,
  Tag,
  User,
} from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const JobPool = () => {
  const user = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState("active");
  const [selectedOffer, setSelectedOffer] = useState<any | null>(null);
  const [isModificationOpen, setIsModificationOpen] = useState(false);
  const [newStartTime, setNewStartTime] = useState<Date | undefined>();
  const [newEndTime, setNewEndTime] = useState<Date | undefined>();

  const [modificationDetails, setModificationDetails] = useState({
    new_pay_rate: "",
    modification_note: "",
  });

  const jobseekerId = user?.job_seeker?.id;

  const { data: offers, isLoading } = useQuery({
    queryKey: ["jobOffers", jobseekerId, status],
    queryFn: () =>
      getJobOffers({
        jobseeker_id: jobseekerId!,
        status: status,
      }),
    enabled: !!jobseekerId,
  });

  const { mutate: acceptOffer, isPending: isAccepting } = useMutation({
    mutationFn: acceptJobOffer,
    onSuccess: () => {
      toast({
        title: "Offer Accepted",
        description: "The job offer has been successfully accepted.",
      });
      queryClient.invalidateQueries({ queryKey: ["jobOffers"] });
      setSelectedOffer(null);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "An error occurred while accepting the offer.",
        variant: "destructive",
      });
    },
  });

  const { mutate: requestOfferModification, isPending: isRequesting } = useMutation({
    mutationFn: requestModification,
    onSuccess: () => {
      toast({
        title: "Modification Request Sent",
        description: "Your request has been sent to the recruiter.",
      });
      handleCloseModificationDialog();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description:
          error.response?.data?.message ||
          "An error occurred while sending your request.",
        variant: "destructive",
      });
    },
  });

  const handleAcceptOffer = () => {
    if (selectedOffer && jobseekerId) {
      acceptOffer({
        offer_id: selectedOffer.id,
        jobseeker_id: jobseekerId,
        action: "accept",
      });
    }
  };

  const handleRequestModification = () => {
    if (!modificationDetails.modification_note) {
      toast({
        title: "Modification Note Required",
        description: "Please provide a reason for the modification.",
        variant: "destructive",
      });
      return;
    }
    if (selectedOffer) {
      requestOfferModification({
        job_offer_id: selectedOffer.id,
        user_id: jobseekerId!,
        modification_note: modificationDetails.modification_note,
        new_pay_rate: parseFloat(modificationDetails.new_pay_rate) || undefined,
        new_start_time: newStartTime ? format(newStartTime, "yyyy-MM-dd HH:mm:ss") : undefined,
        new_end_time: newEndTime ? format(newEndTime, "yyyy-MM-dd HH:mm:ss") : undefined,
      });
    }
  };

  const handleCloseModificationDialog = () => {
    setIsModificationOpen(false);
    setSelectedOffer(null);
    setNewStartTime(undefined);
    setNewEndTime(undefined);
    setModificationDetails({
      new_pay_rate: "",
      modification_note: "",
    });
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Job Pool
        </h1>

        {/* Status Buttons */}
        <div className="flex justify-center gap-2 mb-8">
          <Button
            className={`${status === "active"
              ? "bg-purple-700 text-white"
              : "text-gray-600"
              }`}
            variant="ghost"
            onClick={() => setStatus("active")}
          >
            Active Offers
          </Button>
          <Button
            className={`${status === "expired"
              ? "bg-purple-700 text-white"
              : "text-gray-600"
              }`}
            variant="ghost"
            onClick={() => setStatus("expired")}
          >
            Expired Offers
          </Button>
          <Button
            className={`${status === "declined"
              ? "bg-purple-700 text-white"
              : "text-gray-600"
              }`}
            variant="ghost"
            onClick={() => setStatus("declined")}
          >
            Declined Offers
          </Button>
          <Button
            className={`${status === "completed"
              ? "bg-purple-700 text-white"
              : "text-gray-600"
              }`}
            variant="ghost"
            onClick={() => setStatus("completed")}
          >
            Completed Offers
          </Button>
        </div>

        {/* Offers Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-purple-800 text-white">
              <tr>
                <th className="p-4 rounded-l-lg">Job Title</th>
                <th className="p-4">Recruiter</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 rounded-r-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : (
                offers?.data.data.map((offer: any, index: number) => (
                  <tr key={index} className="border-b">
                    <td className="p-4 font-medium">{offer.job_title}</td>
                    <td className="p-4">{offer.recruiter_id || "N/A"}</td>
                    <td className="p-4">{offer.start_date}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${offer.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                          }`}
                      >
                        {offer.status}
                      </span>
                    </td>
                    <td className="p-4 flex gap-2">
                      <Button
                        variant="orange"
                        size="sm"
                        onClick={() => setSelectedOffer(offer)}
                      >
                        View
                      </Button>
                      <Button
                        variant="orange"
                        size="sm"
                        onClick={() => {
                          if (jobseekerId) {
                            acceptOffer({
                              offer_id: offer.id,
                              jobseeker_id: jobseekerId,
                              action: "accept",
                            });
                          }
                        }}
                        disabled={isAccepting}
                      >
                        {isAccepting ? "Accepting..." : "Accept Offer"}
                      </Button>
                      <Button
                        variant="orange"
                        size="sm"
                        onClick={() => {
                          setSelectedOffer(offer);
                          setIsModificationOpen(true);
                        }}
                      >
                        Request Modification
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Offer Dialog */}
      {selectedOffer && !isModificationOpen && (
        <Dialog
          open={!!selectedOffer}
          onOpenChange={() => setSelectedOffer(null)}
        >
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-purple-800 flex items-center">
                <Briefcase className="w-6 h-6 mr-3 text-purple-600" />
                {selectedOffer.job_title}
              </DialogTitle>
              <DialogDescription className="text-md text-gray-500 pt-1">
                {selectedOffer.industry}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Job Description
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {selectedOffer.job_description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-4 border-t">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Work Location</p>
                    <p className="text-gray-600 text-sm">
                      {selectedOffer.work_location}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CircleDollarSign className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Pay Rate</p>
                    <p className="text-gray-600 text-sm">
                      ${selectedOffer.pay_min} - ${selectedOffer.pay_max} per hour
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CalendarIcon className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Start Date</p>
                    <p className="text-gray-600 text-sm">
                      {selectedOffer.start_date}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CalendarIcon className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">End Date</p>
                    <p className="text-gray-600 text-sm">{selectedOffer.end_date}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Tag className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Tax Type</p>
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                      {selectedOffer.tax_type}
                    </span>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Offer Expiry</p>
                    <p className="text-gray-600 text-sm">
                      {selectedOffer.offer_expiry}
                    </p>
                  </div>
                </div>
                <div className="flex items-start col-span-1 md:col-span-2">
                  <User className="w-5 h-5 mr-3 mt-1 text-purple-600 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-700">Recruiter</p>
                    <p className="text-gray-600 text-sm">
                      {selectedOffer.recruiter_id || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="sm:justify-end border-t pt-4">
              <Button
                variant="ghost"
                onClick={() => setSelectedOffer(null)}
                disabled={isAccepting}
              >
                Close
              </Button>
              <Button
                variant="orange"
                onClick={handleAcceptOffer}
                disabled={isAccepting}
              >
                {isAccepting ? "Accepting..." : "Accept Offer"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Request Modification Dialog */}
      {selectedOffer && isModificationOpen && (
        <Dialog
          open={isModificationOpen}
          onOpenChange={handleCloseModificationDialog}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Request Modification</DialogTitle>
              <DialogDescription>
                Propose changes to the job offer and send them to the recruiter for
                approval.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new_pay_rate">New Pay Rate</Label>
                <Input
                  id="new_pay_rate"
                  placeholder="e.g., 40.00"
                  type="number"
                  value={modificationDetails.new_pay_rate}
                  onChange={(e) =>
                    setModificationDetails({
                      ...modificationDetails,
                      new_pay_rate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>New Start Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newStartTime && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newStartTime ? format(newStartTime, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newStartTime}
                        onSelect={setNewStartTime}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>New End Time</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newEndTime && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newEndTime ? format(newEndTime, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={newEndTime}
                        onSelect={setNewEndTime}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="modification_note">Modification Note</Label>
                <Textarea
                  id="modification_note"
                  placeholder="Provide a reason for the modification..."
                  value={modificationDetails.modification_note}
                  onChange={(e) =>
                    setModificationDetails({
                      ...modificationDetails,
                      modification_note: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="ghost"
                onClick={handleCloseModificationDialog}
                disabled={isRequesting}
              >
                Cancel
              </Button>
              <Button
                variant="orange"
                onClick={handleRequestModification}
                disabled={isRequesting}
              >
                {isRequesting ? "Sending..." : "Send Request"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default JobPool;
