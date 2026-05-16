"use client"

import { Download, Sparkles } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useDemoStore } from "@/lib/store"
import { MOCK_ANALYTICS, MOCK_AI_RECOMMENDATIONS } from "@/lib/mock-data"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const COLORS = ['#3b82f6', '#22c55e', '#f59e0b', '#ef4444']

export default function OfficerAnalyticsPage() {
  const { isDemoMode } = useDemoStore()
  const analytics = MOCK_ANALYTICS.club
  const aiInsights = MOCK_AI_RECOMMENDATIONS.officer

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Club Analytics</h1>
          <p className="text-muted-foreground">
            Deep dive into your club&apos;s performance and engagement data
          </p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* AI Insights Card */}
      <Card className="border-primary/30 bg-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">AI Executive Summary</CardTitle>
            <Badge className="bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {aiInsights.insights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-border">
            <p className="text-sm font-medium text-foreground mb-2">Suggestions:</p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {aiInsights.suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">→</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Attendance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Event Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.eventAttendance} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false} 
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false} 
                    tickLine={false}
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Bar dataKey="attendees" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Post Engagement */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Post Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.postEngagement} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false} 
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false} 
                    tickLine={false}
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="views" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="likes" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="comments" stroke="#22c55e" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Member Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Member Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.memberGrowth} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false} 
                    tickLine={false}
                    fontSize={12}
                  />
                  <YAxis 
                    tick={{ fill: 'hsl(var(--muted-foreground))' }} 
                    axisLine={false} 
                    tickLine={false}
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <Line type="monotone" dataKey="members" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Member Activity Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Member Activity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.memberActivity}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {analytics.memberActivity.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {analytics.memberActivity.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  {entry.name} ({entry.value}%)
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="bg-card/50">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-foreground">189</p>
            <p className="text-sm text-muted-foreground">Total Members</p>
            <p className="text-xs text-green-500 mt-1">+12% this month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-foreground">6</p>
            <p className="text-sm text-muted-foreground">Events This Month</p>
            <p className="text-xs text-green-500 mt-1">+2 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-foreground">85%</p>
            <p className="text-sm text-muted-foreground">Avg Attendance</p>
            <p className="text-xs text-green-500 mt-1">+5% improvement</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardContent className="p-4 text-center">
            <p className="text-3xl font-bold text-foreground">1.2K</p>
            <p className="text-sm text-muted-foreground">Post Engagement</p>
            <p className="text-xs text-green-500 mt-1">+24% this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
