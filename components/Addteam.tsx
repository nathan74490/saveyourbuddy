"use client"

import React, { useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'
import { useStatus } from '@/context/StatusContext';

const Addteam = () => {
  const { setStatus } = useStatus();
  const [teamName, setTeamName] = useState('')
  const [showPlayerForm, setShowPlayerForm] = useState(false)
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [players, setPlayers] = useState<Array<{ firstName: string; lastName: string }>>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const createTeam = async (teamName: string) => {
    const teamData = {
      type: 'team',
      team_name: teamName,
    };

    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(teamData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Received non-JSON response from server");
      }

      const data = await response.json();
      console.log('Team created successfully:', data);
      return data;
    } catch (error) {
      console.error('Error creating team:', error);
      throw error;
    }
  }

  const createUser = async (nom: string, prenom: string, idTeam: string) => {
    const userData = {
      type: 'user',
      nom: nom,
      prenom: prenom,
      id_team: idTeam
    };

    try {
      const response = await fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new TypeError("Received non-JSON response from server");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  const handleTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (teamName.trim()) {
      setShowPlayerForm(true)
    }
  }

  const handlePlayerCountChange = (increment: boolean) => {
    const newCount = increment ? numberOfPlayers + 1 : numberOfPlayers - 1
    if (newCount >= 0 && newCount <= 20) {
      setNumberOfPlayers(newCount)
      if (increment) {
        // Add new player while preserving existing data
        setPlayers([...players, { firstName: '', lastName: '' }])
      } else {
        // Remove last player while preserving others
        setPlayers(players.slice(0, -1))
      }
    }
  }

  const updatePlayer = (index: number, field: 'firstName' | 'lastName', value: string) => {
    const newPlayers = [...players]
    newPlayers[index] = { ...newPlayers[index], [field]: value }
    setPlayers(newPlayers)
  }

  const handleSubmitPlayers = async () => {
    if (players.some(player => !player.firstName.trim() || !player.lastName.trim())) {
      alert('Please fill in all player fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const teamResponse = await createTeam(teamName);
      const teamId = teamResponse.team_id;
      
      const userCreationPromises = players.map(player => 
        createUser(player.firstName, player.lastName, teamId)
      );
      
      await Promise.all(userCreationPromises);
      
      console.log('Team and players created successfully');
      setTeamName('');
      setPlayers([]);
      setNumberOfPlayers(0);
      setShowPlayerForm(false);
      
      // Reload page then set status
      window.location.reload();
      setTimeout(() => {
        setStatus("Actuelement");
      }, 1000);
      
    } catch (error) {
      console.error('Error in submission:', error);
      alert('An error occurred while creating the team and players');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6 max-w-xl">
      {!showPlayerForm ? (
        <form onSubmit={handleTeamSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Creer Une nouvelle equipe</h2>
          <div>
            <input
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Entrer le nom de l'équipe"
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Suivant
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Ajouter joueurs a {teamName}</h2>
          <div className="mb-4">
            <label className="block mb-2">Nombre de joueur:</label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => handlePlayerCountChange(false)}
                className="p-2 border rounded-md hover:bg-gray-100"
                disabled={numberOfPlayers <= 0}
              >
                <FiMinus size={20} />
              </button>
              <span className="text-xl font-semibold w-12 text-center">
                {numberOfPlayers}
              </span>
              <button
                type="button"
                onClick={() => handlePlayerCountChange(true)}
                className="p-2 border rounded-md hover:bg-gray-100"
                disabled={numberOfPlayers >= 20}
              >
                <FiPlus size={20} />
              </button>
            </div>
          </div>

          {players.map((player, index) => (
            <div key={index} className="p-4 border rounded-md space-y-3">
              <h3 className="font-semibold">Joueur {index + 1}</h3>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom"
                  value={player.firstName}
                  onChange={(e) => updatePlayer(index, 'firstName', e.target.value)}
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Prenom"
                  value={player.lastName}
                  onChange={(e) => updatePlayer(index, 'lastName', e.target.value)}
                  className="p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          ))}

          {numberOfPlayers > 0 && (
            <button
              className={`w-full ${isSubmitting ? 'bg-gray-500' : 'bg-green-500'} text-white py-2 rounded-md hover:bg-green-600`}
              onClick={handleSubmitPlayers}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'En cours...' : 'Creer une equipe'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Addteam