
const SquadMembers = () => {
  const members = [
    { name: 'John Doe', role: 'Software Developer', initials: 'JD' },
    { name: 'Jane Smith', role: 'UI/UX Designer', initials: 'JS' },
    { name: 'Mike Johnson', role: 'Project Manager', initials: 'MJ' },
    { name: 'Sarah Lee', role: 'Data Analyst', initials: 'SL' },
    { name: 'Tom Chen', role: 'DevOps Engineer', initials: 'TC' },
  ];

  return (
    <div>
      <h3 className="font-bold text-lg">Squad Members</h3>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member) => (
          <div key={member.name} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
              {member.initials}
            </div>
            <div>
              <p className="font-semibold">{member.name}</p>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SquadMembers;
