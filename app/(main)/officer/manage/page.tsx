"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft, Settings, Users, Calendar, MessageSquare, 
  Image, Link2, Edit, Save, ChevronRight, Bell
} from "lucide-react"
import { useAuthStore, useDemoStore } from "@/lib/store"
import { MOCK_CLUBS } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const managementSections = [
  {
    id: "overview",
    label: "Overview",
    icon: Settings,
    description: "General club settings and information",
  },
  {
    id: "members",
    label: "Members",
    icon: Users,
    description: "Manage members and membership requests",
  },
  {
    id: "events",
    label: "Events",
    icon: Calendar,
    description: "Create and manage club events",
  },
  {
    id: "posts",
    label: "Posts",
    icon: MessageSquare,
    description: "Manage club posts and announcements",
  },
  {
    id: "media",
    label: "Media",
    icon: Image,
    description: "Club photos and media gallery",
  },
  {
    id: "links",
    label: "Social Links",
    icon: Link2,
    description: "Manage social media and website links",
  },
]

export default function OfficerManagePage() {
  const { user, isAuthenticated } = useAuthStore()
  const { isDemoMode } = useDemoStore()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    if (!isAuthenticated && !isDemoMode) {
      router.push("/login")
    }
    if (isAuthenticated && user?.role === 'student') {
      router.push("/dashboard")
    }
  }, [isAuthenticated, isDemoMode, user, router])

  if (!isAuthenticated || user?.role === 'student') {
    return null
  }

  const primaryClub = MOCK_CLUBS.find(club => user?.managedClubs?.includes(club.id)) || MOCK_CLUBS[2]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/officer/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manage Club</h1>
            <p className="text-muted-foreground">{primaryClub.name}</p>
          </div>
        </div>
        <Button className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-2">
              <nav className="space-y-1">
                {managementSections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                        activeSection === section.id
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium text-sm">{section.label}</span>
                      <ChevronRight className={cn(
                        "w-4 h-4 ml-auto transition-transform",
                        activeSection === section.id && "rotate-90"
                      )} />
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeSection === "overview" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Club Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Club Logo & Cover */}
                <div className="flex items-start gap-6">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 border-4 border-muted">
                      <AvatarImage src={primaryClub.logo} />
                      <AvatarFallback className="text-2xl">{primaryClub.shortName}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2 gap-1">
                      <Edit className="w-3 h-3" /> Change
                    </Button>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2">Cover Photo</label>
                    <div 
                      className="h-32 rounded-lg bg-cover bg-center relative group"
                      style={{ backgroundImage: `url(${primaryClub.coverPhoto})` }}
                    >
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button variant="secondary" size="sm">Change Cover</Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Basic Info Form */}
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Club Name</label>
                    <input
                      type="text"
                      defaultValue={primaryClub.name}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Short Name</label>
                    <input
                      type="text"
                      defaultValue={primaryClub.shortName}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary">
                      <option value="Cultural">Cultural</option>
                      <option value="STEM">STEM</option>
                      <option value="Professional">Professional</option>
                      <option value="Service">Service</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      rows={4}
                      defaultValue={primaryClub.description}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mission Statement</label>
                    <textarea
                      rows={2}
                      defaultValue={primaryClub.missionStatement}
                      className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary resize-none"
                    />
                  </div>
                </div>

                {/* Settings */}
                <div className="border-t border-border pt-6">
                  <h3 className="font-bold mb-4">Club Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Membership Policy</p>
                        <p className="text-sm text-muted-foreground">Who can join your club</p>
                      </div>
                      <select className="px-3 py-2 bg-muted border border-border rounded-lg">
                        <option value="open">Open to All</option>
                        <option value="approval_required">Approval Required</option>
                        <option value="invite_only">Invite Only</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Recruiting Status</p>
                        <p className="text-sm text-muted-foreground">Show recruiting badge on profile</p>
                      </div>
                      <button className="w-12 h-6 bg-green-500 rounded-full relative">
                        <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeSection === "members" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Members ({primaryClub.memberCount})
                </CardTitle>
                <Button size="sm">Invite Members</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Member management interface would go here with list of members,
                  roles, and pending requests.
                </p>
              </CardContent>
            </Card>
          )}

          {activeSection === "events" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Events
                </CardTitle>
                <Button size="sm">Create Event</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Event management interface would go here with list of upcoming
                  and past events.
                </p>
              </CardContent>
            </Card>
          )}

          {activeSection === "posts" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Posts & Announcements
                </CardTitle>
                <Button size="sm">New Post</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Post management interface would go here with drafts, published,
                  and scheduled posts.
                </p>
              </CardContent>
            </Card>
          )}

          {activeSection === "media" && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5" />
                  Media Gallery
                </CardTitle>
                <Button size="sm">Upload</Button>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Media gallery interface would go here with photos and videos.
                </p>
              </CardContent>
            </Card>
          )}

          {activeSection === "links" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="w-5 h-5" />
                  Social Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Instagram</label>
                  <input
                    type="text"
                    defaultValue={primaryClub.socialLinks?.instagram || ''}
                    placeholder="@yourclub"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telegram</label>
                  <input
                    type="text"
                    defaultValue={primaryClub.socialLinks?.telegram || ''}
                    placeholder="@yourclub"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <input
                    type="url"
                    defaultValue={primaryClub.socialLinks?.website || ''}
                    placeholder="https://yourclub.com"
                    className="w-full px-3 py-2 bg-muted border border-border rounded-lg focus:outline-none focus:border-primary"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
