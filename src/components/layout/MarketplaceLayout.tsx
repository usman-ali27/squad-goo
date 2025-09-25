
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import MarketplaceHeader from "./MarketplaceHeader";
import Footer from "./Footer";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const MarketplaceLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MarketplaceHeader />
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default MarketplaceLayout;
