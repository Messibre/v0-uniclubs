"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, Users, TrendingUp, ArrowRight, Clock, MapPin, Bell, Award, BookOpen } from "lucide-react"
import { useAuthStore, useDemoStore } from "@/lib/store"
import { MOCK_CLUBS, MOCK_EVENTS, MOCK_NOTIFICATIONS, MOCK_POSTS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentDashboardPage() {
  const { user, isAuthenticated } = useAuthStore()
  const { isDemoMode } = useDemoStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated && !isDemoMode) {
      router.push("/login")
    }
  }, [isAuthenticated, isDemoMode, router])

  if (!isAuthenticated) {
    return null
  }

  // Get user's clubs
  const myClubs = MOCK_CLUBS.filter(club => user?.joinedClubs?.includes(club.id))
  const pendingClubs = MOCK_CLUBS.filter(club => 
    user?.role === 'student' && MOCK_CLUBS.find(c => c.id === 'club-4')?.id === club.id
  )
  
  // Get upcoming events from user's clubs
  const upcomingEvents = MOCK_EVENTS.filter(event => 
    myClubs.some(club => club.id === event.clubId)
  ).slice(0, 3)

  // Get notifications for student
  const notifications = MOCK_NOTIFICATIONS.student?.slice(0, 3) || []

  // Recommendations based on interests
  const recommendations = MOCK_CLUBS.filter(club => 
    !user?.joinedClubs?.includes(club.id)
  ).slice(0, 3)

  // Recent posts from joined clubs
  const recentPosts = MOCK_POSTS.filter(post =>
    myClubs.some(club => club.id === post.clubId)
  ).slice(0, 2)

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {user?.firstName}!
          </h1>
          <p className="text-muted-foreground">
            Here is what is happening in your clubs today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1">
            <BookOpen className="w-3 h-3" />
            {user?.major || 'Student'}
          </Badge>
          <Badge variant="secondary" className="gap-1">
            <Users className="w-3 h-3" />
            {myClubs.length} Clubs
          </Badge>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-500/10 border-blue-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{myClubs.length}</p>
              <p className="text-xs text-muted-foreground">My Clubs</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/10 border-amber-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{upcomingEvents.length}</p>
              <p className="text-xs text-muted-foreground">Upcoming Events</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-purple-500/10 border-purple-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <Award className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{user?.badges?.length || 0}</p>
              <p className="text-xs text-muted-foreground">Badges</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">1</p>
              <p className="text-xs text-muted-foreground">Pending Request</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* My Clubs */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> My Clubs
              </h2>
              <Link href="/discover">
                <Button variant="ghost" size="sm">
                  Browse All <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myClubs.length > 0 ? myClubs.map((club) => (
                <Link key={club.id} href={`/clubs/${club.id}`}>
                  <Card className="hover:shadow-glow transition-all duration-300 h-full">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={club.logo} />
                          <AvatarFallback>{club.shortName}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground truncate">{club.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {club.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {club.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {club.memberCount} members
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )) : (
                <Card className="col-span-2 bg-muted/30">
                  <CardContent className="p-6 text-center">
                    <Users className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">You have not joined any clubs yet.</p>
                    <Link href="/discover">
                      <Button className="mt-4" size="sm">Discover Clubs</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Pending Request */}
            {pendingClubs.length > 0 && (
              <Card className="mt-4 border-amber-500/30 bg-amber-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium text-amber-600 dark:text-amber-400">Pending Membership Request</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={MOCK_CLUBS[3].logo} />
                        <AvatarFallback>DPS</AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium">Debate & Public Speaking</span>
                    </div>
                    <Badge variant="outline" className="text-amber-600">Awaiting Approval</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Upcoming Events */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" /> Upcoming Events
              </h2>
              <Link href="/events">
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-1 w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.id}`}>
                  <Card className="hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-4 flex justify-between items-center">
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
                          <p className="text-xs text-muted-foreground mt-1">
                            by {event.club?.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">
                          {event.rsvpCount} RSVPs
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {event.capacity - event.attendeeCount} spots left
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )) : (
                <Card className="bg-muted/30">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-10 h-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No upcoming events from your clubs.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>

          {/* Recent Activity Feed */}
          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-primary" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Card key={post.id} className="hover:shadow-glow transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={post.clubLogo} />
                        <AvatarFallback>{post.clubName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{post.clubName}</span>
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
                    notif.read ? 'bg-muted/30' : 'bg-primary/5 border-l-2 border-primary'
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

          {/* Recommendations */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                Based on your interests and activity.
              </p>
              {recommendations.map((club) => (
                <Link
                  key={club.id}
                  href={`/clubs/${club.id}`}
                  className="flex items-center gap-3 p-2 hover:bg-card rounded-lg transition-colors"
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={club.logo} />
                    <AvatarFallback>{club.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{club.name}</p>
                    <p className="text-xs text-muted-foreground">{club.memberCount} members</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Join</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Award className="w-4 h-4" /> Your Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user?.badges?.length ? (
                  user.badges.map((badge) => (
                    <div
                      key={badge}
                      className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
                    >
                      {badge}
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No achievements yet. Join clubs and participate in events!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/discover">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 w-4 h-4" /> Discover Clubs
                </Button>
              </Link>
              <Link href="/events">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2 w-4 h-4" /> Browse Events
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
