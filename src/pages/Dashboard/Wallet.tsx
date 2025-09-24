import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet as WalletIcon, Download, AlertCircle, CreditCard, Receipt, FileText } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const transactions = [
  {
    date: "2023-09-01",
    id: "#TXN12345",
    type: "Purchase",
    amount: "+500",
    status: "Success"
  },
  {
    date: "2023-08-30",
    id: "#TXN12346",
    type: "Withdraw",
    amount: "-250",
    status: "Pending"
  },
  {
    date: "2023-08-20",
    id: "#TXN12347",
    type: "Report",
    amount: "0",
    status: "Failed"
  },
  {
    date: "2023-08-04",
    id: "#TXN12348",
    type: "Purchase",
    amount: "+300",
    status: "Success"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Success": return "bg-green-100 text-green-800";
    case "Pending": return "bg-yellow-100 text-yellow-800";
    case "Failed": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getAmountColor = (amount: string) => {
  if (amount.startsWith("+")) return "text-green-600";
  if (amount.startsWith("-")) return "text-red-600";
  return "text-gray-600";
};

const Wallet = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl lg:text-3xl font-bold mb-4">Wallet</h1>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
        <CardContent className="py-8">
          <div className="text-center">
            <p className="text-purple-100 mb-2">Available Balance</p>
            <h2 className="text-4xl font-bold">1,250 SG Coins</h2>
          </div>
        </CardContent>
      </Card>

      {/* Action Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Transactions */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 p-3 bg-orange-100 rounded-full w-fit">
              <Receipt className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Transactions</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              View all your SG coin transactions from last month
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              View Transactions
            </Button>
          </CardContent>
        </Card>

        {/* Download History */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 p-3 bg-orange-100 rounded-full w-fit">
              <Download className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Download History</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Download a detailed report of your payment history
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Download
            </Button>
          </CardContent>
        </Card>

        {/* Report Issue */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 p-3 bg-orange-100 rounded-full w-fit">
              <AlertCircle className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Report Issue</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Report any transaction or payment irregularities
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Report
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Purchase/Withdraw/Invoice Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Purchase Coins */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 p-3 bg-orange-100 rounded-full w-fit">
              <CreditCard className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Purchase Coins</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Buy SG Coins securely via our platform
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Purchase
            </Button>
          </CardContent>
        </Card>

        {/* Withdraw Coins */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 p-3 bg-orange-100 rounded-full w-fit">
              <WalletIcon className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Withdraw Coins</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Withdraw your SG Coins balance to your bank account
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Withdraw
            </Button>
          </CardContent>
        </Card>

        {/* Invoices & Proofs */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto mb-3 p-3 bg-orange-100 rounded-full w-fit">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-lg">Invoices & Proofs</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Access proof of income and payment invoices for tax purposes
            </p>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Download
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button variant="link" className="text-sm">All Txns</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-purple-600 hover:bg-purple-600">
                  <TableHead className="text-white font-semibold">Date</TableHead>
                  <TableHead className="text-white font-semibold">Transaction ID</TableHead>
                  <TableHead className="text-white font-semibold">Type</TableHead>
                  <TableHead className="text-white font-semibold">Amount</TableHead>
                  <TableHead className="text-white font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-muted/50">
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell className={`font-medium ${getAmountColor(transaction.amount)}`}>
                      {transaction.amount}
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-purple-600 text-white border-purple-600 hover:bg-purple-700"
          >
            1
          </Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
        </div>
      </div>
    </div>
  );
};

export default Wallet;