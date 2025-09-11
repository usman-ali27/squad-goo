import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  HelpCircle, 
  MessageSquare, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  ExternalLink,
  FileText,
  Video,
  Book
} from "lucide-react";

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const tickets = [
    {
      id: "TK-001",
      subject: "Unable to upload resume",
      status: "open",
      priority: "high",
      created: "2 hours ago",
      lastUpdate: "1 hour ago"
    },
    {
      id: "TK-002", 
      subject: "Profile not showing in search results",
      status: "in-progress",
      priority: "medium",
      created: "1 day ago",
      lastUpdate: "3 hours ago"
    },
    {
      id: "TK-003",
      subject: "Payment issue with premium upgrade",
      status: "resolved",
      priority: "high",
      created: "3 days ago",
      lastUpdate: "2 days ago"
    }
  ];

  const faqs = [
    {
      category: "Account & Profile",
      questions: [
        {
          question: "How do I update my profile information?",
          answer: "Go to Profile > Basic Details to update your personal information, contact details, and professional summary."
        },
        {
          question: "Why isn't my profile showing in search results?",
          answer: "Ensure your profile is complete (minimum 80%) and your job preferences are set. Check your privacy settings."
        },
        {
          question: "How can I delete my account?",
          answer: "Contact our support team to permanently delete your account. This action cannot be undone."
        }
      ]
    },
    {
      category: "Job Applications",
      questions: [
        {
          question: "How many jobs can I apply to?",
          answer: "Basic users can apply to 5 jobs per month. Premium users have unlimited applications."
        },
        {
          question: "Can I track my application status?",
          answer: "Yes, go to Dashboard > Applications to see all your applications and their current status."
        },
        {
          question: "How do I withdraw an application?",
          answer: "You can withdraw applications from your Applications page within 24 hours of submission."
        }
      ]
    },
    {
      category: "Billing & Subscriptions",
      questions: [
        {
          question: "How do I upgrade my account?",
          answer: "Go to Account Upgrades to view available plans and upgrade your subscription."
        },
        {
          question: "Can I cancel my subscription anytime?",
          answer: "Yes, you can cancel your subscription at any time. You'll retain access until the current billing period ends."
        },
        {
          question: "Do you offer refunds?",
          answer: "We offer a 7-day money-back guarantee for new premium subscriptions."
        }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "destructive";
      case "in-progress": return "default";
      case "resolved": return "secondary";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-yellow-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Support Center</h1>
        <p className="text-muted-foreground">Get help and find answers to your questions</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 mx-auto mb-4 text-accent" />
            <h3 className="font-semibold mb-2">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Get instant help</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-8 w-8 mx-auto mb-4 text-accent" />
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground">24-48 hour response</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-8 w-8 mx-auto mb-4 text-accent" />
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground">Premium users only</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Book className="h-8 w-8 mx-auto mb-4 text-accent" />
            <h3 className="font-semibold mb-2">Help Docs</h3>
            <p className="text-sm text-muted-foreground">Self-service guides</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Us</TabsTrigger>
        </TabsList>

        {/* Support Tickets */}
        <TabsContent value="tickets" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Support Tickets</h2>
            <Button className="bg-accent hover:bg-accent-hover">
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </div>

          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold">{ticket.subject}</h3>
                        <Badge variant={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                        <span className={`text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority} priority
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ticket #{ticket.id} • Created {ticket.created} • Last updated {ticket.lastUpdate}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {filteredFaqs.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.category}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                      <h3 className="font-medium mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Us */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create Support Ticket</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="ticket-type">Issue Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="account">Account & Profile</SelectItem>
                      <SelectItem value="applications">Job Applications</SelectItem>
                      <SelectItem value="billing">Billing & Subscriptions</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Brief description of your issue" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Please provide detailed information about your issue..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop files here, or <Button variant="link" className="p-0 h-auto">browse</Button>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Supported: PDF, PNG, JPG, DOC (max 10MB)
                  </p>
                </div>
              </div>

              <Button className="w-full bg-accent hover:bg-accent-hover">
                Submit Ticket
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-sm text-muted-foreground mb-3">support@squadgoo.com</p>
                <p className="text-xs text-muted-foreground">Response within 24-48 hours</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-sm text-muted-foreground mb-3">+61 1800 SQUAD</p>
                <p className="text-xs text-muted-foreground">Mon-Fri 9AM-6PM AEST</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-4 text-accent" />
                <h3 className="font-semibold mb-2">Business Hours</h3>
                <p className="text-sm text-muted-foreground mb-3">Monday - Friday</p>
                <p className="text-xs text-muted-foreground">9:00 AM - 6:00 PM AEST</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;