"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useBookmarks } from "@/lib/bookmark-context"
import { useToast } from "@/hooks/use-toast"
import type { Employee } from "@/lib/types"
import { Star, Bookmark, Eye, TrendingUp, BookmarkCheck, Mail, MapPin } from "lucide-react"

interface EmployeeCardProps {
  employee: Employee
}

export function EmployeeCard({ employee }: EmployeeCardProps) {
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const { toast } = useToast()
  const [isPromoting, setIsPromoting] = useState(false)

  const handleBookmark = () => {
    if (isBookmarked(employee.id.toString())) {
      removeBookmark(employee.id.toString())
      toast({
        title: "Bookmark removed",
        description: `${employee.firstName} ${employee.lastName} removed from bookmarks`,
      })
    } else {
      addBookmark(employee.id.toString())
      toast({
        title: "Bookmark added",
        description: `${employee.firstName} ${employee.lastName} added to bookmarks`,
      })
    }
  }

  const handlePromote = async () => {
    setIsPromoting(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsPromoting(false)
    toast({
      title: "Promotion initiated",
      description: `${employee.firstName} ${employee.lastName} has been marked for promotion review`,
    })
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-3.5 w-3.5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
    if (rating >= 3) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
    return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
  }

  return (
    <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardContent className="p-6 relative">
        {/* Header with Avatar and Bookmark */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-white/20 shadow-lg">
                <AvatarImage
                  src={employee.image || "/placeholder.svg"}
                  alt={`${employee.firstName} ${employee.lastName}`}
                />
                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-semibold">
                  {employee.firstName[0]}
                  {employee.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                {employee.firstName} {employee.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{employee.company.title}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className="shrink-0 h-8 w-8 p-0 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            {isBookmarked(employee.id.toString()) ? (
              <BookmarkCheck className="h-4 w-4 text-purple-600" />
            ) : (
              <Bookmark className="h-4 w-4 text-gray-400 hover:text-purple-600" />
            )}
          </Button>
        </div>

        {/* Department and Rating */}
        <div className="flex items-center justify-between mb-4">
          <Badge
            variant="secondary"
            className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-medium"
          >
            {employee.company.department}
          </Badge>
          <Badge className={`${getRatingColor(employee.performanceRating)} font-medium`}>
            {employee.performanceRating}/5
          </Badge>
        </div>

        {/* Performance Stars */}
        <div className="flex items-center space-x-1 mb-4">
          {renderStars(employee.performanceRating)}
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">Performance</span>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
            <Mail className="h-3 w-3" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
            <MapPin className="h-3 w-3" />
            <span>
              Age {employee.age} • {employee.address.city}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link href={`/employee/${employee.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full group-hover:border-purple-300 transition-colors bg-transparent"
            >
              <Eye className="h-3.5 w-3.5 mr-2" />
              View Profile
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={handlePromote}
            disabled={isPromoting}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
          >
            <TrendingUp className="h-3.5 w-3.5 mr-2" />
            {isPromoting ? "..." : "Promote"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
