"use client"

import { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, Users, Calendar, Globe, CheckCircle, MessageSquare, FolderKanban } from "lucide-react"
import { MOCK_CLUBS, MOCK_EVENTS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EventCard } from "@/components/cards"

export default function ClubProfilePage({ params }: { params: Promise<{ clubId: string }> }) {
  const { clubId } = use(params)
  const [joinStatus, setJoinStatus] = useState<"idle" | "pending" | "joined">("idle")

  const club = MOCK_CLUBS.find((c) => c.id === clubId) || MOCK_CLUBS[0]
  const clubEvents = MOCK_EVENTS.filter((e) => e.club?.name === club.name).slice(0, 4)

  const handleJoin = () => {
    setJoinStatus("pending")
    setTimeout(() => {
      setJoinStatus("joined")
    }, 1500)
  }

  return (
    <div className="space-y-8">
      <Link
        href="/discover"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Clubs
      </Link>

      {/* Cover & Header */}
      <div className="relative rounded-xl overflow-hidden bg-card border border-border">
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary/30 to-secondary/30 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <Badge variant="default" className="bg-success text-success-foreground">
              Active
            </Badge>
          </div>
        </div>

        <div className="px-6 md:px-10 pb-8">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16 md:-mt-20 relative z-10">
            <Avatar className="w-32 h-32 md:w-40 md:h-40 ring-4 ring-card shadow-glow">
              <AvatarImage src={club.logo} alt={club.name} />
              <AvatarFallback className="text-4xl font-bold">{club.name[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 pb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {club.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <Badge variant="outline">{club.category}</Badge>
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" /> {club.memberCount} Members
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" /> Est. {new Date(club.createdAt).getFullYear()}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pb-2 w-full md:w-auto">
              {joinStatus === "joined" ? (
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-success/10 border border-success/30 text-success font-semibold text-sm">
                  <CheckCircle className="w-4 h-4" />
                  Member
                </div>
              ) : (
                <Button
                  className="w-full md:w-auto shadow-glow"
                  onClick={handleJoin}
                  disabled={joinStatus === "pending"}
                >
                  {joinStatus === "pending" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Joining...
                    </>
                  ) : (
                    "Request to Join"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start bg-card border border-border rounded-lg p-1 mb-6">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="events">Events ({clubEvents.length})</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {club.missionStatement || club.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {club.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Club Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{club.memberCount}</p>
                      <p className="text-sm text-muted-foreground">Members</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">{clubEvents.length}</p>
                      <p className="text-sm text-muted-foreground">Events</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">12</p>
                      <p className="text-sm text-muted-foreground">Projects</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold text-foreground">4.8</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events" className="space-y-4">
              {clubEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clubEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-bold mb-2">No upcoming events</h3>
                    <p className="text-muted-foreground">
                      This club {"hasn't"} scheduled any events yet.
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="posts" className="space-y-4">
              <Card>
                <CardContent className="py-12 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Club Posts</h3>
                  <p className="text-muted-foreground">
                    Join the club to see posts and announcements.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="members" className="space-y-4">
              <Card>
                <CardContent className="py-12 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-2">Member Roster</h3>
                  <p className="text-muted-foreground">
                    Roster visibility depends on your membership status.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {club.socialLinks?.website && (
                <a
                  href={club.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10">
                    <Globe className="w-5 h-5" />
                  </div>
                  <span className="flex-1 truncate">Website</span>
                </a>
              )}
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="flex-1">Open to all students</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FolderKanban className="mr-2 w-4 h-4" /> View Projects
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 w-4 h-4" /> See All Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
