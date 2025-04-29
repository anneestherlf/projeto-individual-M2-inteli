# Web Application Document - Projeto Individual - Módulo 2 - Inteli

<!-- **_Os trechos em itálico servem apenas como guia para o preenchimento da seção. Por esse motivo, não devem fazer parte da documentação final._** -->

## Nome do Projeto

<!-- Pensar no nome do projeto -->

#### Autor do projeto

<!-- Lembrar de colocar meu nome, linkedin e github aqui  -->

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)
<!-- 
*Preencha com até 300 palavras – sem necessidade de fonte.*
*Descreva brevemente o sistema que você irá desenvolver.* -->
 A opção escolhida para o desenvolvimento do presente projeto foi um gerenciador de tarefas para organização e produtividade. Com a finalidade de explorar um nicho específico, o tema do projeto será voltado para gestão financeira, destinado especialmente a jovens universitários com dificuldades em controlar seus gastos e que estão pouco familiarizados com termos econômicos complexos.

A necessidade de educação financeira é evidente na população brasileira: 90% admitem precisar de recursos sobre o tema, e 76% afirmam ter metas de planejamento financeiro, segundo a pesquisa Fenaprevi [1]. Entre universitários, existe uma necessidade ainda mais intensa. Um estudo da ANBIMA (2022) revela que apenas 34% dos jovens entre 18 e 24 anos conseguem poupar parte da renda, enquanto 68% não acompanham seus gastos mensais [2]. Além disso, dados do Instituto Brasileiro de Economia (FGV/IBRE) mostram que 61% dos universitários não possuem reserva de emergência, e 47% já se endividaram por falta de planejamento [3].

Diante desses desafios, o objetivo principal é oferecer uma solução simples e intuitiva, que permita gerenciar finanças sem exigir conhecimentos técnicos ou tempo excessivo. Diferentemente das ferramentas atuais – que demandam expertise financeira ou cerca de 20 minutos diários para preenchimento de planilhas –, a proposta é revolucionar a experiência do usuário. Com apenas 5 minutos por dia para registrar compras em um formulário simplificado, o usuário terá acesso a gráficos claros de sua situação financeira, metas de economia e um planner para sonhos de consumo (gerenciador de tarefas).

Ao combinar usabilidade intuitiva com funcionalidades estratégicas, a solução busca empoderar financeiramente jovens universitários, promovendo organização financeira de qualidade independentemente de sua bagagem técnica. Assim, o projeto transforma o controle orçamentário em um hábito acessível e, principalmente, sustentável a longo prazo.


## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

Para garantir que o produto atenda às reais necessidades do público-alvo, foram desenvolvidas proto-personas [4]  baseadas em observações do cotidiano e vivências da autora. Embora não originadas de pesquisas formais (qualitativas/quantitativas), essas personas representam perfis reais identificados no contexto universitário, permitindo a criação de features mais assertivas.

<div align="center">
  <sub>Júlia Oliveira - Proto Persona</sub><br>
  <img src="../assets/wad-assets/julia-oliveira-persona.jpg" width="100%" 
  alt="Júlia Oliveira Persona"><br>
  <sup>Fonte: a autora.</sup>
</div>

<div align="center">
  <sub>Lucas Souza - Proto Persona</sub><br>
  <img src="../assets/wad-assets/lucas-souza-persona.jpg" width="100%" 
  alt="Lucas Souza Persona"><br>
  <sup>Fonte: a autora.</sup>
</div>

Essas personas guiarão o desenvolvimento das funcionalidades, mas poderão ser refinadas ao longo do projeto conforme novas descobertas ou validações com usuários reais.

<!-- *Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.* -->

### 2.2. User Stories (Semana 01)

As User Stories abaixo foram cuidadosamente elaboradas para guiar o desenvolvimento do projeto, seguindo os critérios INVEST (Independent, Negotiable, Valuable, Estimable, Small, Testable) [5].

