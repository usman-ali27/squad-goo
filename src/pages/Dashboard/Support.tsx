
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { DateRange } from "react-day-picker";
import Papa from "papaparse";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/services/apiService";
import { format, isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import { useUser } from "@/stores/authStore";
import useDebounce from "@/hooks/useDebounce";
// import { Pagination } from "@/components/ui/Pagination";

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

const Support = () => {
  const user = useUser();
  const queryClient = useQueryClient();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [sortOrder, setSortOrder] = useState('newest');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const entityId = useMemo(() => {
    if (!user) return null;
    switch (user.role) {
      case 'job_seeker':
        return user.job_seeker?.id;
      case 'recruiter':
        return user.recruiter?.id;
      case 'individual':
          return user.individual?.id;
      default:
        return user.id;
    }
  }, [user]);

  const { data: tickets, isLoading, isError } = useQuery({
    queryKey: ["tickets", entityId],
    queryFn: () => apiClient.get(`/support/tickets/get/${entityId}`).then((res) => res.data.data),
    enabled: !!entityId,
  });

  const deleteMutation = useMutation({
    mutationFn: (ticketId: number) => {
        if (!entityId) throw new Error("User not found");
        return apiClient.get(`/support/tickets/delete/${entityId}/${ticketId}`);
    },
    onSuccess: () => {
      toast.success("Ticket deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["tickets", entityId] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete ticket.");
    }
  });

  const filteredAndSortedTickets = useMemo(() => {
    if (!tickets) return [];

    const filtered = tickets.filter((ticket: any) => {
        const term = debouncedSearchTerm.toLowerCase();
        const ticketDate = new Date(ticket.created_at);

        const matchesSearch = (
            ticket.id.toString().toLowerCase().includes(term) ||
            ticket.subject.toLowerCase().includes(term) ||
            ticket.category.toLowerCase().includes(term) ||
            ticket.priority.toLowerCase().includes(term) ||
            ticket.status.toLowerCase().includes(term)
        );
        const matchesStatus = statusFilter === "all" || ticket.status.toLowerCase() === statusFilter;
        const matchesCategory = categoryFilter === "all" || ticket.category.toLowerCase() === categoryFilter;
        const matchesDate = !dateRange?.from || 
            (dateRange.from && isWithinInterval(ticketDate, {
                start: startOfDay(dateRange.from),
                end: dateRange.to ? endOfDay(dateRange.to) : endOfDay(dateRange.from)
            }));

        return matchesSearch && matchesStatus && matchesCategory && matchesDate;
    });

    return [...filtered].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [tickets, debouncedSearchTerm, statusFilter, categoryFilter, dateRange, sortOrder]);

  const paginatedTickets = useMemo(() => {
      return filteredAndSortedTickets.slice((page - 1) * perPage, page * perPage);
  }, [filteredAndSortedTickets, page, perPage]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setDateRange(undefined);
    setPage(1);
  };

  const toggleSortOrder = () => {
      setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest');
  };

  const exportToCSV = () => {
    const csvData = filteredAndSortedTickets.map(ticket => ({
        'Ticket ID': ticket.id,
        'Subject': ticket.subject,
        'Category': ticket.category,
        'Priority': ticket.priority,
        'Status': ticket.status,
        'Created': format(new Date(ticket.created_at), "dd-MM-yyyy"),
        'Updated': format(new Date(ticket.last_message_at), "dd-MM-yyyy"),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'support-tickets.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Tickets exported successfully!");
  };

  return (
    <div className="space-y-8 shadow-md bg-white p-4 rounded-md">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold" style={{color: '#4B0082'}}>Support Tickets</h1>
        <Link to="/dashboard/support/create">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md">Create Ticket</Button>
        </Link>
      </div>
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              <Input 
                placeholder="Search tickets..." 
                className="md:col-span-2" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="account">Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button id="date" variant={"outline"} className="w-full sm:w-[300px] justify-start text-left font-normal text-gray-500">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {
                                dateRange?.from ? (
                                    dateRange.to ? (
                                        <>{format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}</>
                                    ) : (
                                        format(dateRange.from, "LLL dd, y")
                                    )
                                ) : (
                                    <span>Pick a date range</span>
                                )
                            }
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                        </PopoverContent>
                    </Popover>
                  <Button onClick={clearFilters} variant="ghost">Clear Filters</Button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort: <span className="font-semibold text-black">{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span></span>
                    <Button onClick={toggleSortOrder} variant="secondary" size="sm" className="bg-gray-200 text-black hover:bg-gray-300">Toggle</Button>
                  </div>
                  <Button onClick={exportToCSV} variant="secondary" size="sm" className="bg-gray-200 text-black hover:bg-gray-300">Export CSV</Button>
                </div>
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
                {isLoading && <TableRow><TableCell colSpan={8} className="text-center">Loading...</TableCell></TableRow>}
                {isError && <TableRow><TableCell colSpan={8} className="text-center text-red-500">Error fetching tickets</TableCell></TableRow>}
                {!isLoading && !isError && paginatedTickets.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={8} className="text-center text-gray-500 py-4">
                            {debouncedSearchTerm || statusFilter !== 'all' || categoryFilter !== 'all' || dateRange?.from ? 
                                "No tickets match your filters." : 
                                "You have not created any tickets yet."}
                        </TableCell>
                    </TableRow>
                )}
                {paginatedTickets.map((ticket: any) => (
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
                    <TableCell className="text-gray-700">{format(new Date(ticket.created_at), "dd-MM-yyyy")}</TableCell>
                    <TableCell className="text-gray-700">{format(new Date(ticket.last_message_at), "dd-MM-yyyy")}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link to={`/dashboard/support/view/${ticket.id}`}>
                          <Button size="sm" className="bg-gray-200 text-black hover:bg-gray-300">View</Button>
                        </Link>
                        <Link to={`/dashboard/support/edit/${ticket.id}`}>
                          <Button size="sm" className="bg-gray-200 text-black hover:bg-gray-300">Edit</Button>
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="destructive"
                            >
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete this ticket.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                disabled={deleteMutation.isPending}
                                onClick={() => deleteMutation.mutate(ticket.id)}>
                                {deleteMutation.isPending ? "Deleting..." : "Continue"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {/* <div className="mt-4">
            <Pagination 
              page={page}
              total={filteredAndSortedTickets.length}
              perPage={perPage}
              onPageChange={setPage}
              onPerPageChange={setPerPage}
            />
          </div> */}

        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
