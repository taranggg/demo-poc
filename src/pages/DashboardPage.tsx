import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";

const stats = [
  {
    title: "Total Conversations",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: "💬",
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: "👥",
  },
  {
    title: "Avg. Response Time",
    value: "1.2s",
    change: "-15.3%",
    trend: "up",
    icon: "⚡",
  },
  {
    title: "Satisfaction Rate",
    value: "94.5%",
    change: "+2.1%",
    trend: "up",
    icon: "⭐",
  },
];

const recentConversations = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "SJ",
    message: "How do I upgrade my plan?",
    time: "2 min ago",
    status: "resolved",
  },
  {
    id: 2,
    user: "Mike Chen",
    avatar: "MC",
    message: "Need help with API integration",
    time: "15 min ago",
    status: "active",
  },
  {
    id: 3,
    user: "Emily Rodriguez",
    avatar: "ER",
    message: "Billing question about invoice",
    time: "1 hour ago",
    status: "resolved",
  },
  {
    id: 4,
    user: "David Kim",
    avatar: "DK",
    message: "Feature request: dark mode",
    time: "2 hours ago",
    status: "pending",
  },
  {
    id: 5,
    user: "Lisa Anderson",
    avatar: "LA",
    message: "Cannot access dashboard",
    time: "3 hours ago",
    status: "active",
  },
];

const topQueries = [
  { query: "How to upgrade plan?", count: 145 },
  { query: "API documentation", count: 128 },
  { query: "Billing information", count: 94 },
  { query: "Reset password", count: 87 },
  { query: "Contact support", count: 76 },
];

const activityData = [
  { day: "Mon", conversations: 320 },
  { day: "Tue", conversations: 385 },
  { day: "Wed", conversations: 410 },
  { day: "Thu", conversations: 395 },
  { day: "Fri", conversations: 445 },
  { day: "Sat", conversations: 280 },
  { day: "Sun", conversations: 245 },
];

export const DashboardPage = () => {
  const maxConversations = Math.max(
    ...activityData.map((d) => d.conversations)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your chatbot today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p
                  className={`text-sm font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.change} from last week
                </p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Activity Chart */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-6">Weekly Activity</h3>
          <div className="space-y-4">
            {activityData.map((day) => (
              <div key={day.day} className="flex items-center gap-4">
                <span className="text-sm font-medium w-12">{day.day}</span>
                <div className="flex-1 bg-muted rounded-full h-8 relative overflow-hidden">
                  <div
                    className="bg-primary h-full rounded-full transition-all flex items-center justify-end pr-3"
                    style={{
                      width: `${(day.conversations / maxConversations) * 100}%`,
                    }}
                  >
                    <span className="text-xs font-semibold text-primary-foreground">
                      {day.conversations}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Queries */}
        <Card className="p-6">
          <h3 className="text-xl font-semibold mb-6">Top Queries</h3>
          <div className="space-y-4">
            {topQueries.map((item, index) => (
              <div key={item.query} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.query}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.count} queries
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Conversations */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-6">Recent Conversations</h3>
        <div className="space-y-4">
          {recentConversations.map((conversation) => (
            <div
              key={conversation.id}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-10 w-10 bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                {conversation.avatar}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{conversation.user}</p>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.message}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {conversation.time}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    conversation.status === "resolved"
                      ? "bg-green-100 text-green-700"
                      : conversation.status === "active"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {conversation.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
