# 🚀 Refounds API

API REST para gerenciamento de solicitações de reembolso (Refounds), com autenticação via JWT, controle de acesso por perfil (role), upload de comprovantes e execução via Docker.

---

# 📌 Sobre o Projeto

A **Refounds API** é um backend desenvolvido com foco em boas práticas de mercado:

- Arquitetura em camadas (Controller → UseCase → Repository)
- Separação clara de responsabilidades
- Autenticação com JWT
- Autorização baseada em roles
- Upload e gerenciamento de arquivos
- Ambiente totalmente containerizado com Docker

O sistema permite:

- Cadastro e autenticação de usuários
- Controle de acesso por perfil (`employee` e `manager`)
- Criação de solicitações de reembolso com upload de comprovante
- Listagem e detalhamento de solicitações
- Exclusão de registros com remoção do arquivo físico

---

# 🛠 Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT (JSON Web Token)
- Multer
- Docker
- Docker Compose

---

# 🔐 Autenticação

A autenticação é feita via **JWT**.

Após o login, o token deve ser enviado no header das requisições privadas:


---

# 👥 Controle de Acesso (Roles)

O sistema possui dois perfis:

- `employee`
- `manager`

## Permissões

| Role      | Permissões |
|-----------|------------|
| employee  | Criar refound, listar seus próprios refounds, visualizar detalhes e deletar |
| manager   | Listar todos os refounds do sistema |

### Middlewares

- `ensureAuth` → valida token JWT
- `verifyUser` → valida perfil do usuário

---

# 📁 Upload de Arquivos

- Upload via `multipart/form-data`
- Campo esperado: `file`
- Gerenciado com Multer
- Arquivos armazenados em diretório configurado (ex: `tmp/uploads`)
- Ao deletar um refound, o arquivo físico também é removido

---

# 📌 Rotas da Aplicação

## 🔓 Rotas Públicas

### Criar Usuário


### Login


---

## 🔐 Rotas Privadas

Prefixo base:


Todas exigem autenticação via JWT.

---

## 👨‍💼 Rotas para `employee`

### Criar Refound


Body (multipart/form-data):

| Campo    | Tipo    | Obrigatório |
|----------|---------|------------|
| name     | string  | Sim |
| amount   | number  | Sim |
| category | string  | Sim |
| file     | file    | Sim |

---

### Listar Refounds do Usuário


---

### Buscar Detalhes

---

### Deletar Refound


Remove o registro do banco e o arquivo associado.

---

## 👨‍💼 Rotas para `manager`

### Listar Todos os Refounds


Retorna todos os refounds do sistema.

---

# 🏗 Estrutura do Projeto


src/
├── configs/
├── middlewares/
├── modules/
│ ├── refound/
│ │ ├── controller/
│ │ ├── useCases/
│ │ ├── repository/
│ │ └── factory/
│ ├── user/
├── prisma/
├── routes/
└── server.ts


Arquitetura baseada em:

- Controllers
- Use Cases
- Repository Pattern
- Factory Pattern
- Separação clara de responsabilidades

---

# 🐳 Executando com Docker

## 📦 Pré-requisitos

- Docker
- Docker Compose

---

## 🐳 Dockerfile

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]


version: "3.9"

services:
  database:
    image: postgres:15
    container_name: refounds_db
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: refounds
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build: .
    container_name: refounds_api
    restart: always
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:postgres@database:5432/refounds
      JWT_SECRET: supersecret
    depends_on:
      - database
    volumes:
      - .:/app
      - /app/node_modules


docker-compose up --build

http://localhost:3000

docker exec -it refounds_api npx prisma migrate dev


---

Agora um conselho direto:

Se você:
- Subir isso no GitHub
- Garantir que o Docker realmente funciona
- Adicionar um frontend React consumindo essa API

Você sai do nível “estudando backend” para “dev construindo sistema real”.

