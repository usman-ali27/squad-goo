import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaPaperPlane } from "react-icons/fa";

const chats = [
  {
    id: 1,
    name: "John Doe",
    item: "iPhone 14 Pro Max",
    lastMessage: "Is it still available?",
    avatar: "JD",
    avatarColor: "bg-blue-500",
    time: "2h",
    unread: 2,
    active: true,
  },
  {
    id: 2,
    name: "Sarah Miller",
    item: "Honda Civic 2020",
    lastMessage: "Payment confirmed",
    avatar: "SM",
    avatarColor: "bg-green-500",
    time: "1d",
    unread: 0,
    active: false,
  },
  {
    id: 3,
    name: "Mike Roberts",
    item: "Gaming Chair",
    lastMessage: "Thanks for the chair!",
    avatar: "MR",
    avatarColor: "bg-purple-500",
    time: "2d",
    unread: 0,
    active: false,
  },
];

const messages = [
  {
    id: 1,
    sender: "John Doe",
    avatar: "JD",
    text: "Hi! Is the iPhone still available?",
    time: "2:30 PM",
    isMe: false,
  },
  {
    id: 2,
    sender: "Me",
    avatar: "Me",
    text: "Yes, it's still available! It's in excellent condition.",
    time: "2:32 PM",
    isMe: true,
  },
  {
    id: 3,
    sender: "John Doe",
    avatar: "JD",
    text: "Can I inspect it before buying? When would be a good time?",
    time: "2:35 PM",
    isMe: false,
  },
];

const MarketplaceChat = () => {
  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Marketplace Chat</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
        {/* Chat List */}
        <div className="md:col-span-1 lg:col-span-1 bg-white p-4 rounded-lg border border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Active Chats</h2>
          <div className="space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`p-3 rounded-lg cursor-pointer flex items-start gap-3 transition-colors ${
                  chat.active ? "bg-purple-600 text-white" : "hover:bg-gray-100"
                }`}>
                <Avatar>
                  <AvatarFallback
                    className={`${chat.avatarColor} text-white`}>
                    {chat.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-semibold text-sm">{chat.name}</h3>
                  <p
                    className={`text-xs ${
                      chat.active ? "text-purple-200" : "text-gray-600"
                    }`}>
                    {chat.item}
                  </p>
                  <p
                    className={`text-xs truncate ${
                      chat.active ? "text-purple-100" : "text-gray-500"
                    }`}>
                    {chat.lastMessage}
                  </p>
                </div>
                <div className="text-xs text-right space-y-1 shrink-0">
                  <p
                    className={`${chat.active ? "text-purple-200" : "text-gray-400"}`}>
                    {chat.time}
                  </p>
                  {chat.unread > 0 && (
                    <span className="inline-block bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center m-auto">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="md:col-span-2 lg:col-span-3 bg-white rounded-lg border border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            {/* Chat Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-500 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">John Doe</h3>
                  <p className="text-sm text-gray-500">
                    iPhone 14 Pro Max - 950 SG
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="orange" size="sm">
                  Hold Item
                </Button>
                <Button variant="outline" size="sm">
                  View Item
                </Button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 p-4 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.isMe ? "justify-end" : "justify-start"
                }`}>
                {!message.isMe && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-blue-500 text-white">
                      {message.avatar}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
                    message.isMe
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                  <p className="text-sm">{message.text}</p>
                  <p
                    className={`text-xs mt-1 text-right ${
                      message.isMe ? "text-purple-200" : "text-gray-400"
                    }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="relative">
              <Input
                placeholder="Type your message..."
                className="pr-12 bg-gray-100 border-gray-100 focus:border-purple-500 focus:ring-purple-500" />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-purple-600 text-white rounded-md hover:bg-purple-700">
                <FaPaperPlane className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceChat;
