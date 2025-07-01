"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import InquiryForm from "./inquiry-form"

interface InquiryFormContextType {
  openInquiryForm: () => void
  closeInquiryForm: () => void
  isInquiryFormOpen: boolean
}

const InquiryFormContext = createContext<InquiryFormContextType | undefined>(undefined)

export function InquiryFormProvider({ children }: { children: ReactNode }) {
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false)

  const openInquiryForm = () => setIsInquiryFormOpen(true)
  const closeInquiryForm = () => setIsInquiryFormOpen(false)

  return (
    <InquiryFormContext.Provider value={{ openInquiryForm, closeInquiryForm, isInquiryFormOpen }}>
      {children}
      <InquiryForm isOpen={isInquiryFormOpen} onClose={closeInquiryForm} />
    </InquiryFormContext.Provider>
  )
}

export function useInquiryForm() {
  const context = useContext(InquiryFormContext)
  if (context === undefined) {
    throw new Error("useInquiryForm must be used within an InquiryFormProvider")
  }
  return context
} 