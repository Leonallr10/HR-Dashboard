export interface Employee {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  phone: string
  address: {
    address: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  company: {
    department: string
    name: string
    title: string
  }
  image: string
  performanceRating: number
  bio?: string
  projects?: Project[]
  feedback?: Feedback[]
}

export interface Project {
  id: string
  name: string
  status: "completed" | "in-progress" | "pending"
  completion: number
}

export interface Feedback {
  id: string
  date: string
  rating: number
  comment: string
  reviewer: string
}

export interface AnalyticsData {
  departmentRatings: { department: string; rating: number }[]
  bookmarkTrends: { month: string; bookmarks: number }[]
  performanceDistribution: { rating: number; count: number }[]
}
