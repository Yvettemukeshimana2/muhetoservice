import React, { useState, useCallback, ReactNode } from "react";
import { Mail, Search, Trash2, Reply, Check, Star } from "lucide-react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

type CardSectionProps = {
  children: ReactNode;
};

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<CardSectionProps> = ({ children }) => (
  <div className="border-b p-6">{children}</div>
);

const CardTitle: React.FC<CardSectionProps> = ({ children }) => (
  <h2 className="text-xl font-semibold">{children}</h2>
);

const CardContent: React.FC<CardSectionProps> = ({ children }) => (
  <div className="p-6">{children}</div>
);

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  content: string;
  date: string;
  status: "Read" | "Unread";
  priority: "High" | "Medium" | "Low";
}

type SortField = "date" | "name" | "priority";
type FilterStatus = "All" | "Read" | "Unread";
type FilterPriority = "All" | "High" | "Medium" | "Low";

const CommentsPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      subject: "Product Inquiry",
      content: "I would like to know more about your services.",
      date: "2024-03-15",
      status: "Read",
      priority: "High",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      subject: "Partnership Opportunity",
      content: "We'd like to discuss potential collaboration.",
      date: "2024-03-14",
      status: "Unread",
      priority: "Medium",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      subject: "Support Request",
      content: "Need assistance with setting up.",
      date: "2024-03-13",
      status: "Unread",
      priority: "Low",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("All");
  const [priorityFilter, setPriorityFilter] = useState<FilterPriority>("All");

  const getStatusStyles = (status: "Read" | "Unread") => {
    return status === "Read"
      ? "bg-gray-100 text-gray-800"
      : "bg-blue-100 text-blue-800";
  };

  const getPriorityStyles = (priority: "High" | "Medium" | "Low") => {
    switch (priority) {
      case "High":
        return "text-red-500";
      case "Medium":
        return "text-yellow-500";
      case "Low":
        return "text-green-500";
    }
  };

  const handleDelete = (id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const handleMarkAsRead = (id: number) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, status: "Read" } : message
      )
    );
  };

  const handleReply = (email: string) => {
    // In a real application, this would open a compose modal or navigate to a compose page
    alert(`Replying to ${email}`);
  };

  const filteredAndSortedMessages = useCallback(() => {
    return messages
      .filter((message) => {
        const matchesSearch =
          message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.content.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus =
          statusFilter === "All" || message.status === statusFilter;

        const matchesPriority =
          priorityFilter === "All" || message.priority === priorityFilter;

        return matchesSearch && matchesStatus && matchesPriority;
      })
      .sort((a, b) => {
        let comparison = 0;
        switch (sortField) {
          case "date":
            comparison =
              new Date(b.date).getTime() - new Date(a.date).getTime();
            break;
          case "name":
            comparison = a.name.localeCompare(b.name);
            break;
          case "priority":
            const priorityOrder = { High: 3, Medium: 2, Low: 1 };
            comparison =
              priorityOrder[b.priority as keyof typeof priorityOrder] -
              priorityOrder[a.priority as keyof typeof priorityOrder];
            break;
        }
        return sortDirection === "asc" ? comparison : -comparison;
      });
  }, [
    messages,
    searchQuery,
    sortField,
    sortDirection,
    statusFilter,
    priorityFilter,
  ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Messages</h1>
      <Card>
        <CardHeader>
          <div className="space-y-4">
            <CardTitle>Inbox</CardTitle>
            <div className="flex flex-wrap gap-4">
              {/* Search Bar */}
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters */}
              <select
                className="border rounded-lg px-4 py-2"
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as FilterStatus)
                }
              >
                <option value="All">All Status</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
              </select>

              <select
                className="border rounded-lg px-4 py-2"
                value={priorityFilter}
                onChange={(e) =>
                  setPriorityFilter(e.target.value as FilterPriority)
                }
              >
                <option value="All">All Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              {/* Sort Options */}
              <select
                className="border rounded-lg px-4 py-2"
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="priority">Sort by Priority</option>
              </select>

              <button
                className="border rounded-lg px-4 py-2"
                onClick={() =>
                  setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                {sortDirection === "asc" ? "↑" : "↓"}
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAndSortedMessages().map((message) => (
              <div
                key={message.id}
                className="border-b last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{message.name}</h3>
                        <p className="text-sm text-gray-500">{message.email}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star
                          className={`h-5 w-5 ${getPriorityStyles(
                            message.priority
                          )}`}
                          fill={
                            message.priority === "High"
                              ? "currentColor"
                              : "none"
                          }
                        />
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(
                            message.status
                          )}`}
                        >
                          {message.status}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-medium text-gray-700 mt-2">
                      {message.subject}
                    </h4>
                    <p className="text-gray-600 mt-1">{message.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">{message.date}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleReply(message.email)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Reply"
                        >
                          <Reply className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleMarkAsRead(message.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                          title="Mark as read"
                        >
                          <Check className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(message.id)}
                          className="p-1 hover:bg-gray-100 rounded text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsPage;
