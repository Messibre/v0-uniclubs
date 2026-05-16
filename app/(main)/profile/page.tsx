"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Settings, Shield, Bell, LogOut, Camera, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useDemoStore, useAuthStore } from "@/lib/store"
import { DEMO_USERS } from "@/lib/mock-data"

export default function ProfilePage() {
  const router = useRouter()
  const { currentRole, isDemoMode } = useDemoStore()
  const { logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)

  const user = isDemoMode ? DEMO_USERS[currentRole] : null

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    major: user?.major || "",
    department: user?.department || "",
    bio: user?.bio || "",
    interests: user?.interests || [],
  })

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0 space-y-1">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "general"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Settings className="w-4 h-4" /> General Info
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "notifications"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === "privacy"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Shield className="w-4 h-4" /> Privacy & Data
          </button>
          <div className="pt-4 mt-4 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === "general" && (
            <Card>
              <CardHeader>
                <CardTitle>Public Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24 ring-4 ring-background shadow-lg">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback className="text-2xl">
                          {user.firstName[0]}{user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                      >
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Profile Photo</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        JPG, GIF or PNG. Max size of 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input
                        id="studentId"
                        defaultValue={user.studentId || "N/A"}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue={user.email}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major / Faculty</Label>
                      <Input
                        id="major"
                        value={formData.major}
                        onChange={(e) =>
                          setFormData({ ...formData, major: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={formData.department || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, department: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Tell us about yourself..."
                      value={formData.bio}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <div className="flex flex-wrap gap-2">
                      {formData.interests.map((interest) => (
                        <Badge key={interest} variant="secondary">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Badges & Achievements</Label>
                    <div className="flex flex-wrap gap-2">
                      {user.badges.map((badge) => (
                        <Badge key={badge} className="bg-amber-500/10 text-amber-500 border-amber-500/30">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    id: "events",
                    title: "Upcoming Events",
                    desc: "Reminders for events you RSVP'd to (24h before)",
                    defaultChecked: true,
                  },
                  {
                    id: "clubs",
                    title: "Club Announcements",
                    desc: "News and updates from clubs you are a member of",
                    defaultChecked: true,
                  },
                  {
                    id: "admin",
                    title: "Platform Alerts",
                    desc: "Important administrative notices (Cannot be disabled)",
                    defaultChecked: true,
                    disabled: true,
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 p-4 rounded-lg border bg-card/50"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked={item.defaultChecked}
                        disabled={item.disabled}
                      />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary peer-disabled:opacity-50" />
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {activeTab === "privacy" && (
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start justify-between gap-4 p-4 rounded-lg border border-primary/30 bg-primary/5">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground">AI Recommendations</p>
                      <Badge className="bg-primary/20 text-primary border-primary/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI Feature
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Allow UniClubs to analyze your club memberships and activity to
                      provide personalized event and club recommendations.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-muted rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>

                <div className="p-4 rounded-lg border bg-card/50">
                  <h4 className="font-medium text-foreground mb-2">Export Your Data</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download a copy of all your data including profile information,
                    club memberships, and activity history.
                  </p>
                  <Button variant="outline">Request Data Export</Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-destructive mb-2">
                    Danger Zone
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data. This
                    action cannot be undone.
                  </p>
                  <Button
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10"
                  >
                    Request Account Deletion
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
