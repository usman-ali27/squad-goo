
import api from "./apiService";

interface RecruiterProfilePayload {
  id: number;
  company_name?: string;
  abc?: string;
  business_address?: string;
  business_phone?: string;
  director_name?: string;
  director_contact_number?: string;
  director_contact_email?: string;
  company_reg_date?: string;
}

export const getRecruiterProfile = (id: number) => {
  return api.get(`/recruiter/profile/${id}`);
};

export const updateRecruiterProfile = (payload: RecruiterProfilePayload) => {
  return api.put(`/recruiter/company`, payload);
};
