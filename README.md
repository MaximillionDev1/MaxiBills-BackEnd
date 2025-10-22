# 🧮 MaxiBills – Back-End API

O **MaxiBills Back-End** é a base da aplicação de controle financeiro **MaxiBills**, desenvolvida em **Node.js com TypeScript** e **Fastify**.  
Essa API fornece os recursos necessários para o gerenciamento de **transações financeiras (receitas e despesas)**, integrando-se ao front-end para oferecer uma experiência completa e segura.

---

## 🚀 Tecnologias Utilizadas

- ⚡ **Node.js + Fastify** – Servidor leve e performático  
- 🟦 **TypeScript** – Tipagem estática e segurança no código  
- 🧩 **Prisma ORM** – Integração com o banco de dados  
- 🗄️ **MongoDB** – Banco de dados não relacional para armazenamento das transações  
- 🔒 **Zod** – Validação de dados e schemas  
- 🌐 **CORS (Fastify CORS)** – Controle de acesso entre domínios  
- 🔥 **Firebase / Firebase Admin** – Autenticação e gerenciamento de usuários  
- 📅 **Day.js** – Manipulação e formatação de datas  
- ⚙️ **Dotenv** – Gerenciamento de variáveis de ambiente  

---

## 📁 Estrutura do Projeto

```
src/
├── config/         # Configurações globais (ex: banco, Firebase, variáveis de ambiente)
├── controllers/    # Lógica principal das rotas e integração com os services
├── middlewares/    # Middleware de autenticação, validação e tratamento de erros
├── routes/         # Definição de rotas e endpoints da API
├── schemas/        # Schemas de validação Zod
├── services/       # Regras de negócio e integração com Prisma / MongoDB
├── types/          # Tipagens TypeScript centralizadas
├── app.ts          # Configuração da aplicação Fastify
└── server.ts       # Inicialização do servidor
```

---

## ⚙️ Como Rodar o Projeto Localmente

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/MaximillionDev1/MaxiBills-BackEnd.git
cd MaxiBills-BackEnd
```

### 2️⃣ Instalar as dependências
```bash
yarn install
# ou
npm install
```

### 3️⃣ Configurar o ambiente
Crie um arquivo `.env` na raiz do projeto com suas variáveis de ambiente:
```bash
DATABASE_URL="sua_string_de_conexao"
FIREBASE_CREDENTIALS="seu_arquivo_credencial.json"
PORT=3333
```

### 4️⃣ Executar o servidor em modo desenvolvimento
```bash
yarn dev
# ou
npm run dev
```

A aplicação será executada em:
```
http://localhost:3333
```

---

## 📍 Principais Endpoints

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/transactions` | Cria uma nova transação (receita/despesa) |
| `GET`  | `/transactions` | Lista todas as transações do usuário |
| `GET`  | `/transactions/:id` | Retorna detalhes de uma transação específica |
| `DELETE` | `/transactions/:id` | Remove uma transação existente |
| `POST` | `/auth/login` | Autenticação de usuário via Firebase |
| `POST` | `/auth/register` | Registro de novo usuário |

*(Os endpoints podem variar conforme novas implementações — verifique o arquivo `/routes`.)*

---

## 🔗 Integração com o Front-End

O **MaxiBills Back-End** foi desenvolvido para se integrar perfeitamente ao front-end:  
🔗 [Repositório do Front-End](https://github.com/MaximillionDev1/MaxiBills-FrontEnd)

A comunicação é feita via **Axios**, com suporte completo a CORS e autenticação via Firebase.

---

## 🧱 Boas Práticas e Arquitetura

O projeto segue princípios de:
- **SOLID** e **Clean Code**  
- **Separação de responsabilidades (config, services, controllers, routes)**  
- **Validação com Zod e tratamento de erros centralizado**  
- **Segurança de dados e autenticação JWT/Firebase**

Essa arquitetura garante **escalabilidade, performance e fácil manutenção**.

---

## 🧑‍💻 Sobre o Desenvolvedor

**Matheus Vinicius Rodrigues da Silva**  
Desenvolvedor **Full Stack**, em transição de carreira, com experiência em liderança, resolução de problemas e foco em entregar produtos digitais completos — do front ao back-end.

🔗 [GitHub](https://github.com/MaximillionDev1)  
🔗 [LinkedIn](https://www.linkedin.com/in/matheus-vinicius-dev/)

---

## 📜 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar, modificar e contribuir!

---

> 💡 *“Controle suas finanças de ponta a ponta — do back ao front. MaxiBills é mais do que um app, é uma jornada full stack.”*

