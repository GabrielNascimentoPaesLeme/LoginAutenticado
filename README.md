# Sistema de Autenticação e Autorização com Node.js, Express e React

Este projeto é uma aplicação full-stack de autenticação e autorização que utiliza Node.js e Express no back-end, com um front-end em React e React Router. Ele permite a criação e autenticação de usuários, geração de tokens JWT, e inclui uma implementação de refresh token. O front-end conecta-se ao back-end para gerenciar o fluxo de login, registro e autorização.

## 📑 Índice
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso](#uso)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Endpoints da API](#endpoints-da-api)
- [Contribuição](#contribuição)
- [Licença](#licença)

## ⚙️ Pré-requisitos
- Node.js (v16+)
- MongoDB ou uma conta no MongoDB Atlas
- Um editor de código, como o VSCode
- Gerenciador de pacotes npm ou yarn

## 🚀 Instalação
Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

Instale as dependências no back-end e no front-end:

```bash
# Back-end
cd backend
npm install

# Front-end
cd ../frontend
npm install
```

Configure as variáveis de ambiente criando um arquivo `.env` no diretório raiz do back-end.

## 🔧 Configuração
Crie o arquivo `.env` no diretório `backend` e insira as variáveis de ambiente necessárias:

```plaintext
# Backend
PORT=3000
DATABASE_URL=mongodb://localhost:27017/seu-banco
JWT_SECRET=suaChaveSecreta
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=suaChaveRefreshSecreta
JWT_REFRESH_EXPIRES_IN=7d
```

Certifique-se de substituir `suaChaveSecreta` e `suaChaveRefreshSecreta` por chaves seguras.

## 🗂 Estrutura do Projeto
O projeto é dividido em duas partes principais:

### Backend (`backend/`)
- `server.js`: Arquivo principal do servidor Express, configura rotas e middlewares.
- `database.js`: Conecta-se ao banco MongoDB.
- `controllers/`: Contém a lógica das rotas de autenticação, registro e geração de tokens.
- `.env`: Armazena as variáveis de ambiente.

### Frontend (`frontend/`)
- `App.jsx`: Arquivo principal do React.
- `context/`: Configura o contexto de autenticação do usuário.
- `routes/`: Inclui as páginas de login, registro e home protegida.
- `components/`: Componentes reutilizáveis.
- `services/api.js`: Configuração do Axios para chamadas de API.

## 💻 Uso
### Iniciar o Back-end
No diretório `backend`, inicie o servidor com:

```bash
npm start
```

O servidor deve rodar em `http://localhost:3000`.

### Iniciar o Front-end
No diretório `frontend`, inicie o front-end com:

```bash
npm run dev
```

O front-end estará acessível em `http://localhost:5173`.

## 🛠 Tecnologias Utilizadas
### Backend
- Node.js e Express: Para configurar o servidor e rotas da API.
- Mongoose: ORM para MongoDB, facilitando a manipulação de dados.
- JWT: Autenticação segura com tokens.
- bcrypt: Para hash e comparação de senhas.
- dotenv: Carregamento de variáveis de ambiente.

### Frontend
- React: Biblioteca de componentes.
- React Router: Gerenciamento de rotas e navegação protegida.
- Axios: Chamadas HTTP para o back-end.
- Bootstrap: Estilização rápida e responsiva.

## 📡 Endpoints da API
### POST /register
Registra um novo usuário.

- Corpo da requisição: `{ username, email, password }`
- Resposta: Retorna os dados do usuário criado.

### POST /login
Autentica o usuário e gera um token de acesso e refresh.

- Corpo da requisição: `{ username, password }`
- Resposta: Retorna `{ token, newToken }`

### POST /refresh-token
Gera um novo token de acesso.

- Corpo da requisição: `{ newToken }`
- Resposta: `{ accessToken }`

## 🌐 Navegação no Frontend
- `/login`: Página inicial, onde o usuário pode fazer login.
- `/register`: Página de registro.
- `/home`: Página principal (requer autenticação).

## 🏗 Contribuição
1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`).
3. Comite suas alterações (`git commit -m 'Adiciona nova funcionalidade'`).
4. Faça o push para a branch (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## 🌐 Visite o Aplicativo

Você pode acessar a aplicação online através do seguinte link:

[Visite o Aplicativo](https://login-autenticado-robk.vercel.app/)

## 📜 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
