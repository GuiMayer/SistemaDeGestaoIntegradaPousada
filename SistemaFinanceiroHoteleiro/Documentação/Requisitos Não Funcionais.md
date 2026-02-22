## 1. Requisitos Não Funcionais (RNF)

- **RNF01 (Persistência):** SQLite para armazenamento local em arquivo único (.db).
    
- **RNF02 (Segurança):** Senha de supervisão armazenada com criptografia (Hash SHA256 ou superior).
    
- **RNF03 (Usabilidade):** Interface simplificada focada em "Entradas vs Saídas", evitando complexidade contábil.
    

---

## 2. Estrutura de Dados

- Cadastros Base (Pessoas e Estrutura)
	- **Empresa** (Id (PK), CNPJ (UK), Razão Social, Nome Fantasia, Responsável (FK), email, telefone, Ativo, CEP, Logradouro, Numero, Complemento, Bairro, Cidade, UF)
	- **Hóspede** (Id (PK), Nome Completo, CPF (UK), RG, Data Nascimento, Telefone, Email, **Empresa_Id (FK)**, Ativo, CEP, Logradouro, Numero, Complemento, Bairro, Cidade, UF)
	- **Quarto** (Id (PK), Numero, Nome Exibição, Qtd Camas Casal, Qtd Camas Solteiro, StatusLimpeza_Id (FK), Ativo, Observações)
	- **StatusLimpeza** (Id (PK), Descricao [Ex: Limpo, Sujo, Em Limpeza, Manutenção], Ativo)
- Operação de Estadia e Consumo
	- **Reserva** (Id (PK), Hospede_Id (FK), Empresa_Id (FK), Quarto_Id (FK), **FormaPagamento_Id (FK)**, Data Check-in, Data Check-out, Valor Diária Combinado, Valor Total Consumo, Valor Total Reserva, StatusReserva_Id (FK), Ativo, Observações
	- **StatusReserva** (Id, Descricao, Ativo)
	- **Reserva_Hospede** (Reserva_Id, Hospede_Id)
	- **Consumo** (Id, ReservaId, Descricao, Valor, Data)
	- **Item** (Id (PK), Descricao, **CategoriaItem_Id (FK)**, ValorVenda, Ativo)
	- **CategoriaItem** (Id (PK), Nome, Descricao, Ativo)
- Financeiro e Caixa
	- **Despesa** (Id, Descricao, Valor, CategoriaDespesa_Id (FK), DataVencimento, DataPagamento, Status)
	- **CategoriaDespesa** (Id (PK), Nome, Ativo)
	- **FormaPagamento** (Id (PK), Descricao, **TaxaPercentual**, Ativo)
	- **MovimentacaoCaixa** (Id (PK), **Tipo_Id (FK)**, Valor, **FormaPagamento_Id (FK)**, DataHora, Observacao)
	- **MovimentacaoTipo** (Id (PK), Descricao, Ativo)
- Sistema e Auditoria (Logs)
	- **LogNivel** (Id [PK], Descricao [Info/Aviso/Critico], Ativo)
	- **LogAcao** (Id [PK], Descricao [Ex: 'Add Despesa'], **LogNivel_Id [FK]**, Ativo)
	- **Log** (Id [PK], DataHora, **LogAcao_Id [FK]**, DescricaoString)