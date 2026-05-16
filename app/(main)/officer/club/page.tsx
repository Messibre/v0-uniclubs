"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  Building, Users, Calendar, FileText, Settings, Camera, Save,
  Mail, Globe, Instagram, MapPin, Clock, ChevronRight, Edit2,
  Image as ImageIcon, Plus, AlertCircle, CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useDemoStore } from "@/lib/store"
import { MOCK_CLUBS, MOCK_EVENTS, MOCK_POSTS, MOCK_MEMBERS } from "@/lib/mock-data"

export default function OfficerClubPage() {
  const { currentRole } = useDemoStore()
  const [saved, setSaved] = useState(false)
  
  // Get the officer's managed club
  const club = MOCK_CLUBS.find(c => c.id === "1") || MOCK_CLUBS[0]
  const clubEvents = MOCK_EVENTS.filter(e => e.clubId === club.id)
  const clubPosts = MOCK_POSTS.filter(p => p.clubId === club.id)
  const clubMembers = MOCK_MEMBERS.filter(m => m.clubId === club.id)

  const [clubData, setClubData] = useState({
    name: club.name,
    description: club.description,
    category: club.category,
    email: "techclub@aau.edu.et",
    website: "https://techclub.aau.edu.et",
    instagram: "@aau_techclub",
    location: "Technology Building, Room 201",
    meetingSchedule: "Wednesdays, 4:00 PM",
    isRecruiting: true,
    requireApproval: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (currentRole !== 'officer') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Access Restricted</h1>
        <p className="text-muted-foreground max-w-md">
          This page is only available to club officers. Switch to officer role to access club management.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Club Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage your club profile, settings, and content
          </p>
        </div>
        <Button onClick={handleSave} className="bg-amber-600 hover:bg-amber-700">
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {saved && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <p className="text-sm text-green-500">Club settings saved successfully!</p>
        </div>
      )}

      {/* Club Header Card */}
      <Card className="bg-card/50 overflow-hidden">
        <div className="relative h-32 bg-gradient-to-r from-amber-600 to-amber-400">
          <Button 
            variant="secondary" 
            size="sm" 
            className="absolute bottom-3 right-3 gap-2"
          >
            <Camera className="w-4 h-4" />
            Change Cover
          </Button>
        </div>
        <CardContent className="pt-0 -mt-12 relative">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                <AvatarImage src={club.logo} />
                <AvatarFallback className="text-2xl">{club.name[0]}</AvatarFallback>
              </Avatar>
              <Button 
                variant="secondary" 
                size="icon" 
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 pt-4 sm:pt-8">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold">{club.name}</h2>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  {club.category}
                </Badge>
                {club.isVerified && (
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    Verified
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {club.memberCount} members · Founded {club.foundedYear}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="details" className="space-y-4">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="details" className="gap-2">
            <Building className="w-4 h-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2">
            <ImageIcon className="w-4 h-4" />
            Media
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Details Tab */}
        <TabsContent value="details" className="space-y-4">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>Update your club&apos;s basic details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clubName">Club Name</Label>
                  <Input
                    id="clubName"
                    value={clubData.name}
                    onChange={(e) => setClubData({...clubData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={clubData.category} 
                    onValueChange={(v) => setClubData({...clubData, category: v})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Arts">Arts & Culture</SelectItem>
                      <SelectItem value="Sports">Sports</SelectItem>
                      <SelectItem value="Academic">Academic</SelectItem>
                      <SelectItem value="Social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={clubData.description}
                  onChange={(e) => setClubData({...clubData, description: e.target.value})}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
              <CardDescription>How members can reach your club</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={clubData.email}
                    onChange={(e) => setClubData({...clubData, email: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Website
                  </Label>
                  <Input
                    id="website"
                    value={clubData.website}
                    onChange={(e) => setClubData({...clubData, website: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">
                    <Instagram className="w-4 h-4 inline mr-2" />
                    Instagram
                  </Label>
                  <Input
                    id="instagram"
                    value={clubData.instagram}
                    onChange={(e) => setClubData({...clubData, instagram: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={clubData.location}
                    onChange={(e) => setClubData({...clubData, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="schedule">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Meeting Schedule
                </Label>
                <Input
                  id="schedule"
                  value={clubData.meetingSchedule}
                  onChange={(e) => setClubData({...clubData, meetingSchedule: e.target.value})}
                  placeholder="e.g., Wednesdays at 4:00 PM"
                />
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-card/50">
              <CardContent className="p-4 text-center">
                <Users className="w-6 h-6 mx-auto text-blue-500 mb-2" />
                <p className="text-2xl font-bold">{clubMembers.length}</p>
                <p className="text-xs text-muted-foreground">Members</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4 text-center">
                <Calendar className="w-6 h-6 mx-auto text-green-500 mb-2" />
                <p className="text-2xl font-bold">{clubEvents.length}</p>
                <p className="text-xs text-muted-foreground">Events</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4 text-center">
                <FileText className="w-6 h-6 mx-auto text-amber-500 mb-2" />
                <p className="text-2xl font-bold">{clubPosts.length}</p>
                <p className="text-xs text-muted-foreground">Posts</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50">
              <CardContent className="p-4 text-center">
                <ChevronRight className="w-6 h-6 mx-auto text-purple-500 mb-2" />
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Club Gallery</CardTitle>
              <CardDescription>Upload photos from events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div 
                    key={i} 
                    className="aspect-square rounded-lg bg-muted/50 relative overflow-hidden group"
                  >
                    <Image
                      src={`https://picsum.photos/seed/club${i}/300/300`}
                      alt={`Gallery image ${i}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button variant="secondary" size="sm">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <button className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Plus className="w-8 h-8" />
                  <span className="text-sm">Add Photo</span>
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="text-lg">Membership Settings</CardTitle>
              <CardDescription>Control how students can join your club</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-0.5">
                  <Label>Open for Recruitment</Label>
                  <p className="text-sm text-muted-foreground">Allow new members to join</p>
                </div>
                <Switch
                  checked={clubData.isRecruiting}
                  onCheckedChange={(v) => setClubData({...clubData, isRecruiting: v})}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-0.5">
                  <Label>Require Approval</Label>
                  <p className="text-sm text-muted-foreground">Manually approve new members</p>
                </div>
                <Switch
                  checked={clubData.requireApproval}
                  onCheckedChange={(v) => setClubData({...clubData, requireApproval: v})}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 border-red-500/20">
            <CardHeader>
              <CardTitle className="text-lg text-red-500">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div className="space-y-0.5">
                  <Label>Transfer Ownership</Label>
                  <p className="text-sm text-muted-foreground">Transfer club to another officer</p>
                </div>
                <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10">
                  Transfer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
