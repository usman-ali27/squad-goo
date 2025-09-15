import { Suspense, lazy } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// Lazy load components for better performance
const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const FeaturesSection = lazy(() => import("@/components/home/FeaturesSection"));
const StatsSection = lazy(() => import("@/components/home/StatsSection"));
const TestimonialsSection = lazy(() => import("@/components/home/TestimonialsSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <div className="p-8 min-h-screen flex items-center justify-center">Home Page - Coming Soon</div>
      {/* <Suspense fallback={<LoadingSpinner />}>
        <HeroSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <StatsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturesSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <CTASection />
      </Suspense> */}
    </div>
  );
};

export default HomePage;