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
  Clock,
  Check,
  CheckCheck
} from "lucide-react";
import { useI18n } from '@/shared/contexts';

interface Message {
  id: string;
  sender: string;
  senderType: "employer" | "employee";
  company: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  status: "sent" | "delivered" | "read";
}

interface Conversation {
  id: string;
  company: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isActive: boolean;
}

export default function EmployeeMessages() {
  const { language } = useI18n();
  const [selectedConversation, setSelectedConversation] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const conversations: Conversation[] = [
    {
      id: "1",
      company: "TechCorp Solutions",
      lastMessage: "Thank you for your application. We'd like to schedule an interview...",
      timestamp: "2 minutes ago",
      unreadCount: 2,
      isActive: true,
    },
    {
      id: "2", 
      company: "InnovateX",
      lastMessage: "Your profile matches our requirements perfectly...",
      timestamp: "1 hour ago",
      unreadCount: 0,
      isActive: false,
    },
    {
      id: "3",
      company: "Digital Dynamics",
      lastMessage: "We have reviewed your application and would like to...",
      timestamp: "Yesterday",
      unreadCount: 1,
      isActive: false,
    },
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "Sarah Johnson",
      senderType: "employer",
      company: "TechCorp Solutions",
      subject: "Interview Invitation",
      content: "Hello! Thank you for your application for the Senior Developer position. We were impressed with your background and would like to schedule an interview. Are you available this Friday at 2 PM?",
      timestamp: "10:30 AM",
      isRead: true,
      isStarred: false,
      status: "read",
    },
    {
      id: "2",
      sender: "You",
      senderType: "employee", 
      company: "TechCorp Solutions",
      subject: "Re: Interview Invitation",
      content: "Thank you for the opportunity! Yes, I'm available this Friday at 2 PM. Looking forward to speaking with you.",
      timestamp: "10:45 AM",
      isRead: true,
      isStarred: false,
      status: "read",
    },
    {
      id: "3",
      sender: "Sarah Johnson",
      senderType: "employer",
      company: "TechCorp Solutions", 
      subject: "Interview Details",
      content: "Great! The interview will be conducted via video call. I'll send you the meeting link shortly. Please prepare to discuss your recent projects and experience with React and Node.js.",
      timestamp: "2 minutes ago",
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
        return <Check className="h-4 w-4 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="h-4 w-4 text-gray-400" />;
      case "read":
        return <CheckCheck className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
      <div className="h-[calc(100vh-12rem)] flex bg-white rounded-lg shadow overflow-hidden">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
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
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium text-gray-900 truncate ${
                      conversation.unreadCount > 0 ? "font-semibold" : ""
                    }`}>
                      {conversation.company}
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
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Building className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">TechCorp Solutions</h3>
                    <p className="text-sm text-gray-500">HR Department</p>
                  </div>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderType === "employee" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderType === "employee"
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}>
                    <div className="flex items-center justify-between mb-1">
                      <p className={`text-sm font-medium ${
                        message.senderType === "employee" ? "text-indigo-100" : "text-gray-600"
                      }`}>
                        {message.sender}
                      </p>
                      <div className="flex items-center space-x-1 ml-2">
                        {message.isStarred && (
                          <Star className={`h-3 w-3 ${
                            message.senderType === "employee" ? "text-yellow-300" : "text-yellow-500"
                          }`} />
                        )}
                        {message.senderType === "employee" && getStatusIcon(message.status)}
                      </div>
                    </div>
                    <p className="text-sm">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className={`text-xs ${
                        message.senderType === "employee" ? "text-indigo-200" : "text-gray-500"
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
                    placeholder="Type your message..."
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
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Choose a conversation from the list to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
