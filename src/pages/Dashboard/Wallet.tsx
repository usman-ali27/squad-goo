
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const transactions = [
  {
    date: "2025-09-01",
    id: "#TXN12345",
    type: "Purchase",
    amount: "+500",
    status: "Success",
  },
  {
    date: "2025-09-02",
    id: "#TXN12346",
    type: "Withdraw",
    amount: "-200",
    status: "Pending",
  },
  {
    date: "2025-09-03",
    id: "#TXN12347",
    type: "Report",
    amount: "0",
    status: "Failed",
  },
  {
    date: "2025-09-04",
    id: "#TXN12348",
    type: "Purchase",
    amount: "+300",
    status: "Success",
  },
];

const getStatusClasses = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "bg-green-500 text-white";
    case "pending":
      return "bg-yellow-500 text-white";
    case "failed":
      return "bg-red-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

const ActionCard = ({ title, description, buttonText }: { title: string, description: string, buttonText: string }) => (
    <Card className="bg-gray-50 text-center shadow-md">
        <CardHeader>
            <CardTitle className="text-purple-800">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600 mb-4">{description}</p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-md">{buttonText}</Button>
        </CardContent>
    </Card>
);

const Wallet = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-2xl font-bold text-[#2A004E] mb-6">Wallet</h1>

        <div className="bg-[#2A004E] text-white p-6 rounded-lg text-center mb-8">
            <h2 className="text-lg">Available Balance</h2>
            <p className="text-4xl font-bold">1,250 SG Coins</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <ActionCard title="Transactions" description="View all your SG coin transactions history." buttonText="View Transactions" />
            <ActionCard title="Download History" description="Download a detailed report of your past transactions." buttonText="Download" />
            <ActionCard title="Report Issue" description="Report any suspicious or incorrect transactions." buttonText="Report" />
            <ActionCard title="Purchase Coins" description="Buy SG Coins securely using available payment options." buttonText="Purchase" />
            <ActionCard title="Withdraw Coins" description="Withdraw your SG Coins balance to your bank/wallet." buttonText="Withdraw" />
            <ActionCard title="Invoices & Proofs" description="Send invoices or request payment proof after each transaction." buttonText="Manage" />
        </div>

        <div className="flex justify-between items-center mb-4">
            <Input placeholder="Search transactions..." className="max-w-xs" />
            <Button variant="secondary" className="bg-gray-200 text-black">All Types</Button>
        </div>

        <div className="rounded-lg overflow-hidden border">
              <Table>
                <TableHeader className="bg-[#2A004E]">
                  <TableRow>
                    <TableHead className="text-white font-bold">Date</TableHead>
                    <TableHead className="text-white font-bold">Transaction ID</TableHead>
                    <TableHead className="text-white font-bold">Type</TableHead>
                    <TableHead className="text-white font-bold">Amount</TableHead>
                    <TableHead className="text-white font-bold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 border-b">
                      <TableCell className="text-gray-700">{transaction.date}</TableCell>
                      <TableCell className="text-gray-700 font-medium">{transaction.id}</TableCell>
                      <TableCell className="text-gray-700">{transaction.type}</TableCell>
                      <TableCell className={`font-semibold ${transaction.amount.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>{transaction.amount}</TableCell>
                      <TableCell>
                        <Badge className={getStatusClasses(transaction.status)}>{transaction.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex justify-center items-center gap-2 mt-4">
                <Button className="bg-[#2A004E] text-white w-8 h-8">1</Button>
                <Button variant="outline" className="w-8 h-8">2</Button>
                <Button variant="outline" className="w-8 h-8">3</Button>
            </div>
    </div>
  );
};

export default Wallet;
