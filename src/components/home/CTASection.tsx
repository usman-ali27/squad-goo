import { Button } from "@/components/ui/button";
import { ArrowRight, Briefcase, Users } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary-light to-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take the Next Step?
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto px-4">
            Join SquadGoo today and discover endless opportunities for career growth and success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Job Seekers CTA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">For Job Seekers</h3>
            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 leading-relaxed">
              Find your dream job with access to thousands of opportunities from top companies
            </p>
            <Button variant="orange" size="lg" className="w-full">
              Start Job Search
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>

          {/* Employers CTA */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-white/20 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">For Employers</h3>
            <p className="text-sm sm:text-base text-white/80 mb-4 sm:mb-6 leading-relaxed">
              Post jobs and connect with qualified candidates to build your dream team
            </p>
            <Button variant="orange-outline" size="lg" className="w-full bg-white/10 backdrop-blur-sm">
              Post a Job
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-white">24/7</div>
            <div className="text-xs sm:text-base text-white/80">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-white">100%</div>
            <div className="text-xs sm:text-base text-white/80">Free for Job Seekers</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-white">AI-Powered</div>
            <div className="text-xs sm:text-base text-white/80">Job Matching</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-white">Trusted</div>
            <div className="text-xs sm:text-base text-white/80">by 10K+ Companies</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;