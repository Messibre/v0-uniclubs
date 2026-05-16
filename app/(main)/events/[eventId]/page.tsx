"use client"

import { useState, use } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Users, Clock, CheckCircle } from "lucide-react"
import { MOCK_EVENTS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EventDetailPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = use(params)
  const [rsvpStatus, setRsvpStatus] = useState<"idle" | "pending" | "confirmed">("idle")

  const event = MOCK_EVENTS.find((e) => e.id === eventId) || MOCK_EVENTS[0]
  const eventDate = new Date(event.date)

  const handleRSVP = () => {
    setRsvpStatus("pending")
    setTimeout(() => {
      setRsvpStatus("confirmed")
    }, 1500)
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      {/* Event Header */}
      <div className="relative rounded-xl overflow-hidden bg-card border border-border">
        <div className="h-48 md:h-64 w-full bg-gradient-to-r from-primary/30 to-secondary/30 relative">
          <Badge
            variant="default"
            className="absolute top-4 right-4"
          >
            {event.status}
          </Badge>
          {/* Date Chip */}
          <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-md border border-border rounded-lg px-4 py-2 text-center">
            <span className="block text-sm text-primary font-bold uppercase">
              {eventDate.toLocaleDateString("en-US", { month: "short" })}
            </span>
            <span className="block text-3xl font-bold">{eventDate.getDate()}</span>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {/* Club Info */}
          {event.club && (
            <Link
              href={`/clubs/1`}
              className="inline-flex items-center gap-2 mb-4 hover:text-primary transition-colors"
            >
              <Avatar className="w-8 h-8">
                <AvatarImage src={event.club.logo} />
                <AvatarFallback>{event.club.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{event.club.name}</span>
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {event.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span>
                {eventDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              <span>
                {eventDate.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5" />
              <span>
                {event.attendeeCount} attending
                {event.capacity && ` / ${event.capacity} spots`}
              </span>
              {event.capacity && (
                <Badge variant="outline" className="ml-2">
                  {event.capacity - (event.attendeeCount || 0)} spots left
                </Badge>
              )}
            </div>

            {rsvpStatus === "confirmed" ? (
              <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-success/10 border border-success/30 text-success font-semibold text-sm">
                <CheckCircle className="w-4 h-4" />
                {"You're"} Going!
              </div>
            ) : (
              <Button
                className="shadow-glow"
                onClick={handleRSVP}
                disabled={rsvpStatus === "pending"}
              >
                {rsvpStatus === "pending" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Confirming...
                  </>
                ) : (
                  "RSVP Now"
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About This Event</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {event.description}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Join us for an exciting event organized by {event.club?.name}. This is a great opportunity
                to connect with fellow students, learn new things, and be part of the campus community.
                Whether {"you're"} a member or just curious, everyone is welcome!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    {eventDate.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  </div>
                  <div>
                    <p className="font-medium">Registration & Check-in</p>
                    <p className="text-sm text-muted-foreground">Arrival and welcome</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    {new Date(eventDate.getTime() + 30 * 60000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  </div>
                  <div>
                    <p className="font-medium">Main Event</p>
                    <p className="text-sm text-muted-foreground">Core activities and presentations</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-16 text-sm text-muted-foreground">
                    {new Date(eventDate.getTime() + 120 * 60000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                  </div>
                  <div>
                    <p className="font-medium">Networking</p>
                    <p className="text-sm text-muted-foreground">Connect with attendees</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="font-medium">{event.location}</p>
              <p className="text-sm text-muted-foreground">University Campus</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Organizer</CardTitle>
            </CardHeader>
            <CardContent>
              {event.club && (
                <Link
                  href={`/clubs/1`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                >
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={event.club.logo} />
                    <AvatarFallback>{event.club.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{event.club.name}</p>
                    <p className="text-sm text-muted-foreground">View Club</p>
                  </div>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
