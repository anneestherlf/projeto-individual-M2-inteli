#
## Sistema de Controle Financeiro para Universitários 
## 👩‍💻 Em desenvolvimento por: [Anne Esther](https://www.linkedin.com/in/anneestherlf/) | [GitHub](https://github.com/anneestherlf)
Projeto Individual Integrado - Módulo 2025-1B


## 🌟 Sobre o Sistema
Sistema de gestão financeira simplificada desenvolvido especialmente para universitários que:
✔️ Possuem renda limitada (bolsas, estágios ou mesada)
✔️ Têm dificuldade em organizar gastos
✔️ Buscam alcançar metas financeiras sem complicações

## 🗂️ Estrutura de Pastas e Arquivos (Arquitetura MVC)

```

projeto-individual-M2-inteli/
│
├── assets/ # Arquivos públicos como imagens e fontes
├── config/ # Arquivos de configuração (ex: conexão com banco)
├── controllers/ # Lógica de controle das requisições
├── documents/ # Documentação adicional do projeto
├── models/ # Definição dos modelos de dados (estrutura do banco)
├── node_modules/ # Dependências do Node.js (gerado automaticamente)
├── public/ # Arquivos públicos acessíveis pelo navegador
├── routes/ # Definição das rotas do sistema
├── scripts/ # Scripts JS públicos ou utilitários
├── services/ # Serviços auxiliares do sistema
├── tests/ # Arquivos de testes unitários
├── views/ # Views da aplicação (EJS ou outro template engine)
│
├── .env # Variáveis de ambiente (NUNCA suba para o GitHub)
├── .gitattributes # Configurações de atributos do Git
├── .gitignore # Arquivo para ignorar arquivos no Git
├── app.js # Arquivo principal alternativo ao server.js
├── jest.config.js # Configuração do Jest para testes
├── package.json # Gerenciador de dependências do Node.js
├── package-lock.json # Lockfile de dependências do Node.js
├── readme.md # Documentação principal do projeto
├── rest.http # Arquivo para testar endpoints HTTP (opcional)
├── server.js # Arquivo principal que inicializa o servidor

```


---

## 💻 Como Executar o Projeto Localmente

Siga os passos abaixo para rodar o projeto na sua máquina local.

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 14 ou superior recomendada)
- Banco de dados PostgreSQL instalado e rodando localmente ou uma conta no [Supabase](https://supabase.com/)
- Git instalado para clonar o repositório

### Passos para executar

1. **Clone o repositório**

``cd seu-repositorio``

``git clone https://github.com/seu-usuario/seu-repositorio.git ``


2. **Instale as dependências**

``npm install``


3. **Configure o banco de dados**

- Se usar PostgreSQL local, crie um banco de dados.
- Execute o script SQL para criar as tabelas:

``psql -U seu_usuario -d seu_banco -f script/init.sql``


- Se usar Supabase, execute o script SQL no editor SQL do painel Supabase.

4. **Configure as variáveis de ambiente**

- Crie (ou edite o arquivo existente) um `.env` na raiz do projeto com as variáveis necessárias, por exemplo:

``PORT=3000``
``DATABASE_URL=postgresql://seu_usuario:sua_senha@localhost:5432/seu_banco``
``SUPABASE_URL=https://xyzcompany.supabase.co``
``SUPABASE_ANON_KEY=seu_anon_key``

5. **Inicie o servidor**

``node server.js``

6. **Acesse a aplicação**

- Abra o navegador e acesse `http://localhost:3000`

---
