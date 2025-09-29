
import { Share2, History, Landmark } from 'lucide-react';

const SquadWalletBalance = () => {
  return (
    <div className="bg-purple-600 text-white p-6 rounded-lg shadow-md h-full flex flex-col justify-between">
      <div>
        <p className="text-sm opacity-80">Squad Wallet Balance</p>
        <h1 className="text-4xl font-bold mt-2">$12,450.00</h1>
        <p className="text-xs opacity-60 mt-1">Last updated: Today, 3:45 PM</p>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors">
          <Share2 size={24} />
          <span className="text-xs mt-2 font-medium">Distribute</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors">
          <History size={24} />
          <span className="text-xs mt-2 font-medium">History</span>
        </button>
        <button className="flex flex-col items-center justify-center bg-white/20 hover:bg-white/30 p-3 rounded-lg transition-colors">
          <Landmark size={24} />
          <span className="text-xs mt-2 font-medium">Withdraw</span>
        </button>
      </div>
    </div>
  );
};

export default SquadWalletBalance;
