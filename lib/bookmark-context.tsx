"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

interface BookmarkContextType {
  bookmarks: string[]
  addBookmark: (id: string) => void
  removeBookmark: (id: string) => void
  isBookmarked: (id: string) => boolean
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<string[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("hr-bookmarks")
    if (stored) {
      setBookmarks(JSON.parse(stored))
    }
  }, [])

  const addBookmark = (id: string) => {
    const newBookmarks = [...bookmarks, id]
    setBookmarks(newBookmarks)
    localStorage.setItem("hr-bookmarks", JSON.stringify(newBookmarks))
  }

  const removeBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter((b) => b !== id)
    setBookmarks(newBookmarks)
    localStorage.setItem("hr-bookmarks", JSON.stringify(newBookmarks))
  }

  const isBookmarked = (id: string) => bookmarks.includes(id)

  return (
    <BookmarkContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarkProvider")
  }
  return context
}
