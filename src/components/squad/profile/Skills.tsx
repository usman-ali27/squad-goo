
const Skills = () => {
  const skills = [
    'JavaScript', 'React', 'Node.js', 'UI/UX Design', 
    'Project Management', 'Data Analysis', 'DevOps', 'Cloud Computing'
  ];

  return (
    <div>
      <h3 className="font-bold text-lg">Skills & Expertise</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span key={skill} className="bg-purple-200 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Skills;
