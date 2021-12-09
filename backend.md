# Desafio Backend

Esta é uma avaliação de código destinada à você, engenheiro de software backend, candidato à uma vaga de nível sênior+ na **Skore**. O objetivo é conhecer um pouco mais do seu conhecimento e de suas práticas de desenvolvimento.

Para a realização do desafio, crie um repositório pessoal no Github, e ao finalizar, nos envie o link dele e adicione @skore-io como colaborador do projeto.

Boa sorte :)

## :rocket: Tecnologias na Skore

Nós, da *Skore* somos *fanboys* de **TypeScript** e **Nest.js**, portanto, caso você venha a fazer parte de nossa equipe, a stack com a qual você trabalhará será majoritariamente essa:

- Typescript
- Nest.js
- Jest
- Postgres / MongoDB
- Docker

## :notebook: Tarefas

Sem mais enrolação, vamos ao desafio!

Você precisará criar uma API com endpoints ou queries/mutations para um CRUD de conteúdos. **Só isso!**

**Brincadeira!!** Se fosse tão fácil assim a vida de dev, estaria bom.

### :guardsman: Camada de autenticação

A API deverá possuir uma camada de autenticação com permissionamento de acesso variando de acordo com a `role` do usuário, que poderá ser `student` ou `admin`, como dispõe a lista abaixo:

- [ ] Criação de conteúdo - apenas para `admin`;

- [ ] Edição de conteúdo por id - apenas para `admin`;

- [ ] Deleção de conteúdo por id - apenas para `admin`;

- [ ] Leitura de conteúdo por id - para qualquer role;

- [ ] Listagem de conteúdos por type - para qualquer role;

Para obter os dados dos usuários, acesse este [playground GraphQL](https://bilu.com.br/graphql), e utilize os tokens abaixo:

- Role 'admin': `BILU_ADMIN`;

- Role 'student': `BILU_STUDENT`;

### :scroll: Regras de negócio

Com a seguinte representação de um conteúdo:

```json
{
  "id": 1,
  "name": "ET Bilu",
  "type": "video",
  "views": 2,
  "createdAt": 163458799,
  "deletedAt": null
}
```

Aplique as seguintes regras de negócio:

- `name` e `type` são campos obrigatórios;
- Três diferentes tipos de conteúdo `video`, `pdf` e `image`;
- Cada leitura de conteúdo por um usuário `student` deverá incrementar o campo `views` do conteúdo;

## :fire: Requisitos obrigatórios

- Aqui na **Skore** consideramos testes como parte essencial do trabalho de engenheiros de cargo sênior+, portanto é **indispensável** a escrita de testes de integração e unitários no desenvolvimento do desafio.

- Para a persistência dos dados, pedimos que você utilize uma imagem Docker com um banco real, sem utilizar mock de dados. Recomendamos a [imagem oficial do Postgres](https://hub.docker.com/_/postgres), caso você opte por seguir com um banco SQL, ou a [imagem oficial do MongoDB](https://hub.docker.com/_/mongo), caso opte por um NoSQL - já que estes serão os bancos que você terá mais contato em seu dia-a-dia aqui.

## :muscle: Requisitos não-obrigatórios, mas que gostaríamos MUITO que você fizesse

- Como dissemos lá em cima, somos *fanboys* de **Nest.js** e **TypeScript**, portanto gostaríamos que você utilizasse ao máximo as funcionalidades do framework. A [extensa documentação](https://docs.nestjs.com/) dele pode lhe ajudar em praticamente tudo que você for desenvolver no desafio.

- Logs são parte fundamental de nosso trabalho, portanto gostaríamos que você adicionasse alguns logs aonde achar necessário.

- Gostamos de REST APIs? Sim. Mas preferimos GraphQL!! Por que? Discutimos quando você entrar, rsrs.

- Como todos sabemos, alta performance é algo que sempre almejamos alcançar em qualquer código que escrevemos, portanto gostaríamos que o seu projeto tivesse soluções voltadas à performance. Mesmo que isto não seja aparente em uma pequena base de dados como é a proposta do desafio, queremos ver quais são suas ideias considerando escalabilidade à longo prazo.

## :thinking: Uma outra possibilidade?

Como qualquer dev, nós gostaríamos de ver como você organiza seu código, as práticas e padrões que utiliza no desenvolvimento e seu raciocínio lógico, **no entanto**, caso você queira nos surpreender, nós ficaríamos **extremamente satisfeitos** caso você opte por escrever uma [RFC](https://www.ietf.org/standards/rfcs/) contendo as especificações técnicas para o desenvolvimento do projeto proposto aqui, ao invés de desenvolvê-lo de fato.

## :shrug: Ficou com alguma dúvida?

Lidar com as incertezas é um valor muito importante dentro da **Skore**, e caso isso ocorra, pedimos que você tome as decisões necessárias e explique-as ao submeter o *pull request*.
