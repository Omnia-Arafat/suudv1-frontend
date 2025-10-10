"use client";

import React, { useState } from "react";
import { 
  Search, 
  Send, 
  MoreVertical, 
  Star, 
  Archive,
  MessageCircle,
  Building,
  User,
  Clock,
  Check,
  CheckCheck,
  Filter,
  AlertTriangle,
  Shield,
  Users
} from "lucide-react";

interface Message {
  id: string;
  sender: string;
  senderType: "employer" | "employee" | "system";
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  priority: "low" | "normal" | "high" | "urgent";
  category: "support" | "report" | "inquiry" | "complaint" | "notification";
  status: "sent" | "delivered" | "read" | "resolved";
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isActive: boolean;
  category: string;
  priority: "low" | "normal" | "high" | "urgent";
}

export default function AdminMessages() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");

  // Mock data
  const conversations: Conversation[] = [
    {
      id: "1",
      participants: ["TechCorp Solutions", "أحمد محمد"],
      lastMessage: "نحتاج لمساعدة في إعداد إعدادات الشركة الجديدة...",
      timestamp: "منذ 5 دقائق",
      unreadCount: 3,
      isActive: true,
      category: "support",
      priority: "high",
    },
    {
      id: "2", 
      participants: ["فاطمة العلي"],
      lastMessage: "أريد الإبلاغ عن مشكلة في عملية التقديم...",
      timestamp: "منذ ساعة",
      unreadCount: 1,
      isActive: false,
      category: "report",
      priority: "urgent",
    },
    {
      id: "3",
      participants: ["InnovateX", "محمد الأحمد"], 
      lastMessage: "استفسار حول سياسات النشر والموافقة على الوظائف...",
      timestamp: "أمس",
      unreadCount: 0,
      isActive: false,
      category: "inquiry",
      priority: "normal",
    },
    {
      id: "4",
      participants: ["Digital Dynamics"],
      lastMessage: "شكوى من مرشح بخصوص عملية المقابلة...",
      timestamp: "منذ يومين",
      unreadCount: 2,
      isActive: false,
      category: "complaint",
      priority: "high",
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "سارة أحمد - TechCorp Solutions",
      senderType: "employer",
      recipient: "فريق الدعم",
      subject: "طلب مساعدة في الإعدادات",
      content: "السلام عليكم، نحن شركة جديدة على المنصة ونحتاج لمساعدة في إعداد ملف الشركة وإعدادات النشر. هل يمكنكم مساعدتنا؟",
      timestamp: "09:30 ص",
      isRead: true,
      isStarred: false,
      priority: "high",
      category: "support",
      status: "read",
    },
    {
      id: "2",
      sender: "النظام",
      senderType: "system", 
      recipient: "سارة أحمد - TechCorp Solutions",
      subject: "رد تلقائي",
      content: "شكراً لتواصلكم معنا. تم استلام طلبكم وسيتم الرد عليه خلال 24 ساعة.",
      timestamp: "09:31 ص",
      isRead: true,
      isStarred: false,
      priority: "normal",
      category: "notification",
      status: "delivered",
    },
    {
      id: "3",
      sender: "أنت - الإدارة",
      senderType: "system",
      recipient: "سارة أحمد - TechCorp Solutions", 
      subject: "مرحباً بكم في SU'UD",
      content: "أهلاً وسهلاً بشركة TechCorp Solutions. سنقوم بإعداد حسابكم خلال اليوم. سيتواصل معكم أحد أعضاء فريقنا قريباً لمساعدتكم في الإعداد الأولي.",
      timestamp: "منذ 5 دقائق",
      isRead: false,
      isStarred: true,
      priority: "high",
      category: "support",
      status: "sent",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getPriorityColor = (priority: Message["priority"] | Conversation["priority"]) => {
    switch (priority) {
      case "urgent":
        return "text-red-600 bg-red-100";
      case "high":
        return "text-orange-600 bg-orange-100";
      case "normal":
        return "text-blue-600 bg-blue-100";
      case "low":
        return "text-gray-600 bg-gray-100";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "support":
        return <Shield className="h-4 w-4" />;
      case "report":
        return <AlertTriangle className="h-4 w-4" />;
      case "inquiry":
        return <MessageCircle className="h-4 w-4" />;
      case "complaint":
        return <AlertTriangle className="h-4 w-4" />;
      case "notification":
        return <Check className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="h-4 w-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="h-4 w-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="h-4 w-4 text-blue-500" />;
      case "resolved":
        return <CheckCheck className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg shadow overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في المحادثات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div className="flex space-x-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">جميع الفئات</option>
              <option value="support">دعم فني</option>
              <option value="report">بلاغات</option>
              <option value="inquiry">استفسارات</option>
              <option value="complaint">شكاوى</option>
            </select>
            
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="flex-1 text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">جميع الأولويات</option>
              <option value="urgent">عاجل</option>
              <option value="high">مهم</option>
              <option value="normal">عادي</option>
              <option value="low">منخفض</option>
            </select>
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation.id)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation === conversation.id ? "bg-indigo-50 border-indigo-200" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    {conversation.participants.length > 1 ? (
                      <Users className="h-5 w-5 text-white" />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(conversation.priority)}`}>
                        {getCategoryIcon(conversation.category)}
                        <span>{conversation.category}</span>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(conversation.priority)}`}>
                        {conversation.priority}
                      </span>
                    </div>
                    <p className={`text-sm font-medium text-gray-900 truncate ${
                      conversation.unreadCount > 0 ? "font-semibold" : ""
                    }`}>
                      {conversation.participants.join(" • ")}
                    </p>
                    <p className={`text-sm text-gray-500 truncate ${
                      conversation.unreadCount > 0 ? "font-medium text-gray-700" : ""
                    }`}>
                      {conversation.lastMessage}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {conversation.timestamp}
                    </p>
                  </div>
                </div>
                {conversation.unreadCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                    {conversation.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">TechCorp Solutions • فريق الدعم</h3>
                    <p className="text-sm text-gray-500">طلب دعم فني - أولوية عالية</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full hover:bg-green-200">
                    حل المشكلة
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderType === "system" || message.sender.includes("الإدارة")
                      ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.senderType === "system" || message.sender.includes("الإدارة")
                      ? "bg-indigo-600 text-white"
                      : message.senderType === "employer"
                      ? "bg-blue-100 text-blue-900"
                      : "bg-gray-100 text-gray-900"
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className={`text-sm font-medium ${
                        message.senderType === "system" || message.sender.includes("الإدارة")
                          ? "text-indigo-100" 
                          : message.senderType === "employer"
                          ? "text-blue-700"
                          : "text-gray-600"
                      }`}>
                        {message.sender}
                      </p>
                      <div className="flex items-center space-x-1 ml-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(message.priority)}`}>
                          {message.priority}
                        </span>
                        {message.isStarred && (
                          <Star className={`h-3 w-3 ${
                            message.senderType === "system" ? "text-yellow-300" : "text-yellow-500"
                          }`} />
                        )}
                        {(message.senderType === "system" || message.sender.includes("الإدارة")) && getStatusIcon(message.status)}
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-2">{message.subject}</p>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${
                        message.senderType === "system" || message.sender.includes("الإدارة")
                          ? "text-indigo-200" 
                          : message.senderType === "employer"
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end space-x-3">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="اكتب ردك هنا..."
                    rows={3}
                    className="w-full resize-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                  <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50">
                    <Archive className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">لم يتم اختيار محادثة</h3>
              <p className="mt-1 text-sm text-gray-500">
                اختر محادثة من القائمة لبدء الرد على الرسائل.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
