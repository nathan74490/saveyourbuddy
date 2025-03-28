"use client"

import React, { useEffect, useState } from 'react'
import Stats from './Stats'
import Mindgames from './Mindgames'
import Modules from './Modules'
import Game from '@/types/game'
import { useStatus } from '@/context/StatusContext'
import Team from '@/types/team'


const OngoingGames = () => {
    const [gameData, setGameData] = useState<Game | null>(null)
    const [teamData, setTeamData] = useState<Team[] | null>(null)
    const { selectedTeam } = useStatus()

    useEffect(() => {

        if (selectedTeam) {
          setTeamData(selectedTeam)
    
        }
    
      }, [selectedTeam])

    useEffect(() => {
        if (teamData?.[0]?.id_game) {
            fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php?game=${teamData[0].id_game}`)
                .then((response) => response.json())
                .then((game) => {
                    setGameData(game);
                })
                .catch(error => console.error('Error fetching game data:', error));
        }
    }, [teamData]);

    if (!teamData?.[0]?.id_game) {
        return <div className="p-6 text-center text-gray-600 text-lg">Please select a team to view game details</div>
    }

    if (!gameData) {
        return <div className="p-6 text-center">Loading game data...</div>
    }
    return (
        <div className='space-y-5'>
            <Stats players={teamData?.[0]?.users || []} stats={gameData} />
            <hr />
            <Mindgames stats={gameData}  mindgames={gameData.mindgames} />
            <hr />
            <Modules stats={gameData} modules={gameData.modules} />
        </div>
    )
}

export default OngoingGames