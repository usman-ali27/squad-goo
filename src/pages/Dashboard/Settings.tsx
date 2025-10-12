
import { useUser } from "@/stores/authStore";
import JobSeekerSettings from "./JobSeekerSettings";
import RecruiterSettings from "./RecruiterSettings";

const Settings = () => {
  const user = useUser();
  const isRecruiter = user?.role === 'recruiter';

  return isRecruiter ? <RecruiterSettings /> : <JobSeekerSettings />;
};

export default Settings;
