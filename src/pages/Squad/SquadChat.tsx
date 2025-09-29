
import React from 'react';
import { Phone, Video, Send } from 'lucide-react';

const messages = [
  {
    sender: 'Jane Smith',
    text: "Hey team! I found a great opportunity that matches our squad profile perfectly.",
    time: '10:30 AM',
    isUser: false,
  },
  {
    sender: 'You',
    text: "That sounds interesting! Can you share more details?",
    time: '10:32 AM',
    isUser: true,
  },
  {
    sender: 'Mike Johnson',
    text: "I agree! Let's discuss this in our meeting today. I've prepared some notes on our recent applications.",
    time: '10:35 AM',
    isUser: false,
  },
  {
    sender: 'Sarah Lee',
    text: "Great! I've updated my portfolio with our latest squad projects. Should help with applications! 🚀",
    time: '10:40 AM',
    isUser: false,
  },
];

const SquadChat = () => {
  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col" style={{ minHeight: 'calc(100vh - 160px)'}}>
      {/* Chat Header */}
      <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center flex-shrink-0">
        <div>
          <h2 className="text-xl font-bold">Squad Chat</h2>
          <p className="text-sm opacity-80">5 members online</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            <Phone size={16} />
            <span>Call</span>
          </button>
          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/40 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm">
            <Video size={16} />
            <span>Video</span>
          </button>
        </div>
      </div>

      {/* Chat Body */}
      <div className="flex-grow p-6 space-y-6 overflow-y-auto bg-white">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xl p-4 rounded-xl ${msg.isUser ? 'bg-purple-600 text-white' : 'bg-white text-gray-800 shadow'}`}>
              {!msg.isUser && <p className="font-semibold text-sm mb-1 text-gray-900">{msg.sender}</p>}
              <p className="text-sm">{msg.text}</p>
              <p className={`text-xs mt-2 text-right ${msg.isUser ? 'text-purple-200' : 'text-gray-400'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Footer */}
      <div className="p-4 bg-white border-t border-gray-200 rounded-b-lg flex-shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-grow w-full px-5 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />
          <button className="flex-shrink-0 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SquadChat;
