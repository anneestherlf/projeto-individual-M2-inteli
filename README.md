# Sistema de Controle Financeiro para Universitários 
## 👩‍💻 Em desenvolvimento por: [Anne Esther](https://www.linkedin.com/in/anneestherlf/) | [GitHub](https://github.com/anneestherlf)
Projeto Individual Integrado - Módulo 2025-1B para avaliação no Inteli (Instituto de Tecnologia e Liderança)


##  Sobre o Sistema
A opção escolhida para o desenvolvimento do presente projeto foi um **gerenciador de tarefas para organização e produtividade**. Com a finalidade de explorar um nicho específico, o tema do projeto será voltado para gestão financeira, destinado especialmente a jovens universitários com dificuldades em controlar seus gastos e que estão pouco familiarizados com termos econômicos complexos.

## 🗂️ Estrutura de Pastas e Principais Arquivos (Arquitetura MVC)

```

projeto-individual-M2-inteli/
│
├── assets/ # Arquivos públicos como imagens e fontes
│   └── wad-assets/ # Pasta de arquivos de imagem da documentação (WAD)
│       └── ...
│   └── favicon.ico # Ícone para a guia do navegador
├── config/ # Arquivos de configuração (ex: conexão com banco)
│   └── db.js
├── controllers/ # Lógica de controle das requisições
│   └── ...
├── documents/ # Documentação do projeto
│   └── WAD.md # Web Application Document
├── models/ # Definição dos modelos de dados (estrutura do banco)
│   └── ...
├── node_modules/ # Dependências do Node.js (gerado automaticamente)
│   └── ...
├── public/ # Arquivos públicos acessíveis pelo navegador
│   └── css/ # Estilos
│       └── style.css
├── routes/ # Definição das rotas do sistema
│   └── ...
├── scripts/ # Scripts JS públicos ou utilitários
│   └── init.sql
│   └── runSQLScript.js
├── services/ # Serviços auxiliares do sistema
│   └── ...
├── tests/ # Arquivos de testes unitários
│   └── ...
├── views/ # Views da aplicação (EJS ou outro template engine)
│   └── ...
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
