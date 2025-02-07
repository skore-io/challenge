# Player de Conteúdo

Player de Conteúdo faz parte do desafio técnico da **Learning Rocks**. O projeto foi construído com **NestJS**, utilizando **GraphQL**, **PostgreSQL** e **Redis**, além de seguir boas práticas de arquitetura e segurança.

## 🎯 Decisões Técnicas e Abordagem

Nesse código, tentei ao máximo seguir os padrões atuais e as boas práticas de desenvolvimento.

- **Correção de vulnerabilidade**:  
   Durante a análise, identifiquei uma falha de **SQL Injection** no arquivo `content.repository.ts`.  
   O código anterior concatenava diretamente o `contentId` na query SQL, permitindo que um atacante mal-intencionado injetasse comandos no banco.  
   A solução foi utilizar **Query Builder do TypeORM**, que previne esse tipo de ataque.

  ### Exemplo de SQL Injection

  Se um atacante enviar este valor no contentId:

  ```sql
  ' OR '1'='1
  ```

  A query final gerada será:

  ```sql
  SELECT * FROM contents WHERE id = '' OR '1'='1' AND deleted_at IS NULL LIMIT 1;
  ```

  Isso é perigoso pois a condição `OR '1'='1'` sempre será verdadeira, permitindo que a consulta retorne **todos os registros** da tabela `contents`.

- **Enum para escalabilidade**:  
  Criei uma **enum** para garantir **forte tipagem** e **escalabilidade dos tipos de conteúdo**, tornando mais fácil a adição de novos formatos no futuro.

- **Uso de cache (removido temporariamente 😅)**:  
  Inicialmente, implementei o **Node-cache** para reduzir a carga no banco de dados e acelerar respostas de requisições repetitivas.  
  No entanto, tive alguns problemas durante os testes e optei por remover a implementação no momento. É algo que podemos melhorar futuramente.

- **Aprendizado com testes**:  
  Um dos pontos mais desafiadores foi a escrita e manutenção dos **testes unitários e de integração**.  
  Enfrentei algumas dificuldades com mocks e spyOn, mas consegui estruturar testes confiáveis para garantir a estabilidade do código.

## 🚀 Começando

Estas instruções permitirão que você obtenha uma cópia do projeto em execução na sua máquina para desenvolvimento e testes.

### 🗉 **Pré-requisitos**

Antes de rodar o projeto, verifique se possui os seguintes itens instalados:

- [Node.js](https://nodejs.org/) `>=22.0.0` (Recomendado instalar com [NVM](https://github.com/nvm-sh/nvm))
- [NPM](https://www.npmjs.com/)
- [Docker e Docker Compose](https://docs.docker.com/compose/)

## 🔧 **Setup do Backend**

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

## 🔢 **Testes**

Para rodar os testes automatizados, execute:

```bash
npm run test
```

## ✒️ Autores

- **Matheus Borges** - [LinkedIn](https://www.linkedin.com/in/matheus-borges-4a7469239/)

⌨️ com ❤️ por [BorgesCode](https://github.com/Borgeta-code) 😊
