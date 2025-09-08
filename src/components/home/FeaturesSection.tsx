import { Search, Users, FileText, Shield, Zap, Globe } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "Advanced Job Search",
      description: "Find jobs with powerful filters including location, salary, company size, and more.",
      gradient: "from-blue-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Professional Networking",
      description: "Connect with industry professionals and build meaningful relationships.",
      gradient: "from-green-500 to-green-600"
    },
    {
      icon: FileText,
      title: "Resume Builder",
      description: "Create professional resumes with our AI-powered builder and templates.",
      gradient: "from-purple-500 to-purple-600"
    },
    {
      icon: Shield,
      title: "Verified Companies",
      description: "All companies are verified to ensure legitimate job opportunities.",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: "Instant Notifications",
      description: "Get notified immediately when jobs matching your criteria are posted.",
      gradient: "from-yellow-500 to-yellow-600"
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Access job opportunities from companies worldwide, including remote positions.",
      gradient: "from-indigo-500 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features for Job Success
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Everything you need to find your dream job or hire the perfect candidate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;