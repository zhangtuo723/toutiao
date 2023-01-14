import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cc() {
    const na = useNavigate()
    na('login',state)
  return (
    <div>Cc</div>
  )
}
