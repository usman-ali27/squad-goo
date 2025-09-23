
import { useUser } from "@/stores/authStore";
import RecruiterDashboard from "./RecruiterDashboard";
import JobSeekerDashboard from "./JobSeekerDashboard";

const DashboardPage = () => {
  const user = useUser();
  
  if (!user) return null; // Or a loading spinner

  return user.role === 'recruiter' ? <RecruiterDashboard /> : <JobSeekerDashboard />;
};

export default DashboardPage;
