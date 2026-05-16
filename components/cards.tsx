import Link from "next/link"
import { Users, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Club {
  id: string
  name: string
  shortName?: string
  category: string
  description: string
  logo?: string
  memberCount: number
  status?: string
  membershipPolicy?: string
}

interface ClubCardProps {
  club: Club
  isRecommendation?: boolean
}

export function ClubCard({ club, isRecommendation = false }: ClubCardProps) {
  return (
    <Link href={`/clubs/${club.id}`} className="block h-full">
      <Card className="h-full flex flex-col hover:-translate-y-2 hover:shadow-glow group cursor-pointer overflow-hidden transition-all duration-300">
        {/* Cover Image */}
        <div className="h-24 w-full bg-gradient-to-r from-primary/20 to-secondary/20 relative">
          {isRecommendation && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="text-xs">AI Pick</Badge>
            </div>
          )}
        </div>

        <CardContent className="flex-1 flex flex-col pt-0 relative p-4">
          {/* Avatar floating above cover */}
          <div className="flex justify-between items-start -mt-8 mb-3">
            <Avatar className="w-16 h-16 ring-4 ring-card shadow-glow">
              <AvatarImage src={club.logo} alt={club.name} />
              <AvatarFallback className="text-lg font-bold">{club.shortName?.[0] || club.name[0]}</AvatarFallback>
            </Avatar>
            {club.membershipPolicy === "invite_only" && (
              <Badge variant="secondary" className="mt-10">Invite Only</Badge>
            )}
          </div>

          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
            {club.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline">{club.category}</Badge>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 flex-1 mb-4">
            {club.description}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
            <div className="flex items-center text-muted-foreground text-sm">
              <Users className="w-4 h-4 mr-1.5 opacity-70" />
              <span>{club.memberCount} members</span>
            </div>
            <span className="text-sm font-medium text-primary group-hover:underline">
              View Profile
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

interface Event {
  id: string
  title: string
  description?: string
  date: string
  location: string
  capacity?: number
  attendeeCount?: number
  status?: string
  coverImage?: string
  club?: {
    name: string
    logo?: string
  }
}

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  })
  const formattedTime = eventDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  })

  return (
    <Link href={`/events/${event.id}`} className="block h-full">
      <Card className="h-full flex flex-col hover:-translate-y-2 hover:shadow-glow group cursor-pointer overflow-hidden transition-all duration-300">
        {/* Event Image */}
        <div className="h-32 w-full bg-muted relative overflow-hidden">
          {event.coverImage ? (
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-primary/10 flex items-center justify-center">
              <Calendar className="w-10 h-10 text-primary/30" />
            </div>
          )}
          <Badge
            variant={event.status === "Upcoming" ? "default" : "secondary"}
            className="absolute top-2 right-2"
          >
            {event.status || "Upcoming"}
          </Badge>
          {/* Date Chip */}
          <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-md border border-border rounded-md px-2 py-1 text-center min-w-[50px]">
            <span className="block text-xs text-primary font-bold uppercase leading-none mb-1">
              {eventDate.toLocaleDateString("en-US", { month: "short" })}
            </span>
            <span className="block text-lg font-bold leading-none">
              {eventDate.getDate()}
            </span>
          </div>
        </div>

        <CardContent className="flex-1 flex flex-col p-4">
          {event.club && (
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="w-6 h-6">
                <AvatarImage src={event.club.logo} />
                <AvatarFallback>{event.club.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground font-medium truncate">
                {event.club.name}
              </span>
            </div>
          )}

          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-3">
            {event.title}
          </h3>

          <div className="space-y-2 mt-auto">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2 text-primary/70 shrink-0" />
              <span className="truncate">
                {formattedDate} at {formattedTime}
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 mr-2 text-primary/70 shrink-0" />
              <span className="truncate">{event.location || "Online"}</span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-4 h-4 mr-2 text-primary/70 shrink-0" />
              <span className="truncate">
                {event.attendeeCount || 0} attending
                {event.capacity && ` / ${event.capacity} spots`}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
