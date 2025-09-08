import { Button } from "@/components/ui/button";
import { Search, Briefcase, Users, TrendingUp } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Dream
                <span className="block text-accent">Career Today</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed max-w-lg">
                Australia's premier job platform connecting exceptional talent with innovative companies. 
                Build your career, grow your business.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="orange" className="px-8">
                <Search className="w-5 h-5 mr-2" />
                Find Jobs
              </Button>
              <Button size="lg" variant="orange-outline" className="px-8 bg-white/10 backdrop-blur-sm">
                <Briefcase className="w-5 h-5 mr-2" />
                Post a Job
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-white/80">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">200K+</div>
                <div className="text-sm text-white/80">Job Seekers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">10K+</div>
                <div className="text-sm text-white/80">Companies</div>
              </div>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">For Job Seekers</h3>
                    <p className="text-white/80">Find your perfect opportunity</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">For Employers</h3>
                    <p className="text-white/80">Hire top talent efficiently</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Career Growth</h3>
                    <p className="text-white/80">Advance your professional journey</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;