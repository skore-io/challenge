# Desafio técnico - Learning Rocks

## Melhorias feitas
 - refactor na classe content service para deixar a função com menos responsabilidades
 - testes unitários ajustados
 - txt adicionado no retorno de conteúdo

## Problemas encontrados
 - a falha principal de segurança foi encontrada, no app.module as informações do banco de dados estão expostas

## Problemas para corrigir na aplicação
 - os paths da aplicação estão com problemas, está com conflito para rodar a aplicação e rodar os testes, será necessário corrigir criando alias e ajustando no arquivo tsconfig
 - a falha de segurança precisa ser ajustada, porém algum problema está impedindo dos .envs serem usados na aplicação de forma geral


## OBS
 - devido ao problema nos paths para rodar os testes será necessário mudar os paths dos testes manualmente

## Contexto

A Plataforma LXM da Learning Rocks é uma solução de educação corporativa desenvolvida para potencializar o aprendizado e a performance dos colaboradores dentro das empresas. Nosso modelo B2B atende organizações que desejam estruturar e gerenciar treinamentos obrigatórios, trilhas de conhecimento e capacitações personalizadas.

---

## Setup do projeto de backend

### Pré-requisitos

O que você precisa para configurar o projeto:

- [NPM](https://www.npmjs.com/)
- [Node](https://nodejs.org/en/) `>=22.0.0` (Instale usando [NVM](https://github.com/nvm-sh/nvm))
- [Docker Compose](https://docs.docker.com/compose/)

### Setup

1. **Instale o Docker e o Docker Compose**, caso ainda não tenha.
2. Suba os serviços necessários (PostgreSQL e Redis) com:
   ```bash
   docker-compose up -d
   ```
3. Instale as dependências do projeto:
   ```bash
   nvm use && npm install
   ```
4. Configure o banco de dados:
   ```bash
   npm run db:migrate && npm run db:seed
   ```
5. Inicie o servidor:
   ```bash
   npm run start:dev
   ```
6. Acesse o **Playground do GraphQL**:
   - 👉 [http://localhost:3000/graphql](http://localhost:3000/graphql)

### Tests

Para rodar os testes:

```bash
npm run test
```

### Migrations

Caso precise criar novas migrations, utilize o comando:

```bash
npm run db:create_migration --name=create-xpto-table
```
