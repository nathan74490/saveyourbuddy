
import React from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import Team from '@/types/team';
import { useStatus } from '@/context/StatusContext';


interface TeamCheckProps {
  data: Team[];
  statusText: string;
  setStatus: (status: string) => void;
}

const TeamCheck = ({ data, statusText, setStatus }: TeamCheckProps) => {

  const { setSelectedTeam } = useStatus();

  const handleDisplayTeam = (team: Team[],
  ) => {
    console.log(team);
    setStatus(statusText);
    setSelectedTeam(team); 

  }

  const deleteTeam = async (teamId: number) => {
    try {
      const url = `http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php?team=${teamId}`;

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete team');
      }

      const data = await response.json();
      console.log(data);

      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('Failed to delete team');
    }
  };

  return (
    <div className='rounded-lg  space-y-3 w-fit'>
      <h3 className='text-lg font-semibold text-gray-800'>{statusText}</h3>
      <ul className='list-none space-y-2'>

        {Array.isArray(data) && data.map((team, index) => (
          <li key={index} className='flex items-center gap-3'>
            <button onClick={() => handleDisplayTeam([team])} className='text-gray-600 cursor-pointer px-4 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 border border-gray-200'>
              Equipe {team.team_name}
            </button>
            <FaRegTrashAlt onClick={() => deleteTeam(team.id_team)} size={20} className='text-red-500 cursor-pointer' />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TeamCheck