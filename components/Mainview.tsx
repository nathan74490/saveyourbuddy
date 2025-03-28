
"use client"

import React from 'react'
import OngoingGames from './OngoingGames'
import UpcomingGames from './UpcomingGames'
import PastGames from './PastGames'
import { useStatus } from '@/context/StatusContext'
import Addteam from './Addteam'

const Mainview = () => {
    const { status } = useStatus();

  return (
    <div className='p-4  h-screen ml-[225px]'>
        {status === "addTeam" ? (
          <Addteam />
        ) : status === "A venir" ? (
          <UpcomingGames />
        ) : status === "Actuelement" ? (
          <OngoingGames />
        ) : status === "Passées" ? (
          <PastGames />
        ) : (
          <UpcomingGames />
        )}
    </div>
  )
}

export default Mainview