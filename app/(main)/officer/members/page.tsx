"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Download, Mail, UserCheck, UserX, MoreVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_MEMBERS, MOCK_MEMBERSHIP_REQUESTS, type Member, type MembershipRequest } from "@/lib/mock-data"

function formatRole(role: string) {
  return role
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default function OfficerMembersPage() {
  const [activeTab, setActiveTab] = useState("members")
  const [search, setSearch] = useState("")
  const [members, setMembers] = useState<Member[]>(
    MOCK_MEMBERS.filter(m => m.clubId === "club-3")
  )
  const [requests, setRequests] = useState<MembershipRequest[]>(
    MOCK_MEMBERSHIP_REQUESTS.filter(r => r.clubId === "club-3")
  )

  const filteredMembers = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return members
    return members.filter((member) => {
      const fullName = `${member.firstName} ${member.lastName}`.toLowerCase()
      return (
        fullName.includes(term) ||
        member.email.toLowerCase().includes(term) ||
        member.role.toLowerCase().includes(term)
      )
    })
  }, [members, search])

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId))
    // In real app, would add to members list
  }

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Members</h1>
          <p className="text-muted-foreground">
            Manage your club roster and join requests
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button>
            <Mail className="w-4 h-4 mr-2" /> Message All
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="members">
            All Members ({members.length})
          </TabsTrigger>
          <TabsTrigger value="requests">
            Pending Requests ({requests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <Card>
            <div className="p-4 border-b border-border flex flex-col sm:flex-row gap-4 items-center justify-between bg-muted/30">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 font-medium">Member</th>
                    <th className="px-6 py-4 font-medium">Role</th>
                    <th className="px-6 py-4 font-medium">Join Date</th>
                    <th className="px-6 py-4 font-medium">Attendance</th>
                    <th className="px-6 py-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>
                                {member.firstName[0]}{member.lastName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">
                                {member.firstName} {member.lastName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {member.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant={member.role === "member" ? "outline" : "default"}
                            className={member.role !== "member" ? "bg-primary/20 text-primary border-primary/30" : ""}
                          >
                            {formatRole(member.role)}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {new Date(member.joinDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-muted rounded-full max-w-[60px]">
                              <div
                                className={`h-full rounded-full ${
                                  member.attendance >= 80
                                    ? "bg-green-500"
                                    : member.attendance >= 60
                                    ? "bg-amber-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${member.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {member.attendance}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="text-muted-foreground hover:text-foreground p-1">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-8 text-muted-foreground text-center">
                        No members found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="mt-6 space-y-4">
          {requests.length > 0 ? (
            requests.map((req) => (
              <Card key={req.id}>
                <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={req.userAvatar} />
                      <AvatarFallback>
                        {req.userName.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {req.userName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {req.userEmail} • Applied{" "}
                        {new Date(req.submittedAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-foreground bg-muted/50 p-3 rounded-lg border">
                        &quot;{req.message}&quot;
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    <Button
                      variant="outline"
                      className="flex-1 text-destructive border-destructive/30 hover:bg-destructive/10"
                      onClick={() => handleReject(req.id)}
                    >
                      <UserX className="w-4 h-4 mr-2" /> Decline
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => handleApprove(req.id)}
                    >
                      <UserCheck className="w-4 h-4 mr-2" /> Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <UserCheck className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="font-medium text-foreground mb-2">No pending requests</h3>
                <p className="text-sm text-muted-foreground">
                  All membership requests have been processed.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
