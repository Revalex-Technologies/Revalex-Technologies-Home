import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Syra from './Syra'

export default function SyraTree() {

  const { branch } = useParams()

  return <Syra />
}
