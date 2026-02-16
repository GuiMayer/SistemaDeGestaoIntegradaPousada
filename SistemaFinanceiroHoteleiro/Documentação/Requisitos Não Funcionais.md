## 1. Requisitos Não Funcionais (RNF)

- **RNF01 (Persistência):** SQLite para armazenamento local em arquivo único (.db).
    
- **RNF02 (Segurança):** Senha de supervisão armazenada com criptografia (Hash SHA256 ou superior).
    
- **RNF03 (Usabilidade):** Interface simplificada focada em "Entradas vs Saídas", evitando complexidade contábil.
    

---

## 2. Estrutura de Dados (Entidades Principais)

- **Empresa / Hospede / Quarto / Reserva**
    
- **Consumo** (Id, ReservaId, Descricao, Valor, Data)
    
- **Despesa** (Id, Descricao, Valor, Categoria, DataVencimento, DataPagamento, Status)
    
- **MovimentacaoCaixa** (Id, Tipo[Entrada/Saída/Sangria], Valor, FormaPagamento, DataHora)
    
- **Log** (Id, DataHora, DescricaoAcao, Usuario)