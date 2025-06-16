# Plataforma de Controle Financeiro para Universitários 

<img src="assets\wad-assets\Capa - repo.png" width="100%" >

## 👩‍💻 Por [Anne Esther](https://www.linkedin.com/in/anneestherlf/)
Projeto Individual Integrado - Módulo 2025-1B para avaliação no Inteli (Instituto de Tecnologia e Liderança)


##  Sobre o Sistema
A opção escolhida para o desenvolvimento do presente projeto foi um **gerenciador de tarefas para organização e produtividade**. Com a finalidade de explorar um nicho específico, o tema do projeto será voltado para gestão financeira, destinado especialmente a jovens universitários com dificuldades em controlar seus gastos e que estão pouco familiarizados com termos econômicos complexos.

## Estrutura de Pastas e Principais Arquivos (Arquitetura MVC)

```

projeto-individual-M2-inteli/
│
├── 📁 assets/                    # Recursos gráficos e estáticos do projeto
│   ├── 📁 wad-assets/           # Imagens usadas na documentação WAD
│   └── 📄 favicon.ico           # Ícone da aplicação para o navegador
│
├── 📁 config/                    # Configurações do sistema
│   └── 📄 db.js                 # Configuração de conexão com o banco de dados
│
├── 📁 controllers/               # Controladores MVC
│   ├── 📄 userController.js     # Gerencia operações de usuário
│   ├── 📄 earningsController.js # Gerencia operações de ganhos
│   ├── 📄 expensesController.js # Gerencia operações de despesas
│   ├── 📄 goalsController.js    # Gerencia operações de metas
│   └── 📄 to_do_list_itemController.js # Gerencia operações de tarefas
│
├── 📁 documents/                 # Documentação do projeto
│   └── 📄 WAD.md                # Web Application Document detalhado
│
├── 📁 models/                    # Modelos de dados (camada de acesso ao banco)
│   ├── 📄 userModel.js          # Modelo para tabela de usuários
│   ├── 📄 earningsModel.js      # Modelo para tabela de ganhos
│   ├── 📄 expensesModel.js      # Modelo para tabela de despesas
│   ├── 📄 goalsModel.js         # Modelo para tabela de metas
│   └── 📄 to_do_list_itemModel.js # Modelo para tabela de tarefas
│
├── 📁 public/                    # Arquivos acessíveis diretamente pelo navegador
│   ├── 📁 css/                  # Folhas de estilo CSS
│   │   └── 📄 style.css         # Estilos principais da aplicação
│   └── 📁 js/                   # Scripts JavaScript do cliente
│
├── 📁 routes/                    # Definição das rotas da aplicação
│   ├── 📄 frontRoutes.js        # Rotas para renderização de páginas
│   ├── 📄 userRoutes.js         # Rotas de API para usuários
│   ├── 📄 earningsRoutes.js     # Rotas de API para ganhos
│   ├── 📄 expensesRoutes.js     # Rotas de API para despesas
│   ├── 📄 goalsRoutes.js        # Rotas de API para metas
│   └── 📄 to_do_list_itemRoutes.js # Rotas de API para tarefas
│
├── 📁 scripts/                   # Scripts de banco de dados e utilitários
│   ├── 📄 init.sql              # Script SQL inicial para criar tabelas
│   └── 📄 runSQLScript.js       # Script para executar comandos SQL
│
├── 📁 services/                  # Camada de serviços (lógica de negócios)
│   ├── 📄 userService.js        # Serviços relacionados a usuários
│   ├── 📄 earningsService.js    # Serviços relacionados a ganhos
│   ├── 📄 expensesService.js    # Serviços relacionados a despesas
│   ├── 📄 goalsService.js       # Serviços relacionados a metas
│   └── 📄 to_do_list_itemService.js # Serviços relacionados a tarefas
│
├── 📁 tests/                     # Testes automatizados
│   ├── 📄 user.test.js          # Testes para operações de usuário
│   └── 📄 earnings.test.js      # Testes para operações de ganhos
│
├── 📁 views/                     # Templates de visualização (EJS)
│   ├── 📁 pages/                # Páginas completas da aplicação
│   │   ├── 📄 dashboard.ejs     # Página inicial (resumo)
│   │   ├── 📄 earnings.ejs      # Página de gerenciamento de ganhos
│   │   ├── 📄 expenses.ejs      # Página de gerenciamento de despesas
│   │   ├── 📄 goals.ejs         # Página de gerenciamento de metas
│   │   ├── 📄 login.ejs         # Página de login
│   │   ├── 📄 profile.ejs       # Página de perfil do usuário
│   │   ├── 📄 register.ejs      # Página de registro de usuário
│   │   └── 📄 to_do_list_items.ejs # Página de gerenciamento de tarefas
│   │
│   └── 📁 partials/             # Componentes reutilizáveis
│       ├── 📄 header.ejs        # Cabeçalho com navegação
│       └── 📄 footer.ejs        # Rodapé da página
│
├── 📄 .env                      # Variáveis de ambiente (não versionado)
├── 📄 .gitattributes            # Configurações de atributos do Git
├── 📄 .gitignore                # Lista de arquivos ignorados pelo Git
├── 📄 app.js                    # Configuração da aplicação Express
├── 📄 jest.config.js            # Configuração do framework de testes Jest
├── 📄 package.json              # Dependências e scripts do projeto
├── 📄 package-lock.json         # Versões exatas das dependências
├── 📄 README.md                 # Documentação principal do projeto
├── 📄 rest.http                 # Arquivo para testar endpoints HTTP via extensão REST Client
└── 📄 server.js                 # Ponto de entrada principal da aplicação

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

## 🎬 Vídeo demonstração

<iframe width="100%" height="400" src="https://www.youtube.com/embed/VGgSOIX9ihA" title="Vídeo demonstração" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<img src="assets\wad-assets\Capa - repo (1).png" width="100%" >