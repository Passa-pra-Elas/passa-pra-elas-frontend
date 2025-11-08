<h3># Projeto Passa Pra Elas - Plataforma</h3>

**Integrantes**
|Nome|RM|
|--|--|
|Lucas de Almeida Pires | RM: 562757 |
|Daniel Oliveira de Souza | RM: 566284 |
|João Pedro Raimundo Marcilio | RM: 561603 |
|Lucas Zanella Clemente | RM: 563880 |
|João Pedro Ribeiro Palermo | RM: 562077 |

# 🎨 Projeto Frontend – Passa pra Elas

Este projeto foi desenvolvido pelo Nexus Group como parte da plataforma Passa pra Elas, com o objetivo de criar uma interface web interativa para análise de desempenho das atletas. A aplicação permite que técnicos, olheiros e jogadoras tenham acesso aos dados coletados em campo de maneira visual, prática e intuitiva.

# 🚀 Objetivo

O Frontend tem como função principal consumir os dados disponibilizados pela API (FastAPI + FIWARE) e transformá-los em painéis e visualizações dinâmicas, facilitando a tomada de decisão e a identificação de talentos.

# 🛠️ Tecnologias Utilizadas

React.js – Framework principal para construção da interface

JavaScript (ES6+) – Linguagem base

Axios – Consumo de API

React Router DOM – Navegação entre páginas

TailwindCSS – Estilização moderna e responsiva

FontAwesome & HeroIcons – Ícones

# 📁 Estrutura de Pastas
A estrutura de pastas do projeto segue as melhores práticas do React, separando a lógica da aplicação em componentes reutilizáveis e páginas completas.

src/assets: Contém os arquivos estáticos, como imagens e logos.

src/components: Armazena os componentes reutilizáveis, como o NewsCard, LoginCard e a NavBar.

src/pages: Contém os componentes que representam páginas inteiras do site, como LandingPage e News.

src/posts.json: Arquivo JSON que simula uma API para o conteúdo do feed de notícias.

src/users.json: Arquivo JSON que simula um banco de dados de usuários, incluindo o perfil fake para testes.

src/matches.json: Arquivo JSON que simula um banco de dados de jogos, para as funcionalidades de "Ao Vivo" e "Calendário".

# ✨ Principais Funcionalidades

Login e Logout Simulado: O site possui um sistema de autenticação simples que verifica as credenciais de um perfil fake salvo no users.json e armazena o status de login no localStorage.

Renderização Condicional: O conteúdo do site se adapta dinamicamente com base no status de login e no tipo de usuário. Por exemplo, o botão "Nova publicação" aparece apenas para usuários com o perfil de "jornalista".

Página de Notícias Responsiva: O feed de notícias é totalmente responsivo e utiliza um sistema de filtros para que os usuários possam visualizar posts por categoria.

Página de Jogos: O site exibe um carrossel de jogos "Ao Vivo Agora" e um calendário interativo que permite ao usuário ver os jogos de dias específicos.

# 📦 Instalação

Link do repositório: https://github.com/Passa-pra-Elas/passa-pra-elas-frontend

Clone este repositório e, dentro da pasta do projeto, instale as dependências:

npm install @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @heroicons/react @tailwindcss/vite axios react react-dom react-router-dom tailwindcss


# ▶️ Executando o projeto

No terminal, dentro da pasta do projeto, rode o comando:

npm start

npm run dev

A aplicação será executada em:
👉 http://localhost:3000

# 🌐 Integração com Backend

Este frontend está preparado para consumir dados da API FastAPI do projeto Passa pra Elas.

Certifique-se de que o servidor backend esteja rodando em paralelo antes de iniciar o frontend para melhor funcionamento.

🛑 Encerrando

Para parar o servidor de desenvolvimento, pressione CTRL + C no terminal.
