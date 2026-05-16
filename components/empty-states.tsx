"use client"

import { LucideIcon, Search, Users, Calendar, FileText, Building, Bell, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface EmptyStateProps {
  icon?: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({ 
  icon: Icon = AlertCircle, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-12 text-center", className)}>
      <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-sm mb-4">{description}</p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  )
}

// Pre-configured empty states for common scenarios
export function NoSearchResults({ query, onClear }: { query: string; onClear?: () => void }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={`No results found for "${query}". Try adjusting your search or filters.`}
      action={onClear ? { label: "Clear Search", onClick: onClear } : undefined}
    />
  )
}

export function NoClubs({ onDiscover }: { onDiscover?: () => void }) {
  return (
    <EmptyState
      icon={Building}
      title="No clubs yet"
      description="You haven't joined any clubs yet. Discover clubs that match your interests!"
      action={onDiscover ? { label: "Discover Clubs", onClick: onDiscover } : undefined}
    />
  )
}

export function NoEvents({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={Calendar}
      title="No upcoming events"
      description="There are no upcoming events at the moment. Check back later!"
      action={onCreate ? { label: "Create Event", onClick: onCreate } : undefined}
    />
  )
}

export function NoMembers({ onInvite }: { onInvite?: () => void }) {
  return (
    <EmptyState
      icon={Users}
      title="No members yet"
      description="This club doesn't have any members yet. Be the first to join!"
      action={onInvite ? { label: "Invite Members", onClick: onInvite } : undefined}
    />
  )
}

export function NoPosts({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      icon={FileText}
      title="No posts yet"
      description="There are no posts in this club yet. Start the conversation!"
      action={onCreate ? { label: "Create Post", onClick: onCreate } : undefined}
    />
  )
}

export function NoNotifications() {
  return (
    <EmptyState
      icon={Bell}
      title="All caught up!"
      description="You have no new notifications. We'll let you know when something happens."
    />
  )
}

// Error fallback component
export function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error?: Error; 
  resetErrorBoundary?: () => void 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="font-semibold text-lg mb-1">Something went wrong</h3>
      <p className="text-sm text-muted-foreground max-w-sm mb-4">
        {error?.message || "An unexpected error occurred. Please try again."}
      </p>
      {resetErrorBoundary && (
        <Button onClick={resetErrorBoundary} variant="outline">
          Try Again
        </Button>
      )}
    </div>
  )
}

// Skeleton loaders
export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-lg border border-border bg-card/50 p-4 animate-pulse", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4" />
          <div className="h-3 bg-muted rounded w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-muted rounded w-full" />
        <div className="h-3 bg-muted rounded w-5/6" />
      </div>
    </div>
  )
}

export function TableRowSkeleton() {
  return (
    <tr className="animate-pulse">
      <td className="py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-muted" />
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-24" />
            <div className="h-3 bg-muted rounded w-32" />
          </div>
        </div>
      </td>
      <td className="py-4"><div className="h-6 bg-muted rounded w-16" /></td>
      <td className="py-4"><div className="h-4 bg-muted rounded w-12" /></td>
      <td className="py-4"><div className="h-6 bg-muted rounded w-16" /></td>
      <td className="py-4"><div className="h-4 bg-muted rounded w-20" /></td>
    </tr>
  )
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