Identificação | US01
--- | ---
Persona | Lucas Souza
User Story | Como estudante universitário que recebe bolsas acadêmicas, quero um ambiente para inserir todo o valor da minha renda, para que eu possa enxergar visualmente como vou dividir meus gastos de forma a não gerar futuras dívidas.
Critério de aceite 1 | CR1: Campo de inserção de renda. Deve existir um campo claro para inserção do valor total da renda mensal. O campo deve aceitar apenas valores numéricos (com validação para números negativos). Deve exibir um ícone/mensagem de confirmação após inserção válida.
Critério de aceite 2 | CR2: Visualização da distribuição de gastos. O sistema deve exibir um gráfico simples (ex.: pizza ou barras) com a proporção entre renda e gastos totais. Deve permitir visualização por categorias pré-definidas (alimentação, transporte, lazer etc.). O gráfico deve atualizar automaticamente após nova inserção de renda.
Critério de aceite 3 | CR3: Alertas preventivos. O sistema deve destacar visualmente quando os gastos ultrapassarem 80% da renda inserida. Deve sugerir ajustes nas categorias com maior porcentagem de gastos. |
Critérios INVEST | Esta User Story atende plenamente aos critérios INVEST por ser Independente (não requer outras funcionalidades para ter valor), Negociável (os detalhes da visualização podem ser refinados com feedback), e Valorosa (resolve diretamente o problema de planejamento financeiro do Lucas). Além disso, é Estimável (o escopo é delimitado e mensurável), Pequena (foca em uma única capacidade essencial) e Testável (com critérios de aceite claros e verificáveis). Essa combinação garante que a US01 seja viável, relevante e eficaz para o desenvolvimento incremental do produto. 

Identificação | US02
--- | ---
Persona | Júlia Oliveira
User Story | Como estudante com renda limitada que deseja realizar o sonho de comprar uma viagem para a Europa, quero acesso a gráficos e funcionalidades de organização de tarefas para definir ações organizadas e atingir meu objetivo financeiro.
Critério de aceite 1 | CR1: Definição de Meta Financeira. Sistema deve permitir cadastrar o valor total da viagem/meta e prazo desejado. Deve calcular automaticamente a economia mensal necessária. Deve alertar se o valor for incompatível com a renda cadastrada.
Critério de aceite 2 | CR2: Gráficos de Progresso. Deve exibir gráfico de evolução mensal da economia (tipo linha ou barra). Gráfico deve comparar meta X valor acumulado. Deve permitir filtrar por períodos (mensal, trimestral, anual). 
| Critério de aceite 3 | CR3: Planner de Ações. Deve oferecer lista de tarefas vinculadas à meta (ex: "reduzir gastos com delivery"). Deve permitir marcar tarefas como concluídas e mostrar impacto no progresso. Deve sugerir ações baseadas nos gastos cadastrados (ex: "Você gasta R$ X com lazer. Reduzir 20% aceleraria sua meta em Y dias"). |

Identificação | US03
--- | ---
Persona | Júlia Oliveira
User Story | Como uma aluna universitária (com tempo e rotina limitados) que não entende temas complexos de finanças e não consegue ser constante no uso de plataformas padrões de gestão financeira, quero uma ferramenta não-técnica de planejamento financeiro, para que eu possa usufruir de suas funcionalidades sem ter a necessidade de estudar profundamente sobre finanças por fora.
Critério de aceite 1 | CR1: Interface Simplificada. O sistema deve ter um painel principal com no máximo 5 ações primárias visíveis. Todos os termos técnicos devem ter tooltips explicativos com linguagem cotidiana (ex: "Saldo = quanto você tem disponível agora"). Deve usar ícones intuitivos e cores categorizadas (ex: verde para entradas, vermelho para gastos).
Critério de aceite 2 | CR2: Relatório "Para Humanos". Deve gerar resumo semanal com frases simples (ex: "Você gastou R$120 a mais com delivery que na semana passada"). Gráficos devem ter comparações visuais. Deve destacar apenas 1-2 insights relevantes por gráfico.

Identificação | US04
--- | ---
Persona | Lucas Souza
User Story | Como um jovem que gasta compulsivamente com jogos assim que recebe dinheiro, quero entender quanto da minha renda posso direcionar para cada área da minha vida, para garantir que não ficarei sem dinheiro para necessidades básicas no final do mês.
Critério de aceite 1 | CR1: Divisão Automática de Renda. O sistema deve sugerir uma distribuição percentual padrão (ex: 50% necessidades, 30% lazer, 20% poupança). Deve permitir ajuste manual dos percentuais. Deve alertar quando valores forem abaixo do mínimo recomendado para necessidades básicas.
Critério de aceite 2 | CR2: Visualização de Consequências. Deve mostrar projeção do saldo no final do mês baseado nos gastos atuais. Deve comparar com meses anteriores em um gráfico simples.


<!-- *Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.* -->

Essa abordagem assegura que todas as features desenvolvidas entreguem valor real aos usuários finais, mantendo o foco na usabilidade e na solução dos problemas-chave identificados.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

*Posicione aqui os diagramas de modelos relacionais do seu banco de dados, apresentando todos os esquemas de tabelas e suas relações. Utilize texto para complementar suas explicações, se necessário.*

*Posicione também o modelo físico com o Schema do BD (arquivo .sql)*

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---