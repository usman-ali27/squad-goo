import { createContext, useContext } from 'react';

export const ProfileDataContext = createContext<any>(null);

export const useProfileData = () => useContext(ProfileDataContext);
