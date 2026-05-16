"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Calendar, Users, TrendingUp, ArrowRight, Clock, MapPin, 
  Bell, Award, Settings, UserPlus, BarChart3, MessageSquare,
  CheckCircle, XCircle, Building, Plus, Eye
} from "lucide-react"
import { useAuthStore, useDemoStore } from "@/lib/store"
import { 
  MOCK_CLUBS, MOCK_EVENTS, MOCK_NOTIFICATIONS, MOCK_POSTS,
  MOCK_MEMBERSHIP_REQUESTS, MOCK_OFFICER_STATS 
} from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function OfficerDashboardPage() {
  const { user, isAuthenticated } = useAuthStore()
  const { isDemoMode } = useDemoStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isDemoMode) {
      router.push("/login")
    }
    // Redirect non-officers to regular dashboard
    if (isAuthenticated && user?.role === 'student') {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isDemoMode, user, router])

  if (!isAuthenticated || user?.role === 'student') {
    return null
  }

  // Get the club(s) this officer manages
  const managedClubs = MOCK_CLUBS.filter(club => user?.managedClubs?.includes(club.id))
  const primaryClub = managedClubs[0] || MOCK_CLUBS[2] // Ethiopian Cultural Club for demo

  // Get pending membership requests for managed clubs
  const pendingRequests = MOCK_MEMBERSHIP_REQUESTS.filter(
    req => req.clubId === primaryClub.id && req.status === 'pending'
  )

  // Get upcoming events for managed clubs
  const clubEvents = MOCK_EVENTS.filter(event => event.clubId === primaryClub.id)

  // Get notifications for officer
  const notifications = MOCK_NOTIFICATIONS.officer || []

  // Get posts from managed clubs
  const clubPosts = MOCK_POSTS.filter(post => post.clubId === primaryClub.id)

  const stats = MOCK_OFFICER_STATS

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge className="bg-amber-500 text-white">Club Officer</Badge>
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            Officer Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage {primaryClub.name} and keep your members engaged.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/officer/manage">
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              Manage Club
            </Button>
          </Link>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>
      </header>

      {/* Club Overview Card */}
      <Card className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-amber-500/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-20 h-20 border-4 border-amber-500/30">
              <AvatarImage src={primaryClub.logo} />
              <AvatarFallback className="text-2xl">{primaryClub.shortName}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground">{primaryClub.name}</h2>
              <p className="text-muted-foreground mt-1">{primaryClub.description}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <Badge variant="outline">{primaryClub.category}</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Users className="w-4 h-4" /> {primaryClub.memberCount} members
                </span>
                <Badge className="bg-green-500/10 text-green-600">
                  {primaryClub.recruitingStatus ? 'Recruiting' : 'Not Recruiting'}
                </Badge>
              </div>
            </div>
            <Link href={`/clubs/${primaryClub.id}`}>
              <Button variant="outline" className="gap-2">
                <Eye className="w-4 h-4" />
                View Public Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.totalMembers}</p>
              <p className="text-xs text-muted-foreground">Total Members</p>
            </div>
            <Badge className="ml-auto bg-green-500/10 text-green-600 text-xs">
              +{stats.memberGrowth}%
            </Badge>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingRequests.length}</p>
              <p className="text-xs text-muted-foreground">Pending Requests</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.upcomingEvents}</p>
              <p className="text-xs text-muted-foreground">Upcoming Events</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.engagementRate}%</p>
              <p className="text-xs text-muted-foreground">Engagement</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Pending Membership Requests */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-500" /> Membership Requests
                {pendingRequests.length > 0 && (
                  <Badge variant="secondary">{pendingRequests.length} pending</Badge>
                )}
              </h2>
              <Link href="/officer/manage/members">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            {pendingRequests.length > 0 ? (
              <div className="space-y-3">
                {pendingRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-glow transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={request.userAvatar} />
                          <AvatarFallback>{request.userName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-bold text-foreground">{request.userName}</h4>
                            <span className="text-xs text-muted-foreground">
                              {new Date(request.submittedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{request.userEmail}</p>
                          <p className="text-sm mt-2 p-2 bg-muted/50 rounded-lg italic">
                            &ldquo;{request.message}&rdquo;
                          </p>
                          <div className="flex gap-2 mt-3">
                            <Button size="sm" className="gap-1 bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4" /> Approve
                            </Button>
                            <Button size="sm" variant="outline" className="gap-1 text-destructive hover:bg-destructive/10">
                              <XCircle className="w-4 h-4" /> Decline
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-muted/30">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="w-10 h-10 mx-auto text-green-500 mb-2" />
                  <p className="text-muted-foreground">No pending membership requests.</p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Upcoming Club Events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Club Events
              </h2>
              <Button variant="ghost" size="sm" className="gap-1">
                <Plus className="w-4 h-4" /> Create Event
              </Button>
            </div>
            <div className="space-y-4">
              {clubEvents.length > 0 ? clubEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-glow transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 rounded-lg p-3 text-center min-w-[60px]">
                          <span className="block text-xs text-primary font-bold uppercase">
                            {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                          </span>
                          <span className="block text-xl font-bold">
                            {new Date(event.date).getDate()}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground">{event.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {event.locationType.replace('_', ' ')}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {event.rsvpCount}/{event.capacity} RSVPs
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                        <Button size="sm" variant="ghost" className="text-xs">
                          View RSVPs
                        </Button>
                      </div>
                    </div>
                    {/* RSVP Progress */}
                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className="font-medium">{Math.round((event.rsvpCount / event.capacity) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all"
                          style={{ width: `${(event.rsvpCount / event.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )) : (
                <Card className="bg-muted/30">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No upcoming events.</p>
                    <Button className="mt-4" size="sm">Create Your First Event</Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* Recent Posts */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" /> Recent Posts
              </h2>
              <Button variant="ghost" size="sm" className="gap-1">
                <Plus className="w-4 h-4" /> New Post
              </Button>
            </div>
            <div className="space-y-4">
              {clubPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-glow transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.authorAvatar} />
                        <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{post.authorName}</span>
                          <Badge variant="outline" className="text-xs">{post.type}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Bell className="w-4 h-4" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-3 rounded-lg transition-colors ${
                    notif.read ? 'bg-muted/30' : 'bg-amber-500/10 border-l-2 border-amber-500'
                  }`}
                >
                  <p className="text-sm font-medium">{notif.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{notif.message}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Club Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Event Attendance</span>
                <span className="font-bold">{stats.eventAttendance}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${stats.eventAttendance}%` }}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Member Growth</span>
                <span className="font-bold text-green-600">+{stats.memberGrowth}%</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Post Engagement</span>
                <span className="font-bold">{stats.engagementRate}%</span>
              </div>
              
              <Link href="/officer/analytics">
                <Button variant="outline" className="w-full mt-2" size="sm">
                  View Full Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <UserPlus className="mr-2 w-4 h-4" /> Invite Members
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 w-4 h-4" /> Schedule Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 w-4 h-4" /> Post Announcement
              </Button>
              <Link href="/officer/manage">
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="mr-2 w-4 h-4" /> Club Settings
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Officer Badge */}
          <Card className="bg-amber-500/10 border-amber-500/20">
            <CardContent className="p-4 text-center">
              <Award className="w-12 h-12 mx-auto text-amber-500 mb-2" />
              <h3 className="font-bold">Club President</h3>
              <p className="text-sm text-muted-foreground">{primaryClub.name}</p>
              <div className="flex flex-wrap justify-center gap-1 mt-3">
                {user?.badges?.map((badge) => (
                  <Badge key={badge} variant="outline" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
