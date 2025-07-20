"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchEmployees } from "@/lib/api"
import type { Employee } from "@/lib/types"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  TrendingUp,
  Users,
  Star,
  Bookmark,
  Award,
  Target,
  Activity,
  Calendar,
  Building,
  Zap,
  BookOpen,
  Brain,
} from "lucide-react"

// Import all the comprehensive dummy data
import {
  departmentPerformanceData,
  bookmarkTrendsData,
  performanceDistributionData,
  skillsAnalysisData,
  monthlyPerformanceTrendsData,
  departmentGrowthData,
  teamProductivityData,
  trainingDevelopmentData,
} from "@/lib/analytics-data"

// Enhanced color palette
const COLORS = ["#8b5cf6", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#8b5cf6", "#06b6d4"]

// Custom tooltip components
const CustomTooltip = ({ active, payload, label, formatter }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
        <p className="font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${formatter ? formatter(entry.value) : entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function AnalyticsPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees()
        setEmployees(data)
      } catch (error) {
        console.error("Failed to load employees:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEmployees()
  }, [])

  // Calculate key metrics from dummy data
  const totalEmployees = departmentPerformanceData.reduce((sum, dept) => sum + dept.employeeCount, 0)
  const avgRating = Number(
    (
      departmentPerformanceData.reduce((sum, dept) => sum + dept.averageRating * dept.employeeCount, 0) / totalEmployees
    ).toFixed(1),
  )
  const highPerformers = departmentPerformanceData.reduce((sum, dept) => sum + dept.topPerformers, 0)
  const totalBookmarks = bookmarkTrendsData.reduce((sum, item) => sum + item.bookmarksCreated, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comprehensive insights and performance metrics across your organization
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Last updated: {new Date().toLocaleString()} • {totalEmployees} employees analyzed
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Total Employees</p>
                  <p className="text-3xl font-bold">{totalEmployees}</p>
                  <p className="text-purple-200 text-xs mt-1">Active workforce</p>
                </div>
                <Users className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Average Rating</p>
                  <p className="text-3xl font-bold">{avgRating}</p>
                  <p className="text-blue-200 text-xs mt-1">Out of 5.0</p>
                </div>
                <Star className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm font-medium mb-1">High Performers</p>
                  <p className="text-3xl font-bold">{highPerformers}</p>
                  <p className="text-emerald-200 text-xs mt-1">4+ star rating</p>
                </div>
                <TrendingUp className="h-12 w-12 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium mb-1">Total Bookmarks</p>
                  <p className="text-3xl font-bold">{totalBookmarks}</p>
                  <p className="text-orange-200 text-xs mt-1">Last 12 months</p>
                </div>
                <Bookmark className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabbed Analytics */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Activity className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <Award className="h-4 w-4 mr-2" />
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Trends
            </TabsTrigger>
            <TabsTrigger
              value="development"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-blue-600 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Development
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Department Performance Chart */}
              <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5 text-purple-600" />
                    <span>Department Performance</span>
                  </CardTitle>
                  <CardDescription>Average performance rating by department</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} fontSize={12} />
                        <YAxis domain={[0, 5]} fontSize={12} />
                        <Tooltip content={<CustomTooltip formatter={(value: number) => value.toFixed(1)} />} />
                        <Bar dataKey="averageRating" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Bookmark Trends Chart */}
              <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-600" />
                    <span>Bookmark Trends</span>
                  </CardTitle>
                  <CardDescription>Monthly bookmark activity and user engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={bookmarkTrendsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" fontSize={10} angle={-45} textAnchor="end" height={80} />
                        <YAxis yAxisId="left" fontSize={12} />
                        <YAxis yAxisId="right" orientation="right" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="bookmarksCreated" fill="#06b6d4" name="Bookmarks Created" />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="userEngagement"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="User Engagement %"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Distribution Chart */}
              <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5 text-green-600" />
                    <span>Performance Distribution</span>
                  </CardTitle>
                  <CardDescription>Distribution of employee performance ratings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={performanceDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ rating, count, percentage }) => `${count} (${percentage.toFixed(0)}%)`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {performanceDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Analysis */}
              <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    <span>Skills Analysis</span>
                  </CardTitle>
                  <CardDescription>Current proficiency vs market demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={skillsAnalysisData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="skill" angle={-45} textAnchor="end" height={100} fontSize={11} />
                        <YAxis domain={[0, 100]} fontSize={12} />
                        <Tooltip content={<CustomTooltip formatter={(value: number) => `${value}%`} />} />
                        <Legend />
                        <Bar dataKey="currentProficiency" fill="#10b981" name="Current Proficiency" />
                        <Bar dataKey="marketDemand" fill="#f59e0b" name="Market Demand" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Performance Trends */}
              <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <span>Monthly Performance Trends</span>
                  </CardTitle>
                  <CardDescription>Performance metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyPerformanceTrendsData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="month" fontSize={10} angle={-45} textAnchor="end" height={60} />
                        <YAxis fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="averageRating"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          name="Avg Rating"
                        />
                        <Line
                          type="monotone"
                          dataKey="projectCompletionRate"
                          stroke="#06b6d4"
                          strokeWidth={3}
                          name="Project Completion %"
                        />
                        <Line
                          type="monotone"
                          dataKey="customerSatisfaction"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Customer Satisfaction %"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Department Growth */}
              <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-emerald-600" />
                    <span>Department Growth</span>
                  </CardTitle>
                  <CardDescription>Quarterly revenue comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={departmentGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="department" angle={-45} textAnchor="end" height={100} fontSize={11} />
                        <YAxis fontSize={12} />
                        <Tooltip
                          content={<CustomTooltip formatter={(value: number) => `$${(value / 1000000).toFixed(1)}M`} />}
                        />
                        <Legend />
                        <Bar dataKey="q1Revenue" fill="#94a3b8" name="Q1 Revenue" />
                        <Bar dataKey="q2Revenue" fill="#06b6d4" name="Q2 Revenue" />
                        <Bar dataKey="q3Revenue" fill="#10b981" name="Q3 Revenue" />
                        <Bar dataKey="q4Revenue" fill="#8b5cf6" name="Q4 Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="development" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Team Productivity Radar */}
              <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    <span>Team Productivity</span>
                  </CardTitle>
                  <CardDescription>Multi-dimensional team performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={teamProductivityData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="team" fontSize={11} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                        <Radar
                          name="Productivity"
                          dataKey="productivity"
                          stroke="#8b5cf6"
                          fill="#8b5cf6"
                          fillOpacity={0.3}
                        />
                        <Radar
                          name="Quality"
                          dataKey="qualityScore"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                        <Tooltip />
                        <Legend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Training Programs */}
              <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                    <span>Training Programs</span>
                  </CardTitle>
                  <CardDescription>Training effectiveness and participation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={trainingDevelopmentData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="program" angle={-45} textAnchor="end" height={100} fontSize={11} />
                        <YAxis yAxisId="left" fontSize={12} />
                        <YAxis yAxisId="right" orientation="right" fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Bar yAxisId="left" dataKey="participants" fill="#06b6d4" name="Participants" />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="satisfactionScore"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Satisfaction Score"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Key Insights Summary */}
        <Card className="border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm mt-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-orange-600" />
              <span>Key Performance Insights</span>
            </CardTitle>
            <CardDescription>Strategic insights from comprehensive data analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="text-center">
                  <p className="font-semibold text-emerald-800 dark:text-emerald-200">Top Department</p>
                  <p className="text-2xl font-bold text-emerald-800 dark:text-emerald-200">Product</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">4.4/5.0 rating</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-center">
                  <p className="font-semibold text-blue-800 dark:text-blue-200">High Performers</p>
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {Math.round((highPerformers / totalEmployees) * 100)}%
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">4+ star employees</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="text-center">
                  <p className="font-semibold text-purple-800 dark:text-purple-200">Skills Gap</p>
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">ML Critical</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">33% proficiency gap</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 rounded-xl border border-orange-200 dark:border-orange-800">
                <div className="text-center">
                  <p className="font-semibold text-orange-800 dark:text-orange-200">Revenue Growth</p>
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">+32.6%</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Year over year</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
