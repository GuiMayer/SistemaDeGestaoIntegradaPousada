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
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex justify-between items-center px-2">
          <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
            AI Debug Mode
          </span>
          <button 
            onClick={onExit}
            className="px-4 py-1.5 bg-zinc-800 text-zinc-300 rounded-full text-xs hover:bg-zinc-700 transition-all border border-zinc-700 shadow-lg"
          >
            Voltar para o Protótipo
          </button>
        </div>
        
        {/* Área onde o componente "parâmetro" é renderizado */}
        <div className="p-12 border border-zinc-800 rounded-2xl bg-zinc-900/40 backdrop-blur-md shadow-2xl flex items-center justify-center">
          {children}
        </div>
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