"use client"

import { Building, Calendar, Users, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react"
import { MOCK_CLUBS, MOCK_EVENTS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const stats = [
  {
    title: "Total Clubs",
    value: MOCK_CLUBS.length,
    change: "+12%",
    trend: "up",
    icon: Building,
  },
  {
    title: "Active Events",
    value: MOCK_EVENTS.length,
    change: "+8%",
    trend: "up",
    icon: Calendar,
  },
  {
    title: "Total Members",
    value: "2,847",
    change: "+23%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Engagement Rate",
    value: "78%",
    change: "-2%",
    trend: "down",
    icon: TrendingUp,
  },
]

const pendingApprovals = [
  { id: "1", type: "club", name: "Photography Club", submittedBy: "Meklit Haile", date: "2 days ago" },
  { id: "2", type: "event", name: "Career Fair 2024", submittedBy: "Engineering Club", date: "1 day ago" },
  { id: "3", type: "club", name: "Debate Society", submittedBy: "Dawit Kebede", date: "3 hours ago" },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Monitor and manage the UniClubs platform.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-glow transition-all">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <Badge
                  variant={stat.trend === "up" ? "default" : "secondary"}
                  className={stat.trend === "up" ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}
                >
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-1" />
                  )}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Pending Approvals</CardTitle>
            <Badge variant="secondary">{pendingApprovals.length} pending</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === "club" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary-foreground"
                  }`}>
                    {item.type === "club" ? (
                      <Building className="w-5 h-5" />
                    ) : (
                      <Calendar className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      by {item.submittedBy} · {item.date}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-success/10 text-success hover:bg-success/20 transition-colors">
                    Approve
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {MOCK_CLUBS.slice(0, 5).map((club, index) => (
              <div key={club.id} className="flex items-center gap-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={club.logo} />
                  <AvatarFallback>{club.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{club.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {index === 0 && "Added new event"}
                    {index === 1 && "Updated club info"}
                    {index === 2 && "New member joined"}
                    {index === 3 && "Posted announcement"}
                    {index === 4 && "Created project"}
                  </p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  {index + 1}h ago
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Clubs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Club</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Members</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Events</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Engagement</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CLUBS.slice(0, 5).map((club, index) => (
                  <tr key={club.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={club.logo} />
                          <AvatarFallback>{club.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{club.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{club.memberCount}</td>
                    <td className="py-3 px-4 text-sm">{Math.floor(Math.random() * 10) + 1}</td>
                    <td className="py-3 px-4 text-sm">{85 - index * 5}%</td>
                    <td className="py-3 px-4">
                      <Badge variant="default" className="bg-success/10 text-success">
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
