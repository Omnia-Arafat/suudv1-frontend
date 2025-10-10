'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Eye, Mail, User, Clock, CheckCircle, Reply } from 'lucide-react';
import { adminService } from '@/shared/services/admin.service';

interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
  replied_at?: string;
  category?: string;
  phone?: string;
}

export default function AdminContactsContent() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, [searchTerm, selectedStatus]);

  const fetchContacts = async () => {
    try {
      const response = await adminService.getContacts({
        search: searchTerm || undefined,
        status: selectedStatus === 'all' ? undefined : selectedStatus
      });
      setContacts(response.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      setLoading(false);
    }
  };

  const handleContactAction = async (contactId: number, status: 'read' | 'replied') => {
    try {
      await adminService.updateContactStatus(contactId, status);
      fetchContacts(); // Refresh the list
    } catch (error) {
      console.error(`Failed to mark contact as ${status}:`, error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || contact.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unread': return 'text-red-800 bg-red-100';
      case 'read': return 'text-yellow-800 bg-yellow-100';
      case 'replied': return 'text-green-800 bg-green-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread': return <Mail className="h-4 w-4" />;
      case 'read': return <Eye className="h-4 w-4" />;
      case 'replied': return <Reply className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center mr-4">
            <MessageCircle className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-sm text-gray-500">Manage customer inquiries and feedback</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageCircle className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Messages</dt>
                  <dd className="text-lg font-medium text-gray-900">{contacts.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Mail className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Unread</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {contacts.filter(c => c.status === 'unread').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Eye className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Read</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {contacts.filter(c => c.status === 'read').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Replied</dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {contacts.filter(c => c.status === 'replied').length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
          </select>
        </div>
      </div>

      {/* Contacts List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Messages ({filteredContacts.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className={`px-6 py-4 hover:bg-gray-50 cursor-pointer ${contact.status === 'unread' ? 'bg-blue-50' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-indigo-600" />
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-lg font-medium ${contact.status === 'unread' ? 'font-bold text-gray-900' : 'text-gray-900'}`}>
                          {contact.name}
                        </h4>
                        <p className="text-sm text-gray-600">{contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(contact.status)}`}>
                        {getStatusIcon(contact.status)}
                        <span className="ml-1">{contact.status}</span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <h5 className={`text-md ${contact.status === 'unread' ? 'font-semibold' : 'font-medium'} text-gray-800`}>
                      {contact.subject}
                    </h5>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{contact.message}</p>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(contact.created_at).toLocaleDateString()} at {new Date(contact.created_at).toLocaleTimeString()}
                    </div>
                    {contact.phone && (
                      <span>Phone: {contact.phone}</span>
                    )}
                    {contact.category && (
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                        {contact.category}
                      </span>
                    )}
                  </div>

                  {contact.replied_at && (
                    <div className="mt-2 text-xs text-green-600">
                      Replied on {new Date(contact.replied_at).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  {contact.status === 'unread' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactAction(contact.id, 'read');
                      }}
                      className="p-2 text-blue-600 hover:text-blue-700"
                      title="Mark as Read"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  )}
                  
                  {contact.status !== 'replied' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContactAction(contact.id, 'replied');
                      }}
                      className="p-2 text-green-600 hover:text-green-700"
                      title="Mark as Replied"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {filteredContacts.length === 0 && (
            <div className="px-6 py-12 text-center">
              <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No messages found</h3>
              <p className="text-gray-500">
                {searchTerm || selectedStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.' 
                  : 'Contact messages will appear here when users reach out.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" onClick={() => setSelectedContact(null)}>
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white" onClick={(e) => e.stopPropagation()}>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Message Details</h3>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedContact.email}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedContact.subject}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedContact.status)}`}>
                      {selectedContact.status}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {new Date(selectedContact.created_at).toLocaleDateString()} at {new Date(selectedContact.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  {selectedContact.status === 'unread' && (
                    <button
                      onClick={() => {
                        handleContactAction(selectedContact.id, 'read');
                        setSelectedContact(null);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Mark as Read
                    </button>
                  )}
                  
                  {selectedContact.status !== 'replied' && (
                    <button
                      onClick={() => {
                        handleContactAction(selectedContact.id, 'replied');
                        setSelectedContact(null);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Mark as Replied
                    </button>
                  )}
                  
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
