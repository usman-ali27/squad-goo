
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import apiClient from "@/services/apiService";
import { useUser } from "@/stores/authStore";
import { useEffect } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.string().min(1, "Priority is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string().optional(),
  message: z.string().optional(), 
});

const TicketForm = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams<{ ticketId: string }>();
  const isEditMode = !!ticketId;
  const queryClient = useQueryClient();
  const user = useUser();

  const { data: ticketData, isLoading: isTicketLoading } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () => apiClient.get(`/support/tickets/${user.id}/${ticketId}`).then((res) => res.data.data),
    enabled: isEditMode && !!user?.id,
    initialData: () => {
      const tickets = queryClient.getQueryData<any[]>(["tickets", user?.id]);
      if (tickets) {
        return tickets.find((ticket) => ticket.id.toString() === ticketId);
      }
      return undefined;
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      description: "",
      priority: "",
      category: "",
      status: "",
      message: "",
    },
  });

  useEffect(() => {
    if (isEditMode && ticketData) {
      form.reset({
        subject: ticketData.subject,
        description: ticketData.description,
        priority: ticketData.priority,
        category: ticketData.category,
        status: ticketData.status,
      });
    }
    if (!isEditMode) {
        form.reset({
            subject: "",
            description: "",
            priority: "",
            category: "",
            message: "",
        });
    }
  }, [ticketData, isEditMode, form]);

  const mutation = useMutation({
    mutationFn: (ticketValues: z.infer<typeof formSchema>) => {
      if (!user?.id) throw new Error("User not found");
      
      const url = isEditMode ? `/support/tickets/update/${ticketId}` : "/support/tickets";
      const payload = {
        ...ticketValues,
        user_id: user.id,
      };

      return apiClient.post(url, payload);
    },
    onSuccess: () => {
      const successMessage = isEditMode ? "Ticket updated successfully!" : "Ticket created successfully!";
      toast.success(successMessage);
      queryClient.invalidateQueries({ queryKey: ["tickets", user?.id] });
      if(isEditMode) {
        queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      }
      navigate("/dashboard/support");
    },
    onError: (error: any) => {
        const errorMessage = error?.message || (isEditMode ? "Failed to update ticket." : "Failed to create ticket.");
        toast.error(errorMessage);
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutation.mutate(values);
  };

  if (isEditMode && isTicketLoading && !ticketData) {
    return <div className="p-4">Loading ticket details...</div>;
  }

  return (
    <ScrollArea className="h-full p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>{isEditMode ? `Edit Ticket #${ticketId}` : "Create a New Ticket"}</CardTitle>
              <CardDescription>
                {isEditMode ? "Update the details of your support ticket." : "Fill out the form below to open a new support ticket."}
              </CardDescription>
            </div>
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="rounded-md w-full sm:w-auto">
                Go Back
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl><Input placeholder="e.g., Problem with billing" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="e.g., I was charged twice for my plan." {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!isEditMode && (
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea placeholder="Please look into this issue." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select a priority" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                        <SelectItem value="account">Account</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                    </FormItem>
                )}
              />
              {isEditMode && (
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select a status" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="open">Open</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button type="submit" disabled={mutation.isPending} className="bg-orange-500 hover:bg-orange-600 text-white rounded-md">
                {mutation.isPending ? (isEditMode ? "Saving..." : "Creating...") : (isEditMode ? "Save Changes" : "Create Ticket")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default TicketForm;
