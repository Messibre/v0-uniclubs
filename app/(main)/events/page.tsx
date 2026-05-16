"use client"

import { useState } from "react"
import { Calendar, Filter } from "lucide-react"
import { MOCK_EVENTS } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/cards"

export default function EventsPage() {
  const [filter, setFilter] = useState("all")

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-foreground mb-4">Upcoming Events</h1>
        <p className="text-muted-foreground mb-8">
          Discover and RSVP to events happening across campus clubs.
        </p>
      </section>

      {/* Filter */}
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All Events
          </Button>
          <Button
            variant={filter === "upcoming" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("upcoming")}
          >
            This Week
          </Button>
          <Button
            variant={filter === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("month")}
          >
            This Month
          </Button>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" /> Filter
        </Button>
      </section>

      {/* Events Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {MOCK_EVENTS.length} Events
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_EVENTS.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  )
}
