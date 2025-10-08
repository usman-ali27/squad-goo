
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "@/services/apiService";
import { useUser } from "@/stores/authStore";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";

const replySchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

const getStatusClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "closed":
          return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getPriorityClasses = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

const TicketView = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const navigate = useNavigate();
  const user = useUser();
  const queryClient = useQueryClient();

  const { data: ticket, isLoading, isError } = useQuery({
    queryKey: ["ticket", ticketId],
    queryFn: () =>
      apiClient.get(`/support/tickets/${user.id}/${ticketId}`).then((res) => res.data.data),
    enabled: !!user?.id && !!ticketId,
  });

  const replyMutation = useMutation({
    mutationFn: (replyData: { message: string }) => {
      if (!user?.id || !ticketId) throw new Error("Missing user or ticket ID");
      return apiClient.post(`/support/tickets/reply`, {
        ticket_id: ticketId,
        user_id: user.id,
        message: replyData.message,
      });
    },
    onSuccess: () => {
      toast.success("Reply sent successfully!");
      queryClient.invalidateQueries({ queryKey: ["ticket", ticketId] });
      form.reset();
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send reply.");
    },
  });

  const form = useForm<z.infer<typeof replySchema>>({
    resolver: zodResolver(replySchema),
    defaultValues: {
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof replySchema>) => {
    replyMutation.mutate(values);
  };

  if (isLoading) return <div className="p-4">Loading ticket...</div>;
  if (isError) return <div className="p-4 text-red-500">Error loading ticket.</div>;

  return (
    <ScrollArea className="h-full p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-4">
                <span>{ticket.subject}</span>
                <Badge className={getStatusClasses(ticket.status)}>{ticket.status}</Badge>
                <Badge className={getPriorityClasses(ticket.priority)}>{ticket.priority}</Badge>
              </CardTitle>
              <CardDescription className="mt-2">
                Ticket #{ticket.id} | Category: {ticket.category}
              </CardDescription>
            </div>
            <Button type="button" variant="outline" onClick={() => navigate(-1)} className="rounded-md w-full sm:w-auto">
                Go Back
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              {ticket.messages.map((message: any) => (
                <div
                  key={message.id}
                  className={`flex flex-col p-3 rounded-lg ${
                    message.sender_id === user.id
                      ? "bg-blue-100 self-end items-end"
                      : "bg-gray-100 self-start items-start"
                  }`}
                >
                  <p className="font-semibold">
                    {message.sender.name}
                  </p>
                  <p className="text-sm">{message.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(message.created_at), "PPP p")}
                  </p>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-2">Post a Reply</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea placeholder="Type your message here..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={replyMutation.isPending} className="bg-orange-500 hover:bg-orange-600 text-white rounded-md">
                    {replyMutation.isPending ? "Sending..." : "Send Reply"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollArea>
  );
};

export default TicketView;
