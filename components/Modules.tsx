"use client"
import Game from '@/types/game';
import React, { useState, useEffect } from 'react'

interface Module {
  id_module: number;
  module_number: number;
  module_status: string;
  id_game: number;
}

const Modules = ({ modules, stats }: { modules: Module[], stats: Game }) => {
  // Initialize state with default values
  const [moduleStates, setModuleStates] = useState<Record<number, string>>(() => {
    const initialState: Record<number, string> = {};
    // Initialize with default values first
    [1, 2, 3, 4].forEach(num => initialState[num] = 'ongoing');
    // Then override with fetched values if available
    modules?.forEach(module => {
      initialState[module.module_number] = module.module_status;
    });
    return initialState;
  });

  // Update states when modules prop changes
  useEffect(() => {
    if (modules && modules.length > 0) {
      setModuleStates(prev => {
        const newStates = {...prev};
        modules.forEach(module => {
          newStates[module.module_number] = module.module_status;
        });
        return newStates;
      });
    }
  }, [modules]);

  const updateModuleStatus = async (gameId: number, moduleNumber: number, moduleStatus: string) => {
    try {
      const updateData = {
        type: 'module',
        id_game: gameId,
        module_number: moduleNumber,
        module_status: moduleStatus
      };

      const response = await fetch(`http://${process.env.NEXT_PUBLIC_IP_ADDRESS}/workshopAPI/api/v1/index.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        throw new Error('Failed to update module');
      }

      const data = await response.json();
      console.log(`Module ${moduleNumber} updated:`, data);
      
      // No need to update state here as we do it optimistically
    } catch (error) {
      console.error(`Failed to update Module ${moduleNumber}:`, error);
      // Revert state on error
      setModuleStates(prev => ({
        ...prev,
        [moduleNumber]: prev[moduleNumber] // revert to previous state
      }));
      alert(`Failed to update Module ${moduleNumber}`);
    }
  };

  const handleModuleChange = (moduleNumber: number, status: string) => {
    // Optimistically update the UI
    setModuleStates(prev => ({
      ...prev,
      [moduleNumber]: status
    }));

    console.log(modules)
    // Find the specific module to get its ID
    const moduleToUpdate = modules.find(m => Number(m.module_number) === moduleNumber);
    console.log(moduleToUpdate)
    if (moduleToUpdate) {
      updateModuleStatus(stats.id_game, moduleNumber, status);
    } else {
      console.error(`Module ${moduleNumber} not found`);
    }
  };

  // Render function for each module
  const getModuleTitle = (moduleNumber: number) => {
      switch (moduleNumber) {
        case 1: return "Téléphone cheminement";
        case 2: return "Retro-proj";
        case 3: return "Minitel";
        case 4: return "Configuration led";
        default: return `Module ${moduleNumber}`;
      }
    };
  
    // Update in the renderModule function
    const renderModule = (moduleNumber: number) => {
      const currentState = moduleStates[moduleNumber] || 'ongoing';
      
      return (
        <div className="border rounded-lg p-4 space-y-4" key={moduleNumber}>
          <h3 className="text-xl font-bold text-center">{getModuleTitle(moduleNumber)}</h3>
          <div className="space-y-3">
            <select
              disabled={stats.game_status === 'sucess' || stats.game_status === 'failed'}
              value={currentState}
              onChange={(e) => handleModuleChange(moduleNumber, e.target.value)}
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
      <h2 className="text-2xl font-bold mb-4 px-6">Modules Status</h2>
      <div className="p-6 grid grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(moduleNumber => renderModule(moduleNumber))}
      </div>
    </div>
  )
}

export default Modules;