"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { useBookmarks } from "@/lib/bookmark-context"
import { useToast } from "@/hooks/use-toast"
import { fetchEmployee } from "@/lib/api"
import type { Employee } from "@/lib/types"
import {
  Star,
  Mail,
  Phone,
  MapPin,
  Building,
  Bookmark,
  BookmarkCheck,
  User,
  MessageSquare,
  ArrowLeft,
  Award,
  Clock,
  Target,
  TrendingUp,
  Users,
  Briefcase,
} from "lucide-react"

export default function EmployeeDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarks()
  const { toast } = useToast()

  useEffect(() => {
    const loadEmployee = async () => {
      if (params.id) {
        setIsLoading(true)
        try {
          const data = await fetchEmployee(params.id as string)
          setEmployee(data)
        } catch (error) {
          console.error("Failed to load employee:", error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadEmployee()
  }, [params.id])

  const handleBookmark = () => {
    if (!employee) return

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "in-progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-emerald-600 dark:text-emerald-400"
    if (rating >= 3) return "text-amber-600 dark:text-amber-400"
    return "text-red-600 dark:text-red-400"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            <Skeleton className="h-64 w-full rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Skeleton className="h-96 w-full rounded-2xl lg:col-span-2" />
              <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
              <User className="h-full w-full" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Employee not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">The employee you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/")} className="bg-gradient-to-r from-purple-600 to-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const completedProjects = employee.projects?.filter((p) => p.status === "completed").length || 0
  const totalProjects = employee.projects?.length || 0
  const avgFeedbackRating = employee.feedback?.length
    ? employee.feedback.reduce((sum, f) => sum + f.rating, 0) / employee.feedback.length
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => router.push("/")}
          className="mb-6 hover:bg-white/50 dark:hover:bg-gray-800/50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header Card */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
          <CardContent className="p-8 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Avatar and Basic Info */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-white/20 shadow-2xl">
                    <AvatarImage
                      src={employee.image || "/placeholder.svg"}
                      alt={`${employee.firstName} ${employee.lastName}`}
                    />
                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white text-2xl font-bold">
                      {employee.firstName[0]}
                      {employee.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 h-6 w-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg" />
                </div>

                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {employee.firstName} {employee.lastName}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-3">{employee.company.title}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 font-medium">
                      {employee.company.department}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium">
                      Age {employee.age}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Performance and Actions */}
              <div className="flex-1 lg:text-right space-y-4">
                <div className="flex lg:justify-end items-center space-x-2">
                  {renderStars(employee.performanceRating)}
                  <span className="ml-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {employee.performanceRating}/5
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row lg:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button
                    variant="outline"
                    onClick={handleBookmark}
                    className="bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800"
                  >
                    {isBookmarked(employee.id.toString()) ? (
                      <BookmarkCheck className="h-4 w-4 mr-2 text-purple-600" />
                    ) : (
                      <Bookmark className="h-4 w-4 mr-2" />
                    )}
                    {isBookmarked(employee.id.toString()) ? "Bookmarked" : "Bookmark"}
                  </Button>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Promote
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Mail className="h-5 w-5 text-purple-600" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Phone className="h-5 w-5 text-blue-600" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                <Building className="h-5 w-5 text-green-600" />
                <span>{employee.company.name}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Performance</p>
                  <p className="text-2xl font-bold">{employee.performanceRating}/5</p>
                </div>
                <Award className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Projects</p>
                  <p className="text-2xl font-bold">
                    {completedProjects}/{totalProjects}
                  </p>
                </div>
                <Target className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Feedback</p>
                  <p className="text-2xl font-bold">{avgFeedbackRating.toFixed(1)}/5</p>
                </div>
                <MessageSquare className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Experience</p>
                  <p className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 1}y</p>
                </div>
                <Clock className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <User className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="feedback"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-purple-600" />
                    <span>Personal Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Biography</h4>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{employee.bio}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Address</h4>
                    <div className="space-y-2 text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{employee.address.address}</span>
                      </div>
                      <div className="ml-6">
                        <span>
                          {employee.address.city}, {employee.address.state} {employee.address.postalCode}
                        </span>
                      </div>
                      <div className="ml-6">
                        <span>{employee.address.country}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Overall Rating</span>
                      <span className="text-lg font-bold text-purple-600">{employee.performanceRating}/5</span>
                    </div>
                    <Progress value={employee.performanceRating * 20} className="h-3" />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Project Completion</span>
                      <span className="text-lg font-bold text-blue-600">
                        {totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0}%
                      </span>
                    </div>
                    <Progress
                      value={totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0}
                      className="h-3"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium text-gray-900 dark:text-white">Feedback Score</span>
                      <span className="text-lg font-bold text-green-600">{avgFeedbackRating.toFixed(1)}/5</span>
                    </div>
                    <Progress value={avgFeedbackRating * 20} className="h-3" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects" className="animate-fade-in">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Briefcase className="h-5 w-5 text-purple-600" />
                  <span>Project Portfolio</span>
                </CardTitle>
                <CardDescription>Track ongoing and completed project assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.projects?.map((project) => (
                    <div
                      key={project.id}
                      className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-2">{project.name}</h4>
                        <div className="flex items-center space-x-3">
                          <Badge className={`${getStatusColor(project.status)} font-medium`}>
                            {project.status.replace("-", " ").toUpperCase()}
                          </Badge>
                          {project.status === "in-progress" && (
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                              {project.completion}% complete
                            </span>
                          )}
                        </div>
                      </div>
                      {project.status === "in-progress" && (
                        <div className="w-32">
                          <Progress value={project.completion} className="h-2" />
                        </div>
                      )}
                    </div>
                  )) || (
                    <div className="text-center py-12">
                      <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-lg">No projects assigned yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="animate-fade-in">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span>Performance Feedback</span>
                </CardTitle>
                <CardDescription>Recent feedback and performance reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {employee.feedback?.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white">{feedback.reviewer}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center space-x-1">{renderStars(feedback.rating)}</div>
                              <span className={`text-sm font-medium ${getRatingColor(feedback.rating)}`}>
                                {feedback.rating}/5
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                          {new Date(feedback.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{feedback.comment}</p>
                    </div>
                  )) || (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 dark:text-gray-400 text-lg">No feedback available yet.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
