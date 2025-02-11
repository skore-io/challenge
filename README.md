# Desafio técnico - Learning Rocks

## RESPOSTA DO DESAFIO

Instruções:
O projeto do frontend está localizado na subpasta challenge-frontend
foram usados no projeto usado
- nuxt 2.15.8 
- vue 2.7.10

Na pasta do projeto usar os comandos:
- npm install
- npm run dev

Anotações: 
- Fiz uma lista hardcoded(fixada) no frontend com os Ids dos conteúdos para priorizar a tarefa do Backend sem ter que abrir um endpoint novo no back para poder listar todos Ids.
- Implementei uma strategy pattern para o backend, aonde o método 'provision' pode ser herdado por classes de cada tipo de arquivo que é implentado.
- Foram implementados, separadamente, os tipos 'txt' e 'link' e agora existe um arquivo de texto 'exemplo.txt' para servir de exemplo
- O frontend rediriciona o conteúdo para o player do tipo equivalente, podendo ser implementado novos players separadamente no futuro.
- Coloquei uma propriedade 'contentBody' para ler o corpo do txt
- A barra de progresso responde a quantidade de conteúdo que foi clicado e "visto".

-implementei um arquivo de testes para o txt-strategy (usando os outros como base) para aumentar o nível de coverage, mas creio que exista uma maneira melhor de montar isso levando em conta que os strategies estão herdando a interface genérica que chama o provision

## Próximos passos
Como próximas tarefas, caso houvesse mais tempo eu adicionaria:
-Fazer a autenticação de cada usuario e limitar os tipos de conteúdo a qual ele tem acesso para apenas os permitidos
-Tirar a lista hardcoded do frontend e ter um /get apenas para os conteúdos permitidos para o user
-Mudar as URLs para https (localmente não há nenhum problema, mas em um projeto em produção sim)
-implementar mais testes e tipagems de retorno de erros.






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
