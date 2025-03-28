import Game from '@/types/game'
import User from '@/types/user'
import React, { useState, useEffect } from 'react'

// Le composant Stats qui affiche les informations sur la partie et gère le timer
const Stats = ({players, stats}: {players: User[], stats: Game}) => {
  const [timeLeft, setTimeLeft] = useState('40:00');

  useEffect(() => {
    if (!stats.game_time) return;

    const startTime = new Date(stats.game_time).getTime();
    const thirtyMinutes = 40 * 60 * 1000; // 30 minutes in milliseconds

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const elapsed = now - startTime;
      const remaining = thirtyMinutes - elapsed;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft('00:00');
        return;
      }

      const minutes = Math.floor(remaining / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
      setTimeLeft(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, [stats.game_time]);

  return (
    <div className="p-6">
      <div className="flex gap-6">
        {/* Players List Section */}
        <div className="w-1/4  rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Players</h2>
          <div className="space-y-3">
            {players.map((player, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-md flex items-center justify-between">
                <span className="font-medium">{player.nom} {player.prenom}</span>
                <span className="text-sm text-green-600">Active</span>
              </div>
            ))}
          </div>
        </div>

        {/* Game Stats Table Section */}
        <div className="flex-1  rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Game Statistics</h2>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Game ID</th>
                <th className="px-4 py-2 text-left">Start Time</th>
                <th className="px-4 py-2 text-left">Final Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-lg">{stats.id_game}</td>
                <td className="px-4 py-3 text-lg">{new Date(stats.game_time).toLocaleTimeString()}</td>
                <td className="px-4 py-3 text-lg">
                  {stats.FinalTime === null ? '--:--' : stats.FinalTime}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Timer Section */}
        {stats.game_status !== 'sucess' && stats.game_status !== 'failed' && (
          <div className="w-1/4 rounded-lg p-6">
            <div className="flex flex-col items-center space-y-4">
              <h2 className="text-xl font-bold">Timer</h2>
              <div className="text-5xl font-mono bg-gray-800 text-white px-6 py-3 rounded-lg">
                {timeLeft}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
