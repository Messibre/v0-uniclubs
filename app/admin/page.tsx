"use client"

import Link from "next/link"
import { 
  Building, Calendar, Users, TrendingUp, ArrowUpRight, ArrowDownRight, 
  Clock, CheckCircle, XCircle, Eye, AlertTriangle
} from "lucide-react"
import { MOCK_CLUBS, MOCK_EVENTS, MOCK_ADMIN_STATS, MOCK_PENDING_APPROVALS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const stats = [
  {
    title: "Total Students",
    value: MOCK_ADMIN_STATS.totalUsers.toLocaleString(),
    change: `+${MOCK_ADMIN_STATS.monthlyGrowth.users}%`,
    trend: "up",
    icon: Users,
    color: "blue",
  },
  {
    title: "Active Clubs",
    value: MOCK_ADMIN_STATS.totalClubs,
    change: `+${MOCK_ADMIN_STATS.monthlyGrowth.clubs}%`,
    trend: "up",
    icon: Building,
    color: "amber",
  },
  {
    title: "Events This Month",
    value: MOCK_ADMIN_STATS.activeEventsThisMonth,
    change: `+${MOCK_ADMIN_STATS.monthlyGrowth.events}%`,
    trend: "up",
    icon: Calendar,
    color: "green",
  },
  {
    title: "Weekly Active",
    value: MOCK_ADMIN_STATS.weeklyActiveUsers.toLocaleString(),
    change: "-3%",
    trend: "down",
    icon: TrendingUp,
    color: "purple",
  },
]

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  amber: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  green: "bg-green-500/10 text-green-500 border-green-500/20",
  purple: "bg-purple-500/10 text-purple-500 border-purple-500/20",
}

export default function AdminDashboardPage() {
  const pendingClubs = MOCK_PENDING_APPROVALS.filter(a => a.type === 'club')
  const pendingEvents = MOCK_PENDING_APPROVALS.filter(a => a.type === 'event')

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage the UniClubs platform at Addis Ababa University.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1 border-amber-500/50 text-amber-500">
            <AlertTriangle className="w-3 h-3" />
            {MOCK_PENDING_APPROVALS.length} Pending
          </Badge>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className={`hover:shadow-glow transition-all border ${colorMap[stat.color].split(' ')[2]}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[stat.color].split(' ').slice(0, 2).join(' ')}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <Badge
                  variant="secondary"
                  className={stat.trend === "up" 
                    ? "bg-green-500/10 text-green-600" 
                    : "bg-red-500/10 text-red-500"
                  }
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
        {/* Pending Club Registrations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-500" />
              Pending Club Registrations
            </CardTitle>
            <Badge variant="secondary">{pendingClubs.length} pending</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingClubs.length > 0 ? pendingClubs.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      by {item.submittedBy} · {new Date(item.submittedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Eye className="w-3 h-3" /> Review
                  </Button>
                  <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-3 h-3" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-destructive hover:bg-destructive/10">
                    <XCircle className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-10 h-10 mx-auto mb-2 text-green-500" />
                <p>No pending club registrations</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pending Event Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Pending Event Approvals
            </CardTitle>
            <Badge variant="secondary">{pendingEvents.length} pending</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingEvents.length > 0 ? pendingEvents.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      by {item.submittedBy} · {new Date(item.submittedAt).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="gap-1">
                    <Eye className="w-3 h-3" /> Review
                  </Button>
                  <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                    <CheckCircle className="w-3 h-3" /> Approve
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-destructive hover:bg-destructive/10">
                    <XCircle className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )) : (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="w-10 h-10 mx-auto mb-2 text-green-500" />
                <p>No pending event approvals</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Platform Activity</CardTitle>
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
                  {index === 0 && "New event created: Hackathon 2026"}
                  {index === 1 && "Updated club profile information"}
                  {index === 2 && "12 new members joined this week"}
                  {index === 3 && "Posted new announcement to members"}
                  {index === 4 && "Event completed with 156 attendees"}
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

      {/* Top Performing Clubs Table */}
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Events</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Engagement</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_CLUBS.slice(0, 5).map((club, index) => (
                  <tr key={club.id} className="border-b border-border/50 hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <Link href={`/clubs/${club.id}`} className="flex items-center gap-3 hover:text-primary">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={club.logo} />
                          <AvatarFallback>{club.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{club.name}</span>
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-sm">{club.memberCount}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">{club.category}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{Math.floor(Math.random() * 10) + 1}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${85 - index * 8}%` }}
                          />
                        </div>
                        <span className="text-xs">{85 - index * 8}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-500/10 text-green-600">
                        Active
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <Link href="/admin/clubs">
              <Button variant="outline" size="sm">View All Clubs</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
