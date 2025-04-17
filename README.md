# Nerus TodoList

Uma aplicação full-stack de lista de tarefas com frontend em Next.js, backend em Node.js com Express e banco de dados MySQL — tudo containerizado com Docker.

## Estrutura do Projeto

```
nerus-todolist/
├── frontend/            # Aplicação frontend com Next.js
├── backend/             # API backend com Node.js e Express
├── docker-compose.yml   # Configuração do Docker Compose
└── .env                 # Variáveis de ambiente
```

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- [NPM](https://nodejs.org/en/) (>= v22.11.0)
- [Docker](https://www.docker.com/) (>= v 27.5.1)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

## Primeiros Passos

### 1. Clone o Repositório

```bash
git clone https://github.com/marcuswd/nerus-todolist.git
cd nerus-todolist
```

### 2. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
# Configuração da API
PORT=3001
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Configuração do Banco de Dados
DB_HOST=db
DB_PORT=3306
DB_USER=nerus_admin
DB_PASSWORD=123456
DB_NAME=nerus_todolist
MYSQL_ROOT_PASSWORD=123456
```

### 3. Inicie a Aplicação com Docker

```bash
docker-compose up --build
```

Esse comando irá:

- Construir as imagens Docker para o frontend e backend
- Criar e iniciar os containers de todos os serviços
- Subir o banco de dados MySQL
- Estabelecer as conexões de rede necessárias

### 4. Acesse a Aplicação

- Frontend: http://localhost:3000  
- API Backend: http://localhost:3001/api/todos  
- Documentação da API (Swagger): http://localhost:3001/docs

## Desenvolvimento

### Execução manual

#### Configuração do Ambiente

1. Crie um arquivo `.env` dentro da pasta `backend`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=nerus_admin
DB_PASSWORD=123456
DB_NAME=nerus_todolist
DATABASE_URL=mysql://nerus_admin:123456@localhost:3306/nerus_todolist
```

2. Crie um arquivo `.env.local` dentro da pasta `frontend`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

3 Suba uma instância local do MySQL com essas credenciais ou ajuste as variáveis para refletirem seu ambiente local.

#### Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

O servidor de desenvolvimento do frontend estará disponível em http://localhost:3000.

#### Backend (Node.js/Express)

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate deploy
npm run dev
```

A API estará disponível em http://localhost:3001.

## Arquitetura

- **Frontend**: Aplicação React com Next.js  
- **Backend**: API REST em Node.js + Express, escrita em TypeScript  
- **Banco de Dados**: MySQL 8.0  
- **Documentação**: Swagger UI para documentação da API  
- **Containerização**: Docker com Docker Compose para orquestração