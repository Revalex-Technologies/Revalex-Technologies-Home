import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Selenix from './Selenix'

export default function SelenixTree() {

  const { branch } = useParams()

  return <Selenix />
}
