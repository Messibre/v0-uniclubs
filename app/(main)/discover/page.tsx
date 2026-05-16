"use client"

import { useState } from "react"
import { Search, Filter, Compass } from "lucide-react"
import { MOCK_CLUBS } from "@/lib/mock-data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ClubCard } from "@/components/cards"

const categories = ["All", "STEM", "Arts", "Sports", "Cultural", "Professional", "Hobbies"]

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredClubs = MOCK_CLUBS.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      club.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" || club.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <section className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-4">Discover Clubs</h1>
        <p className="text-muted-foreground mb-8">
          Find your community. Search through hundreds of student organizations.
        </p>

        <div className="flex gap-3 max-w-xl mx-auto">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search by name, keyword, or category..."
              className="pl-12 py-3 rounded-full bg-card shadow-sm focus:shadow-glow text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="shrink-0 rounded-full px-4 border-border bg-card"
          >
            <Filter className="w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Category Filter Strip */}
      <section className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground border-primary shadow-glow"
                : "bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Results Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Compass className="w-5 h-5 text-primary" />
            {searchQuery ? "Search Results" : "Explore"}
          </h2>
          <span className="text-sm text-muted-foreground">
            {filteredClubs.length} clubs found
          </span>
        </div>

        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-border border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No clubs found</h3>
            <p className="text-muted-foreground">
              {"We couldn't find any clubs matching your criteria."}
            </p>
            <Button
              variant="ghost"
              className="mt-4"
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
