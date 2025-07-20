"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { EmployeeCard } from "@/components/employee-card"
import { SearchFilters } from "@/components/search-filters"
import { useSearch } from "@/hooks/use-search"
import { fetchEmployees } from "@/lib/api"
import type { Employee } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Filter, Grid, List } from "lucide-react"

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const employeesPerPage = 12

  const {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredEmployees,
  } = useSearch(employees)

  useEffect(() => {
    const loadEmployees = async () => {
      setIsLoading(true)
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

  const availableDepartments = [...new Set(employees.map((emp) => emp.company.department))]

  // Calculate stats
  const totalEmployees = employees.length
  const avgRating =
    employees.length > 0 ? employees.reduce((sum, emp) => sum + emp.performanceRating, 0) / employees.length : 0
  const highPerformers = employees.filter((emp) => emp.performanceRating >= 4).length

  // Pagination
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage)
  const startIndex = (currentPage - 1) * employeesPerPage
  const paginatedEmployees = filteredEmployees.slice(startIndex, startIndex + employeesPerPage)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedDepartments, selectedRatings])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Employee Directory
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comprehensive view of all employees with advanced filtering and search capabilities
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium mb-1">Total Employees</p>
                  <p className="text-3xl font-bold">{totalEmployees}</p>
                </div>
                <Users className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
            <CardContent className="p-6 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium mb-1">Average Rating</p>
                  <p className="text-3xl font-bold">{avgRating.toFixed(1)}/5</p>
                </div>
                <div className="h-10 w-10 bg-blue-400/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
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
                </div>
                <div className="h-10 w-10 bg-emerald-400/30 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedDepartments={selectedDepartments}
              setSelectedDepartments={setSelectedDepartments}
              selectedRatings={selectedRatings}
              setSelectedRatings={setSelectedRatings}
              availableDepartments={availableDepartments}
            />
          </CardContent>
        </Card>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredEmployees.length === totalEmployees ? "All Employees" : "Filtered Results"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredEmployees.length} employee{filteredEmployees.length !== 1 ? "s" : ""} found
              {(searchTerm || selectedDepartments.length > 0 || selectedRatings.length > 0) &&
                " matching your criteria"}
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/50 dark:bg-gray-800/50 rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {totalPages > 1 && (
              <div className="text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 px-3 py-2 rounded-lg">
                Page {currentPage} of {totalPages}
              </div>
            )}
          </div>
        </div>

        {/* Employee Grid/List */}
        {isLoading ? (
          <div
            className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
          >
            {Array.from({ length: employeesPerPage }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className={`w-full rounded-2xl ${viewMode === "grid" ? "h-80" : "h-32"}`} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {paginatedEmployees.length > 0 ? (
              <div
                className={`grid gap-6 mb-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
              >
                {paginatedEmployees.map((employee, index) => (
                  <div key={employee.id} style={{ animationDelay: `${index * 0.05}s` }}>
                    <EmployeeCard employee={employee} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border-0 shadow-lg">
                <CardContent className="p-12 text-center">
                  <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
                    <Filter className="h-full w-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No employees found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Try adjusting your search criteria or filters to find what you're looking for.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedDepartments([])
                      setSelectedRatings([])
                    }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Clear All Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="bg-white/50 dark:bg-gray-800/50"
                >
                  Previous
                </Button>

                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className={
                          currentPage === pageNum
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "bg-white/50 dark:bg-gray-800/50"
                        }
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="bg-white/50 dark:bg-gray-800/50"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
