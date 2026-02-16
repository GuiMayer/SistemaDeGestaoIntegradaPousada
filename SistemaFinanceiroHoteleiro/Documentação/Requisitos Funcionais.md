
---
# 📑 Especificação de Requisitos: Sistema de Gestão de Pousada (Local)

## 1. Visão Geral

- **Objetivo:** Centralizar a gestão da pousada, eliminando planilhas manuais e custos de assinaturas externas, focando em reservas e controle financeiro local.
    
- **Stack Tecnológica:** C#, .NET, SQLite.
    

---

## 2. Requisitos Funcionais (RF)

### Módulo de Cadastros e Reservas

|**ID**|**Título**|**Descrição**|**Prioridade**|
|---|---|---|---|
|**RF01**|**Gestão de Empresas e Hóspedes**|Cadastrar empresas e vincular funcionários ou hóspedes avulsos.|Alta|
|**RF02**|**Mapa de Ocupação**|Visualização de disponibilidade, Check-in e Check-out de quartos.|Alta|
|**RF03**|**Lançamento de Consumo**|Registrar itens extras (frigobar, etc.) na conta da reserva.|Média|
|**RF04**|**Gestão de Limpeza**|Controle de status do quarto (Livre, Ocupado, Sujo/Manutenção).|Média|
|**RF05**|**Emissão de Comprovante**|Gerar resumo de estadia e consumos para o hóspede (PDF ou Impressão).|Alta|

### Módulo Financeiro (Gestão de Contas e Lucro)

|**ID**|**Título**|**Descrição**|**Prioridade**|
|---|---|---|---|
|**RF06**|**Gestão de Despesas**|Cadastrar contas a pagar (Luz, Água, Manutenção, etc.) com data e status.|Alta|
|**RF07**|**Dashboard Mensal**|Exibição automática de Faturamento, Total de Despesas e Lucro Líquido do mês.|Alta|
|**RF08**|**Acesso Restrito**|Bloqueio do módulo financeiro através de uma senha mestre.|Alta|
|**RF09**|**Fechamento de Caixa**|Conferência de valores (dinheiro/pix/cartão) e registro de **Sangrias** (retiradas).|Alta|

### Módulo de Auditoria e Utilidades

|**ID**|**Título**|**Descrição**|**Prioridade**|
|---|---|---|---|
|**RF10**|**Log de Atividades**|Registro automático de ações críticas para conferência posterior.|Média|
|**RF11**|**Backup Local**|Função para exportar cópia do banco de dados para segurança.|Alta|

---

## 3. Regras de Negócio (RN)

- **RN01 (Cálculo de Lucro):** O Lucro Líquido é o Faturamento Total (reservas concluídas + consumos) menos as Despesas Pagas.
    
- **RN02 (Organização Mensal):** Contas e faturamentos são agrupados automaticamente por mês/ano.
    
- **RN03 (Segurança Financeira):** Exibição de lucro e dashboard exige a "Senha de Supervisão".
    
- **RN04 (Status de Conta):** Apenas despesas com status "Paga" abatem o lucro no Dashboard.
    
- **RN05 (Imutabilidade do Log):** O registro de atividades (log) é de apenas leitura.
    
- **RN06 (Caixa Cego):** No fechamento de caixa, o funcionário deve informar o valor em mãos sem ver o saldo esperado pelo sistema; divergências devem ser registradas no Log.
    
- **RN07 (Automação de Limpeza):** Ao realizar o Check-out, o status do quarto deve mudar automaticamente para "Sujo".
    
- **RN08 (Histórico de Preços):** Alterações no valor base da diária não afetam reservas já confirmadas ou concluídas.
    

---


    

---

Este documento está agora pronto para ser o "norte" do seu desenvolvimento e uma peça de destaque no seu portfólio.

**Como próximo passo, você quer que eu te ajude a definir a estrutura de pastas do projeto no C# ou prefere que eu desenhe um exemplo de como seria a tabela SQL para criar essas relações?**