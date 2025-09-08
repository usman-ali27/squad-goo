import { TrendingUp, Users, Briefcase, Award } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Briefcase,
      number: "50,000+",
      label: "Active Job Listings",
      description: "Opportunities across all industries"
    },
    {
      icon: Users,
      number: "200,000+",
      label: "Registered Users",
      description: "Professionals and job seekers"
    },
    {
      icon: TrendingUp,
      number: "95%",
      label: "Success Rate",
      description: "Successful job placements"
    },
    {
      icon: Award,
      number: "10,000+",
      label: "Companies",
      description: "Trusted employer partners"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose SquadGoo?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who have found their dream careers through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-accent to-accent-hover rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;