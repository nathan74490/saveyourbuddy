"use client"

import Team from '@/types/team';
import React, { createContext, useContext, useState, ReactNode } from 'react';

type StatusContextType = {
  status: string;
  setStatus: (status: string) => void;
  selectedTeam: Team[] | null;
  setSelectedTeam: (team: Team[] | null) => void;
};

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState("A venir");
  const [selectedTeam, setSelectedTeam] = useState<Team[] | null>(null);

  return (
    <StatusContext.Provider value={{ status, setStatus, selectedTeam, setSelectedTeam }}>
      {children}
    </StatusContext.Provider>
  );
}

export function useStatus() {
  const context = useContext(StatusContext);
  if (context === undefined) {
    throw new Error('useStatus must be used within a StatusProvider');
  }
  return context;
}