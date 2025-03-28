"use client"
import Game from '@/types/game';
import React, { useState, useEffect } from 'react'

interface Mindgame {
    id_mindgame: number;
    mindgame_number: number | string; // Can be number or string from API
    mindgame_status: string;
    id_game: number;
}

const Mindgames = ({ mindgames, stats }: { mindgames: Mindgame[], stats: Game }) => {
    // Initialize state with proper type conversion
    const [mindgameStates, setMindgameStates] = useState<Record<number, string>>(() => {
        const initialState: Record<number, string> = {};
        [1, 2].forEach(num => initialState[num] = 'ongoing');
        mindgames?.forEach(game => {
            const gameNum = Number(game.mindgame_number);
            initialState[gameNum] = game.mindgame_status;
        });
        return initialState;
    });

    // Update states when mindgames prop changes
    useEffect(() => {
        if (mindgames && mindgames.length > 0) {
            setMindgameStates(prev => {
                const newStates = {...prev};
                mindgames.forEach(game => {
                    const gameNum = Number(game.mindgame_number);
                    newStates[gameNum] = game.mindgame_status;
                });
                return newStates;
            });
        }
    }, [mindgames]);

    const updateMindgameStatus = async (gameId: number, mindgameNumber: number, mindgameStatus: string) => {
        try {
            const updateData = {
                type: 'mindgame',
                id_game: gameId,
                mindgame_number: mindgameNumber,
                mindgame_status: mindgameStatus
            };

            const response = await fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (!response.ok) {
                throw new Error('Failed to update mindgame');
            }

            const data = await response.json();
            console.log(`Mindgame ${mindgameNumber} updated:`, data);
        } catch (error) {
            console.error(`Failed to update Mindgame ${mindgameNumber}:`, error);
            // Revert state on error
            setMindgameStates(prev => ({
                ...prev,
                [mindgameNumber]: prev[mindgameNumber]
            }));
            alert(`Failed to update Mindgame ${mindgameNumber}`);
        }
    };

    const handleMindgameChange = (mindgameNumber: number, status: string) => {
        // Optimistically update the UI
        setMindgameStates(prev => ({
            ...prev,
            [mindgameNumber]: status
        }));

        // Find the specific mindgame to get its ID
        const mindgameToUpdate = mindgames.find(m => Number(m.mindgame_number) === mindgameNumber);
        if (mindgameToUpdate) {
            updateMindgameStatus(stats.id_game, mindgameNumber, status);
        } else {
            console.error(`Mindgame ${mindgameNumber} not found`);
        }
    };

    // Render function for each mindgame
    const getMindgameTitle = (mindgameNumber: number) => {
        switch (mindgameNumber) {
            case 1: return "Bateau";
            case 2: return "Sous-marin";
            default: return `Mind Game ${mindgameNumber}`;
        }
    };

    // Update in the renderMindgame function
    const renderMindgame = (mindgameNumber: number) => {
        const currentState = mindgameStates[mindgameNumber] || 'ongoing';
        
        return (
            <div className="border rounded-lg p-4 space-y-4" key={mindgameNumber}>
                <h3 className="text-xl font-bold text-center">{getMindgameTitle(mindgameNumber)}</h3>
                <div className="space-y-3">
                    <select
                        disabled={stats.game_status === 'sucess' || stats.game_status === 'failed'}
                        value={currentState}
                        onChange={(e) => handleMindgameChange(mindgameNumber, e.target.value)}
                        className={`w-full p-2 border rounded-md ${
                            (stats.game_status === 'sucess' || stats.game_status === 'failed')
                                ? 'bg-gray-100 cursor-not-allowed'
                                : 'bg-white'
                        }`}
                    >
                        <option value="ongoing">Ongoing</option>
                        <option value="sucess">Success</option>
                        <option value="failed">Failed</option>
                    </select>
                    <div className={`text-center p-2 rounded-md ${
                        currentState === 'ongoing' ? 'bg-yellow-100 text-yellow-800' :
                        currentState === 'sucess' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                        Current State: {currentState}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4 px-6">Mind Games Status</h2>
            <div className="p-6 grid grid-cols-2 gap-6">
                {[1, 2].map(mindgameNumber => renderMindgame(mindgameNumber))}
            </div>
        </div>
    )
}

export default Mindgames;