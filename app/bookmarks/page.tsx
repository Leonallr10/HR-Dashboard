"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { EmployeeCard } from "@/components/employee-card"
import { useBookmarks } from "@/lib/bookmark-context"
import { fetchEmployees } from "@/lib/api"
import type { Employee } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Trash2, Users, Bookmark, TrendingUp, Briefcase } from "lucide-react"

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks()
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadEmployees = async () => {
      setIsLoading(true)
      const data = await fetchEmployees()
      setEmployees(data)
      setIsLoading(false)
    }

    loadEmployees()
  }, [])

  const bookmarkedEmployees = employees.filter((emp) => bookmarks.includes(emp.id.toString()))

  const clearAllBookmarks = () => {
    bookmarks.forEach((id) => removeBookmark(id))
    toast({
      title: "All bookmarks cleared",
      description: "All employees have been removed from bookmarks",
    })
  }

  const handlePromoteAll = () => {
    toast({
      title: "Bulk promotion initiated",
      description: `${bookmarkedEmployees.length} employees marked for promotion review`,
    })
  }

  const handleAssignProject = () => {
    toast({
      title: "Project assignment initiated",
      description: `New project will be assigned to ${bookmarkedEmployees.length} employees`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-80 w-full rounded-2xl" />
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                Bookmarked Employees
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {bookmarkedEmployees.length} employee{bookmarkedEmployees.length !== 1 ? "s" : ""} in your favorites
              </p>
            </div>

            {bookmarkedEmployees.length > 0 && (
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={handleAssignProject}
                  className="bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Assign Project
                </Button>
                <Button
                  onClick={handlePromoteAll}
                  className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Promote All
                </Button>
                <Button
                  variant="destructive"
                  onClick={clearAllBookmarks}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            )}
          </div>
        </div>

        {bookmarkedEmployees.length === 0 ? (
          <Card className="border-0 shadow-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
            <CardContent className="p-16 text-center">
              <div className="mx-auto h-32 w-32 text-gray-300 dark:text-gray-600 mb-8">
                <Bookmark className="h-full w-full" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No bookmarked employees</h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                Start bookmarking employees to keep track of your favorites and access them quickly.
              </p>
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
              >
                <a href="/">
                  <Users className="h-4 w-4 mr-2" />
                  Browse Employees
                </a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bookmarkedEmployees.map((employee, index) => (
              <div key={employee.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <EmployeeCard employee={employee} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
