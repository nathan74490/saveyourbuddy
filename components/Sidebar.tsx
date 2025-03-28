"use client"

import React, { useEffect, useState } from 'react'
import { GoPlus } from "react-icons/go";
import TeamCheck from './TeamCheck';
import { useStatus } from '@/context/StatusContext';
import Game from '@/types/game';
import Team from '@/types/team';

const Sidebar = () => {
  const { setStatus } = useStatus();
  const [upcomingTeamsData, setUpcomingTeamsData] = useState<Team[]>([]);
  const [onGoingTeamsData, setonGoingTeamsData] = useState<Team[]>([]);
  const [pastTeamTeamsData, setpastTeamTeamsData] = useState<Team[]>([]);

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php?teams`)
      .then(response => response.json())
      .then((teams: Team[]) => {

        const availableTeams = teams.filter(team => team.id_game === null)
        setUpcomingTeamsData(availableTeams);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

useEffect(() => {
  fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php?games`)
    .then(response => response.json())
    .then((games: Game[]) => {
      const ongoingTeams: Team[] = [];
      const pastTeams: Team[] = [];

      games.forEach(game => {
        if (game.game_status === "ongoing" && Array.isArray(game.teams)) {
          ongoingTeams.push(...(game.teams as Team[]));
        }
        if ((game.game_status === "sucess" || game.game_status === "failed") && Array.isArray(game.teams)) {
          pastTeams.push(...(game.teams as Team[]));
        }
      });

      setonGoingTeamsData(ongoingTeams);
      setpastTeamTeamsData(pastTeams);
    })
    .catch(error => console.error('Error fetching games:', error));
}, []);

console.log(onGoingTeamsData)
return (
  <div className='p-4 fixed top-0 left-0 space-y-16 border-r border-gray-200 min-w-[225px] h-full'>
    <button onClick={() => setStatus("addTeam")} className='border-none px-2 py-3 font-medium bg-blue-500 text-white rounded-sm cursor-pointer flex items-center gap-2'>
      <p>Ajouter une equipe</p>
      <GoPlus size={20} />
    </button>
    <TeamCheck data={upcomingTeamsData} statusText={"A venir"} setStatus={setStatus} />
    <TeamCheck data={onGoingTeamsData}   statusText={"Actuelement"} setStatus={setStatus} />
    <TeamCheck data={pastTeamTeamsData}  statusText={"Passées"} setStatus={setStatus} />
  </div>
)
}

export default Sidebar