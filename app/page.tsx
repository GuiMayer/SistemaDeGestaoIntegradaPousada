"use client"

import React, { useState } from 'react';
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { AppProvider } from "@/lib/app-context"
import { LoginScreen } from "@/components/login-screen"
import { DashboardShell } from "@/components/dashboard-shell"

// 1. IMPORTAÇÃO DOS COMPONENTES PARA TESTE
// Sempre que criar um componente novo com a IA, importe-o aqui.
import UserNav from "@/src/components/UserNav" 

// --- COMPONENTE DE PREVIEW (O "WRAPPER") ---
// Este componente isola a visualização e serve como a moldura do teste.
function PlaygroundView({ children, onExit }: { children: React.ReactNode, onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-background"> {/* "fixed inset-0" faz ocupar a tela toda */}
      <div className="absolute top-4 right-4 z-[10000] flex gap-2">
        <span className="bg-zinc-800 text-zinc-400 text-[10px] px-2 py-1 rounded-md font-mono flex items-center">
          PREVIEW MODE
        </span>
        <button 
          onClick={onExit}
          className="px-4 py-1 bg-red-600 text-white rounded-md text-xs font-bold hover:bg-red-700 shadow-lg"
        >
          Sair do Teste
        </button>
      </div>
      
      {/* O componente agora ocupa 100% do espaço disponível */}
      <div className="w-full h-full overflow-auto">
        {children}
      </div>
    </div>
  )
}

function AppContent() {
  const { isLoggedIn } = useAuth()
  const [showTest, setShowTest] = useState(false)

  if (!isLoggedIn) return <LoginScreen />

  // MODO PLAYGROUND
  if (showTest) {
    return (
      <AppProvider>
        {/* 🚀 PARA TESTAR OUTRO COMPONENTE: 
            Basta trocar o <UserNav /> pelo nome do seu novo componente abaixo. */}
        <PlaygroundView onExit={() => setShowTest(false)}>
          <UserNav /> 
        </PlaygroundView>
      </AppProvider>
    )
  }

  return (
    <AppProvider>
      <main className="min-h-screen bg-background relative">
        {/* Botão flutuante para ativar o modo de teste */}
        <button 
          onClick={() => setShowTest(true)}
          className="fixed bottom-6 right-6 z-[100] px-4 py-2 bg-indigo-600 text-white rounded-full text-xs font-bold shadow-xl hover:bg-indigo-500 hover:scale-105 transition-all"
        >
          🚀 TESTAR COMPONENTE
        </button>

        <DashboardShell />
      </main>
    </AppProvider>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}