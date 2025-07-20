"use client"

import { useState, useMemo } from "react"
import type { Employee } from "@/lib/types"

export function useSearch(employees: Employee[]) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        searchTerm === "" ||
        employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.company.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDepartment =
        selectedDepartments.length === 0 || selectedDepartments.includes(employee.company.department)

      const matchesRating = selectedRatings.length === 0 || selectedRatings.includes(employee.performanceRating)

      return matchesSearch && matchesDepartment && matchesRating
    })
  }, [employees, searchTerm, selectedDepartments, selectedRatings])

  return {
    searchTerm,
    setSearchTerm,
    selectedDepartments,
    setSelectedDepartments,
    selectedRatings,
    setSelectedRatings,
    filteredEmployees,
  }
}
