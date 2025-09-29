
import React from 'react';
import SquadWalletBalance from '@/components/squad/wallet/SquadWalletBalance';
import RecentTransactions from '@/components/squad/wallet/RecentTransactions';
import DistributionRules from '@/components/squad/wallet/DistributionRules';

const SquadWallet = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <SquadWalletBalance />
      </div>
      <div className="lg:col-span-1">
        <RecentTransactions />
      </div>
      <div className="lg:col-span-1">
        <DistributionRules />
      </div>
    </div>
  );
};

export default SquadWallet;
