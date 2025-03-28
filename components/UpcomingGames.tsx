"use client"
import React, { useEffect, useState } from 'react'
import { useStatus } from '@/context/StatusContext'
import Team from '@/types/team'

const UpcomingGames = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [teamData, setTeamData] = useState<Team[]>([])
  const { selectedTeam, setStatus } = useStatus()

  

  const createGame = async (gameStatus: string) => {
    const gameData = {
      type: 'game',
      game_status: gameStatus
    };

    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(gameData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Game created:', data);
      return data;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  }

  const updateTeamIdGame = async (teamId: number, gameId: number) => {
    const updateData = {
      type: 'team',
      id_team: teamId,
      id_game: gameId
    };

    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update team game ID');
      }

      const data = await response.json();
      console.log('Team game ID updated:', data);
      return data;
    } catch (error) {
      console.error('Error updating team game ID:', error);
      throw error;
    }
  }

  const handleLaunchGame = async () => {
    setIsCreating(true);
    try {
      const gameResponse = await createGame('ongoing');
      console.log('Game created with ID:', gameResponse.game_id);

      if (gameResponse && gameResponse.game_id && teamData[0]) {
        await updateTeamIdGame(teamData[0].id_team, gameResponse.game_id);
        setStatus("Actuelement");
        window.location.reload();
      }
    } catch (error) {
      console.error('Failed to launch game:', error);
    } finally {
      setIsCreating(false);
    }
  }

  useEffect(() => {

    if (selectedTeam) {
      setTeamData(selectedTeam)
      console.log(selectedTeam)
    }

  }, [selectedTeam])

  console.log(teamData)
  return (
    <div className="p-6 max-w-xl">


      {!teamData[0] ? (
        <div className="">
          <p className="text-gray-600 text-lg">Please select a team to continue</p>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Upcoming Games</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Joueurs Attendu</h3>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                {teamData[0]?.users?.length || 0}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              {teamData[0]?.users.map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{user.prenom} {user.nom}</span>
                    <span className="text-gray-500">Equipe {teamData[0].team_name}</span>
                  </div>
                  <span className="text-sm text-gray-500">Available</span>
                </div>
              ))}
            </div>

            <button
              className={`w-full ${isCreating ? 'bg-gray-500' : 'bg-green-500'} text-white py-3 cursor-pointer rounded-md hover:bg-green-600 transition-colors`}
              onClick={handleLaunchGame}
              disabled={isCreating}
            >
              {isCreating ? 'Lancement...' : 'Lancer la partie'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default UpcomingGames