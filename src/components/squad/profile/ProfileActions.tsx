
const ProfileActions = () => {
  return (
    <div className="flex justify-center space-x-4">
      <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
        Edit Profile
      </button>
      <button className="bg-gray-200 text-gray-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors">
        Preview as Recruiter
      </button>
    </div>
  );
};

export default ProfileActions;
