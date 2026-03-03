"use client"

import React, { useState } from 'react';
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { AppProvider } from "@/lib/app-context"
import { LoginScreen } from "@/components/login-screen"
import { DashboardShell } from "@/components/dashboard-shell"

// Ajustado para o padrão do seu projeto (baseado no seu print)
import UserNav from "@/src/components/UserNav" 

function AppContent() {
  const { isLoggedIn } = useAuth()
  const [showTest, setShowTest] = useState(false)

  if (!isLoggedIn) return <LoginScreen />

  // MODO PLAYGROUND (Sempre envolva no AppProvider para não quebrar estilos globais)
  if (showTest) {
    return (
      <AppProvider>
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-4xl space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.2em]">
                AI Debug Mode
              </span>
              <button 
                onClick={() => setShowTest(false)}
                className="px-4 py-1.5 bg-zinc-800 text-zinc-300 rounded-full text-xs hover:bg-zinc-700 transition-all border border-zinc-700"
              >
                Voltar para o Protótipo
              </button>
            </div>
            
            <div className="p-12 border border-zinc-800 rounded-2xl bg-zinc-900/40 backdrop-blur-md shadow-2xl">
              <UserNav />
            </div>
          </div>
        </div>
      </AppProvider>
    )
  }

  return (
    <AppProvider>
      <main className="min-h-screen bg-background relative">
        {/* Botão flutuante discreto */}
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