
import { useState } from "react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

const tickets = [
  {
    id: "T-10238",
    subject: "Payment declined at checkout",
    category: "Payments",
    priority: "High",
    status: "Open",
    created: "2025-09-03",
    updated: "2025-09-05",
  },
  {
    id: "T-10236",
    subject: "App crashes on Android 14",
    category: "Technical",
    priority: "High",
    status: "Open",
    created: "2025-09-02",
    updated: "2025-09-03",
  },
  {
    id: "T-10234",
    subject: "Cannot login after password reset",
    category: "Account",
    priority: "High",
    status: "Open",
    created: "2025-08-29",
    updated: "2025-09-01",
  },
  {
    id: "T-10235",
    subject: "Refund not received",
    category: "Payments",
    priority: "Normal",
    status: "Pending",
    created: "2025-08-20",
    updated: "2025-08-30",
  },
  {
    id: "T-10239",
    subject: "2FA code not arriving",
    category: "Account",
    priority: "Normal",
    status: "Pending",
    created: "2025-08-12",
    updated: "2025-08-18",
  },
];

const getPriorityClasses = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "normal":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const Support = () => {
  return (
    <div className="space-y-8 shadow-md bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{color: '#4B0082'}}>Support Tickets</h1>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md">Create Ticket</Button>
      </div>
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between gap-4">
              <Input placeholder="Search ticket ID, subject, keywords..." className="max-w-md" />
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="payments">Payments</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                  </SelectContent>
                </Select>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-[150px] justify-start text-left font-normal text-gray-500">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>mm/dd/yyyy</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
                 <Popover>
                  <PopoverTrigger asChild>
                    <Button variant={"outline"} className="w-[150px] justify-start text-left font-normal text-gray-500">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>mm/dd/yyyy</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort: <span className="font-semibold text-black">Newest</span></span>
              <Button variant="secondary" size="sm" className="bg-gray-200 text-black hover:bg-gray-300">Toggle Sort</Button>
              <Button variant="secondary" size="sm" className="bg-gray-200 text-black hover:bg-gray-300">Export CSV</Button>
            </div>
          </div>

          <div className="mt-4 rounded-lg overflow-hidden border">
            <Table>
              <TableHeader style={{backgroundColor: '#4B0082'}}>
                <TableRow>
                  <TableHead className="text-white font-bold">Ticket ID</TableHead>
                  <TableHead className="text-white font-bold">Subject</TableHead>
                  <TableHead className="text-white font-bold">Category</TableHead>
                  <TableHead className="text-white font-bold">Priority</TableHead>
                  <TableHead className="text-white font-bold">Status</TableHead>
                  <TableHead className="text-white font-bold">Created</TableHead>
                  <TableHead className="text-white font-bold">Updated</TableHead>
                  <TableHead className="text-white font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id} className="hover:bg-gray-50 border-b">
                    <TableCell className="text-gray-700">{ticket.id}</TableCell>
                    <TableCell className="text-gray-700">{ticket.subject}</TableCell>
                    <TableCell className="text-gray-700">{ticket.category}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityClasses(ticket.priority)}>{ticket.priority}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusClasses(ticket.status)}>{ticket.status}</Badge>
                    </TableCell>
                    <TableCell className="text-gray-700">{ticket.created}</TableCell>
                    <TableCell className="text-gray-700">{ticket.updated}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-gray-200 text-black hover:bg-gray-300">View</Button>
                        <Button size="sm" className="bg-gray-200 text-black hover:bg-gray-300">Edit</Button>
                        <Button size="sm" className="bg-gray-200 text-black hover:bg-gray-300">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-center items-center gap-2 mt-4">
              <Button variant="default" className="w-8 h-8" style={{backgroundColor: '#4B0082'}} >1</Button>
              <Button variant="outline" className="w-8 h-8">2</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
