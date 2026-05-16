"use client"

import { useState } from "react"
import { 
  FileText, Search, Filter, MoreHorizontal, AlertTriangle, Flag, 
  CheckCircle, Clock, Eye, MessageSquare, Calendar, TrendingUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock reports data
const reports = [
  {
    id: "1",
    type: "content",
    title: "Inappropriate post in Tech Club",
    description: "User reported a post containing offensive language in the Tech Innovators Club feed.",
    reporter: { name: "Tigist Haile", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tigist" },
    reported: { name: "Anonymous User", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anon" },
    status: "pending",
    priority: "high",
    createdAt: "2 hours ago",
    club: "Tech Innovators Club",
  },
  {
    id: "2",
    type: "user",
    title: "Harassment complaint",
    description: "Multiple users reported harassment from a member in the debate club discussions.",
    reporter: { name: "Dawit Bekele", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dawit" },
    reported: { name: "Kebede Alemu", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kebede" },
    status: "investigating",
    priority: "high",
    createdAt: "5 hours ago",
    club: "Debate Society",
  },
  {
    id: "3",
    type: "event",
    title: "Event safety concern",
    description: "Report about potential safety issues with an upcoming outdoor event location.",
    reporter: { name: "Sara Tadesse", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara" },
    reported: { name: "Hiking Club Event", avatar: "" },
    status: "resolved",
    priority: "medium",
    createdAt: "1 day ago",
    club: "Hiking Club",
  },
  {
    id: "4",
    type: "club",
    title: "Club registration fraud",
    description: "Suspected fake club registration with falsified officer information.",
    reporter: { name: "System Auto-detect", avatar: "" },
    reported: { name: "Crypto Investment Club", avatar: "" },
    status: "pending",
    priority: "high",
    createdAt: "3 days ago",
    club: "Crypto Investment Club",
  },
  {
    id: "5",
    type: "content",
    title: "Spam posts in multiple clubs",
    description: "User posting promotional content across several club pages.",
    reporter: { name: "Multiple Officers", avatar: "" },
    reported: { name: "Marketing Bot", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bot" },
    status: "resolved",
    priority: "low",
    createdAt: "1 week ago",
    club: "Various",
  },
]

const stats = [
  { label: "Open Reports", value: "12", icon: AlertTriangle, color: "text-amber-500" },
  { label: "Investigating", value: "5", icon: Clock, color: "text-blue-500" },
  { label: "Resolved This Week", value: "23", icon: CheckCircle, color: "text-green-500" },
  { label: "Avg Resolution Time", value: "2.3d", icon: TrendingUp, color: "text-purple-500" },
]

export default function AdminReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesType = typeFilter === "all" || report.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Pending</Badge>
      case 'investigating':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Investigating</Badge>
      case 'resolved':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Resolved</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>
      case 'medium':
        return <Badge variant="outline" className="text-xs text-amber-500 border-amber-500/30">Medium</Badge>
      default:
        return <Badge variant="outline" className="text-xs">Low</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content':
        return <FileText className="w-4 h-4" />
      case 'user':
        return <Flag className="w-4 h-4" />
      case 'event':
        return <Calendar className="w-4 h-4" />
      case 'club':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Moderation</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage user reports and content moderation
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold mt-2">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="all">All Reports</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="investigating">Investigating</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-[200px]"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="club">Club</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="bg-card/50 hover:bg-card/70 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      {getTypeIcon(report.type)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{report.title}</h3>
                        {getPriorityBadge(report.priority)}
                        {getStatusBadge(report.status)}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{report.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {report.createdAt}
                        </span>
                        <span>Club: {report.club}</span>
                        <span>Reporter: {report.reporter.name}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-14 md:ml-0">
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Contact Reporter
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Clock className="w-4 h-4 mr-2" />
                          Mark Investigating
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-green-500">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Resolved
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredReports.length === 0 && (
            <Card className="bg-card/50">
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-1">No reports found</h3>
                <p className="text-sm text-muted-foreground">All caught up! No reports match your criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending">
          <Card className="bg-card/50">
            <CardContent className="py-12 text-center">
              <Clock className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-1">Pending Reports</h3>
              <p className="text-sm text-muted-foreground">
                {reports.filter(r => r.status === 'pending').length} reports awaiting review
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigating">
          <Card className="bg-card/50">
            <CardContent className="py-12 text-center">
              <AlertTriangle className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-1">Under Investigation</h3>
              <p className="text-sm text-muted-foreground">
                {reports.filter(r => r.status === 'investigating').length} reports being investigated
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card className="bg-card/50">
            <CardContent className="py-12 text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-1">Resolved Reports</h3>
              <p className="text-sm text-muted-foreground">
                {reports.filter(r => r.status === 'resolved').length} reports resolved
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
