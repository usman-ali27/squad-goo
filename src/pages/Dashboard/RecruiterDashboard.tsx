
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardCard = ({ title, value, subtext, icon, increased }) => (
    <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-3xl font-bold">{value}</div>
            <p className={`text-xs ${increased ? 'text-green-500' : 'text-red-500'}`}>{subtext}</p>
        </CardContent>
    </Card>
);

const RecruiterDashboard = () => {
    const stats = [
        { 
            title: 'Active Offers', 
            value: '04', 
            subtext: '2 Quick | 1 Manual', 
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400"><path d="M18 9v6m-6-6v6m-6-6v6M4 21h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1z"/></svg>,
            increased: null
        },
        { 
            title: 'Acceptance Rate', 
            value: '84%', 
            subtext: 'Good', 
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
            increased: null
        },
        { 
            title: 'This Month Earning', 
            value: '123.50', 
            subtext: '54% Increased', 
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
            increased: true
        },
        { 
            title: 'Profile Views', 
            value: '40', 
            subtext: '54% Decreased', 
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
            increased: false
        },
    ];

    return (
        <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map(stat => <DashboardCard key={stat.title} {...stat} />)}
            </div>
            {/* The rest of the dashboard content will go here */}
        </div>
    );
}

export default RecruiterDashboard;
