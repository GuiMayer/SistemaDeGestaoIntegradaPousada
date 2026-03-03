"use client"

import React, { useState } from 'react';
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { AppProvider } from "@/lib/app-context"
import { LoginScreen } from "@/components/login-screen"
import { DashboardShell } from "@/components/dashboard-shell"

// Importação correta do componente de teste
import UserNav from "@/src/components/UserNav" 

function PlaygroundView({ children, onExit }: { children: React.ReactNode, onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-2">
          <span className="bg-indigo-600 text-white text-[10px] px-2 py-1 rounded-md font-bold">
            MODO PLAYGROUND
          </span>
          <span className="text-xs text-muted-foreground font-mono">
            Componente: UserNav
          </span>
        </div>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onExit}
          className="h-8"
        >
          Sair do Teste
        </Button>
      </div>
      
      <div className="flex-1 overflow-auto p-8 bg-zinc-100 dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto bg-background rounded-xl shadow-2xl border overflow-hidden">
          {children}
        </div>
        <div className="mt-8 max-w-5xl mx-auto">
          <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">
            Fim do Preview
          </p>
        </div>
      </div>
    </div>
  )
}

// Importação local do Button para o PlaygroundView não quebrar
import { Button } from "@/components/ui/button"

function AppContent() {
  const { isLoggedIn } = useAuth()
  const [showTest, setShowTest] = useState(false)

  if (!isLoggedIn) return <LoginScreen />

  if (showTest) {
    return (
      <AppProvider>
        <PlaygroundView onExit={() => setShowTest(false)}>
          <UserNav /> 
        </PlaygroundView>
      </AppProvider>
    )
  }

  return (
    <AppProvider>
      <main className="min-h-screen bg-background relative">
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