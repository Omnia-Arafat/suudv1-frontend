"use client";

import React, { useState } from "react";
import { useI18n } from "@/shared/contexts";

interface Message {
  id: string;
  sender: string;
  senderType: "candidate" | "employer";
  candidateName: string;
  jobTitle: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  candidateName: string;
  jobTitle: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isActive: boolean;
  candidateAvatar?: string;
}

export default function EmployerMessages() {
  const { language, t } = useI18n();
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const conversations: Conversation[] = [
    {
      id: "1",
      candidateName: "أحمد محمد",
      jobTitle: "مطور واجهات أمامية",
      lastMessage: "شكراً لك على فرصة العمل. أنا متحمس للانضمام إلى فريقكم...",
      timestamp: "منذ دقيقتين",
      unreadCount: 1,
      isActive: true,
    },
    {
      id: "2", 
      candidateName: "فاطمة العلي",
      jobTitle: "مصممة UX/UI",
      lastMessage: "لدي خبرة 5 سنوات في التصميم وأعتقد أن مهاراتي تناسب المتطلبات...",
      timestamp: "منذ ساعة",
      unreadCount: 0,
      isActive: false,
    },
    {
      id: "3",
      candidateName: "محمد الأحمد", 
      jobTitle: "مطور تطبيقات الجوال",
      lastMessage: "متى يمكننا ترتيب مقابلة شخصية؟",
      timestamp: "أمس",
      unreadCount: 2,
      isActive: false,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "أحمد محمد",
      senderType: "candidate",
      candidateName: "أحمد محمد",
      jobTitle: "مطور واجهات أمامية",
      content: "السلام عليكم، أشكركم على النظر في طلب التوظيف الخاص بي. لدي خبرة 3 سنوات في تطوير الواجهات الأمامية باستخدام React و Vue.js.",
      timestamp: "10:30 ص",
      isRead: true,
      isStarred: false,
      status: "read",
    },
    {
      id: "2",
      sender: "أنت",
      senderType: "employer", 
      candidateName: "أحمد محمد",
      jobTitle: "مطور واجهات أمامية",
      content: "وعليكم السلام أحمد، شكراً لك على اهتمامك بالوظيفة. نحن معجبون بخلفيتك التقنية. هل يمكنك إرسال أمثلة على مشاريعك السابقة؟",
      timestamp: "10:45 ص",
      isRead: true,
      isStarred: false,
      status: "read",
    },
    {
      id: "3",
      sender: "أحمد محمد",
      senderType: "candidate",
      candidateName: "أحمد محمد", 
      jobTitle: "مطور واجهات أمامية",
      content: "بالطبع! لقد عملت على تطوير عدة تطبيقات ويب تفاعلية. يمكنكم زيارة معرض أعمالي على GitHub أو أرسل لكم الروابط مباشرة.",
      timestamp: "منذ دقيقتين",
      isRead: false,
      isStarred: true,
      status: "delivered",
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message logic here
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <i className="pi pi-check text-gray-400" />;
      case "delivered":
        return <i className="pi pi-check-circle text-gray-400" />;
      case "read":
        return <i className="pi pi-check-circle text-blue-500" />;
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex bg-white rounded-lg shadow overflow-hidden" dir={language === "ar" ? "rtl" : "ltr"}>
      {/* Conversations List */}
      <div className={`w-1/3 border-gray-200 flex flex-col ${language === "ar" ? "border-l" : "border-r"}`}>
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <i className={`pi pi-search absolute top-3 h-4 w-4 text-gray-400 ${language === "ar" ? "right-3" : "left-3"}`}></i>
            <input
              type="text"
              placeholder={t("search.conversations")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                language === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"
              }`}
            />
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
                <div className={`flex items-center space-x-3 flex-1 ${language === "ar" ? "space-x-reverse" : ""}`}>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {getInitials(conversation.candidateName)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium text-gray-900 truncate ${
                      conversation.unreadCount > 0 ? "font-semibold" : ""
                    }`}>
                      {conversation.candidateName}
                    </p>
                    <p className="text-xs text-indigo-600 truncate">
                      {conversation.jobTitle}
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
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-indigo-600 rounded-full">
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
                <div className={`flex items-center space-x-3 ${language === "ar" ? "space-x-reverse" : ""}`}>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">أم</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">أحمد محمد</h3>
                    <p className="text-sm text-gray-500">مطور واجهات أمامية</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <i className="pi pi-ellipsis-v" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.senderType === "employer" 
                      ? language === "ar" ? "justify-start" : "justify-end"
                      : language === "ar" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderType === "employer"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm font-medium ${
                        message.senderType === "employer" ? "text-indigo-100" : "text-gray-600"
                      }`}>
                        {message.sender}
                      </p>
                      <div className={`flex items-center space-x-1 ${language === "ar" ? "mr-2 space-x-reverse" : "ml-2"}`}>
                        {message.isStarred && (
                          <i className={`pi pi-star-fill text-xs ${
                            message.senderType === "employer" ? "text-yellow-300" : "text-yellow-500"
                          }`} />
                        )}
                        {message.senderType === "employer" && getStatusIcon(message.status)}
                      </div>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${
                        message.senderType === "employer" ? "text-indigo-200" : "text-gray-500"
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
              <div className={`flex items-end space-x-3 ${language === "ar" ? "space-x-reverse" : ""}`}>
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder={t("messages.typeMessage")}
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
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className="pi pi-send" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <i className="pi pi-comments mx-auto text-5xl text-gray-400 mb-4" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">{t("messages.noConversation")}</h3>
              <p className="mt-1 text-sm text-gray-500">
                {t("messages.selectConversation")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
