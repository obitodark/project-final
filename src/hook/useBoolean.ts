'use client'
import { useState } from 'react'
export const useBoolean = (initialState: boolean = false) => {
  const [state, setStatus] = useState(initialState)

  const isOpen = () => {
    return setStatus(true)
  }
  const isClose = () => {
    return setStatus(false)
  }

  return [isOpen, isClose, state] as const
}
