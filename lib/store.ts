"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── Types (Seus tipos originais mantidos intactos) ─────────────────
export type RoomStatus = "disponivel" | "ocupado" | "limpeza" | "bloqueado"

export type TimelineDay = {
  date: string
  label: string
  status: RoomStatus
}

export type Room = {
  id: number
  number: string
  type: string
  status: RoomStatus
  guest?: string
  guestCpf?: string
  checkIn?: string
  checkOut?: string
  checkOutTime?: string
  blockReason?: string
  blockEndDate?: string
  blockResponsible?: string
  timeline: TimelineDay[]
}

export type Reservation = {
  id: string
  roomId: number
  roomNumber: string
  guestName: string
  cpf: string
  checkIn: string
  checkOut: string
  status: "confirmada" | "checkin" | "checkout" | "cancelada" | "noshow"
  totalValue: number
  cancelTreatment?: "estorno" | "multa" | "credito"
}

export type GuestProfile = {
  cpf: string; name: string; totalStays: number; avgTicket: number; noShows: number;
}

export type Expense = {
  id: string; description: string; category: string; value: number; dueDate: string; paid: boolean;
}

export type Transaction = {
  id: string; date: string; description: string; value: number; type: "receita" | "despesa" | "estorno"; refId?: string;
}

export type AuditEntry = {
  id: string; date: string; user: string; action: string; reference: string;
}

export type CashClose = {
  id: string; date: string; operator: string; physicalValue: number; expectedValue: number; divergence: number;
}

export type UserRole = "operador" | "supervisor"

export type ExpenseCategory = {
  id: string; label: string;
}

// ─── Helper functions ──────────────────────────────────────────────
function getDateISO(offset: number): string {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  return date.toISOString().split("T")[0]
}

function getDateLabel(offset: number): string {
  const date = new Date()
  date.setDate(date.getDate() + offset)
  const day = date.getDate()
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]
  return `${day} ${months[date.getMonth()]}`
}

function generateTimeline(pattern: RoomStatus[]): TimelineDay[] {
  return pattern.map((status, i) => ({
    date: getDateISO(i),
    label: getDateLabel(i),
    status,
  }))
}

// ─── Mock Data Inicial ──────────────────────────────────────────────
export const initialRooms: Room[] = [
  { id: 1, number: "101", type: "Standard", status: "ocupado", guest: "Carlos Mendes", guestCpf: "123.456.789-00", checkIn: getDateISO(-2), checkOut: getDateISO(0), checkOutTime: "12:00", timeline: generateTimeline(["ocupado", "ocupado", "limpeza", "disponivel", "disponivel", "disponivel", "disponivel"]) },
  { id: 2, number: "102", type: "Standard", status: "disponivel", timeline: generateTimeline(["disponivel", "disponivel", "ocupado", "ocupado", "ocupado", "disponivel", "disponivel"]) },
  { id: 3, number: "103", type: "Luxo", status: "ocupado", guest: "Ana Beatriz Silva", guestCpf: "987.654.321-00", checkIn: getDateISO(-1), checkOut: getDateISO(4), checkOutTime: "12:00", timeline: generateTimeline(["ocupado", "ocupado", "ocupado", "ocupado", "ocupado", "limpeza", "disponivel"]) },
  { id: 5, number: "201", type: "Suite", status: "disponivel", timeline: generateTimeline(["disponivel", "disponivel", "disponivel", "ocupado", "ocupado", "ocupado", "disponivel"]) },
  { id: 6, number: "202", type: "Suite", status: "ocupado", guest: "Roberto Almeida", guestCpf: "111.222.333-44", checkIn: getDateISO(-3), checkOut: getDateISO(1), checkOutTime: "12:00", timeline: generateTimeline(["ocupado", "ocupado", "limpeza", "disponivel", "disponivel", "ocupado", "ocupado"]) },
]

export const initialReservations: Reservation[] = [
  { id: "R001", roomId: 1, roomNumber: "101", guestName: "Carlos Mendes", cpf: "123.456.789-00", checkIn: getDateISO(-2), checkOut: getDateISO(0), status: "checkin", totalValue: 850 },
  { id: "R006", roomId: 5, roomNumber: "201", guestName: "Pedro Santos", cpf: "444.333.222-11", checkIn: getDateISO(3), checkOut: getDateISO(6), status: "confirmada", totalValue: 1200 },
]

// Mantendo outras constantes exportadas caso algum componente já as utilize
export const initialExpenses: Expense[] = []; 
export const initialTransactions: Transaction[] = [];
export const initialAuditLog: AuditEntry[] = [];
export const initialCategories: ExpenseCategory[] = [];
export const initialCashCloses: CashClose[] = [];
export const initialGuests: GuestProfile[] = [];


// ─── 1. A INTERFACE DE REPOSITÓRIO (O nosso "Contrato") ─────────────
const storageService = {
  save: (key: string, data: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pousada_${key}`, JSON.stringify(data));
    }
  },
  load: (key: string) => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`pousada_${key}`);
      return saved ? JSON.parse(saved) : null;
    }
    return null;
  }
};

// ─── 2. O CONTEXTO ──────────────────────────────────────────────────
interface AppContextType {
  rooms: Room[];
  reservations: Reservation[];
  updateRoomStatus: (roomId: number, status: RoomStatus) => void;
  addReservation: (res: Reservation) => void;
  deleteReservation: (resId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// ─── 3. O PROVIDER (O Coração do Sistema) ───────────────────────────
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [reservations, setReservations] = useState<Reservation[]>(initialReservations);
  
  // Flag de segurança para não salvar dados "crus" antes de carregar
  const [isInitialized, setIsInitialized] = useState(false);

  // EFEITO 1: Carregar dados ao montar o componente
  useEffect(() => {
    const savedRooms = storageService.load('rooms');
    const savedRes = storageService.load('reservations');
    
    if (savedRooms && savedRooms.length > 0) setRooms(savedRooms);
    if (savedRes && savedRes.length > 0) setReservations(savedRes);
    
    setIsInitialized(true); // Agora é seguro salvar!
  }, []);

  // EFEITO 2: Persistir dados sempre que houver mudança
  useEffect(() => {
    if (isInitialized) {
      storageService.save('rooms', rooms);
      storageService.save('reservations', reservations);
    }
  }, [rooms, reservations, isInitialized]);

  // ─── AÇÕES DA POUSADA ─────────────────────────────────────────────
  const updateRoomStatus = (roomId: number, status: RoomStatus) => {
    setRooms(prev => prev.map(room => 
      room.id === roomId ? { ...room, status } : room
    ));
  };

  const addReservation = (res: Reservation) => {
    setReservations(prev => [...prev, res]);
    // Logica de Diretor: Ocupa o quarto automaticamente
    updateRoomStatus(res.roomId, "ocupado");
  };

  const deleteReservation = (resId: string) => {
    setReservations(prev => prev.filter(r => r.id !== resId));
  };

  return React.createElement(
    AppContext.Provider,
    { value: { rooms, reservations, updateRoomStatus, addReservation, deleteReservation } },
    children
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp deve ser usado dentro de um AppProvider");
  return context;
};