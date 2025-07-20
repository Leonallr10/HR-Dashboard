"use client"

import { useEffect } from "react"

/**
 *  A tiny component that prevents unhandled-promise rejections
 *  (specifically MetaMask-related ones) from killing React.
 *
 *  The handler is installed only once – on the component’s first mount.
 */
export default function GlobalErrorHandler() {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      const message = String(event.reason ?? "")
      const isMetaMaskError = message.includes("MetaMask") || message.includes("Failed to connect")

      if (isMetaMaskError) {
        // Prevent the “red screen” in Next.js / React
        event.preventDefault()
        // Still log it so developers see it in the console.
        console.warn("[ignored-metamask-error]", message)
      }
    }

    window.addEventListener("unhandledrejection", handler)
    return () => window.removeEventListener("unhandledrejection", handler)
  }, [])

  return null
}
