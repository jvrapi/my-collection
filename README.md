<h1 align="center"> 
My Collection
</h1>

<p align="center">
  <a href="#open_book-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#information_source-como-usar">Como Usar</a>
</p>

## :open_book: Sobre
O *my collection* é uma aplicação desenvolvida com o objetivo de estudar novas tecnologias visando o PDI. A ideia é do app é ser um gerenciador de coleção pessoal do card game [MTG](https://pt.wikipedia.org/wiki/Magic:_The_Gathering).

## :rocket: Tecnologias
- [Apollo Server](https://github.com/dcodeIO/bcrypt.js)
- [TypeGraphQL](https://typegraphql.com/)
- [Prisma](https://www.prisma.io/)
- [Typedi](https://github.com/typestack/typedi)
- [Json Web Token](https://github.com/auth0/node-jsonwebtoken)
- [UUID](https://github.com/uuidjs/uuid)
- [Jest](https://jestjs.io/pt-BR/)


## :information_source: Como usar
No projeto, foi utilizado o [Docker](https://www.docker.com/) junto com o [Compose](https://docs.docker.com/compose/). 

```bash
# Clonar este repositorio
$ git clone https://github.com/jvrapi/my-collection.git

# Entre na pasta do repositorio
$ cd my-collection

# Instale as dependências do projeto 
$ yarn

# Renomeie o arquivo .env.example para .env.

# Inicie os containers
$ docker compose up -d # dependendo da versão, esse commando pode mudar
```

Para criar as tabelas no banco de dados, utilize:
```bash
$ yarn prisma migrate deploy
```

---


<div align="center">


Feito com  ❤ por [João Vitor Santos](https://github.com/jvrapi) 👋 Entre em contato!

[![Linkedin Badge](https://img.shields.io/badge/-João%20Vitor-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/joaovitorssdelima/)](https://www.linkedin.com/in/joaovitorssdelima/) 
[![Gmail Badge](https://img.shields.io/badge/-Gmail-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:joaooviitoorr@gmail.com)](mailto:joaooviitoorr@gmail.com) 
[![Hotmail Badge](https://img.shields.io/badge/-Hotmail-0078d4?style=flat-square&logo=microsoft-outlook&logoColor=white&link=mailto:joaooviitorr@hotmail.com)](mailto:joaooviitorr@hotmail.com)
	
</div>