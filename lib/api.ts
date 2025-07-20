import type { Employee, AnalyticsData } from "./types"

const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"]

export async function fetchEmployees(): Promise<Employee[]> {
  try {
    const response = await fetch("https://dummyjson.com/users?limit=20")
    const data = await response.json()

    return data.users.map((user: any) => ({
      ...user,
      company: {
        ...user.company,
        department: departments[Math.floor(Math.random() * departments.length)],
      },
      performanceRating: Math.floor(Math.random() * 5) + 1,
      bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 1} years in ${departments[Math.floor(Math.random() * departments.length)]}.`,
      projects: generateProjects(),
      feedback: generateFeedback(),
    }))
  } catch (error) {
    console.error("Failed to fetch employees:", error)
    return []
  }
}

export async function fetchEmployee(id: string): Promise<Employee | null> {
  try {
    const response = await fetch(`https://dummyjson.com/users/${id}`)
    const user = await response.json()

    return {
      ...user,
      company: {
        ...user.company,
        department: departments[Math.floor(Math.random() * departments.length)],
      },
      performanceRating: Math.floor(Math.random() * 5) + 1,
      bio: `Experienced professional with ${Math.floor(Math.random() * 10) + 1} years in ${departments[Math.floor(Math.random() * departments.length)]}.`,
      projects: generateProjects(),
      feedback: generateFeedback(),
    }
  } catch (error) {
    console.error("Failed to fetch employee:", error)
    return null
  }
}

function generateProjects() {
  const projectNames = ["Website Redesign", "Mobile App", "Database Migration", "API Integration", "Security Audit"]
  const statuses = ["completed", "in-progress", "pending"] as const

  return Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, i) => ({
    id: `project-${i}`,
    name: projectNames[Math.floor(Math.random() * projectNames.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    completion: Math.floor(Math.random() * 100),
  }))
}

function generateFeedback() {
  const reviewers = ["John Smith", "Sarah Johnson", "Mike Davis", "Lisa Wilson"]
  const comments = [
    "Excellent work on the recent project",
    "Shows great leadership skills",
    "Needs improvement in communication",
    "Outstanding performance this quarter",
    "Good team player",
  ]

  return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, i) => ({
    id: `feedback-${i}`,
    date: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    rating: Math.floor(Math.random() * 5) + 1,
    comment: comments[Math.floor(Math.random() * comments.length)],
    reviewer: reviewers[Math.floor(Math.random() * reviewers.length)],
  }))
}

export function generateAnalyticsData(): AnalyticsData {
  return {
    departmentRatings: departments.map((dept) => ({
      department: dept,
      rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    })),
    bookmarkTrends: [
      { month: "Jan", bookmarks: 12 },
      { month: "Feb", bookmarks: 19 },
      { month: "Mar", bookmarks: 15 },
      { month: "Apr", bookmarks: 25 },
      { month: "May", bookmarks: 22 },
      { month: "Jun", bookmarks: 30 },
    ],
    performanceDistribution: [
      { rating: 1, count: 2 },
      { rating: 2, count: 3 },
      { rating: 3, count: 8 },
      { rating: 4, count: 12 },
      { rating: 5, count: 15 },
    ],
  }
}
