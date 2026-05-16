"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Calendar, Users, TrendingUp, ArrowRight } from "lucide-react"
import { useAuthStore } from "@/lib/store"
import { MOCK_CLUBS, MOCK_EVENTS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ClubCard, EventCard } from "@/components/cards"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const upcomingEvents = MOCK_EVENTS.slice(0, 3)
  const myClubs = MOCK_CLUBS.slice(0, 2)
  const recommendations = [MOCK_CLUBS[4], MOCK_CLUBS[5]]

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground">
          Here is what is happening in your clubs today.
        </p>
      </header>

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
              {myClubs.map((club) => (
                <ClubCard key={club.id} club={club} />
              ))}
            </div>
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
              {upcomingEvents.map((event) => (
                <Card
                  key={event.id}
                  className="hover:shadow-glow transition-all duration-300"
                >
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
                        <p className="text-sm text-muted-foreground">
                          {event.location} | {event.club?.name}
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {event.attendeeCount} attending
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recommendations */}
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Recommended for You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                Based on your community activity.
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
                  <span className="text-xs font-bold text-primary">View</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold">Your Achievements</CardTitle>
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
