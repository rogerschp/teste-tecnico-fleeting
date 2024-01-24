# Teste Fleeting

Stack: Nest.js, Next.js

Banco: Postgres

ORM: TypeORM

Validações: yup | zod | class-validator

Chamadas HTTP: axios | getServerSideProps | React-Query

Estilizações: styled-components | tailwindcss

Formulario: react-hook-form

State-management: react context (Não utilizar libs)

# Obrigatório

Criar uma padrão de estilização utilizando prettier / eslint para checagem de código

Readme de como rodar o projeto

Dockerfile para rodar a aplicação

Componentização de todos os componentes (frontend)

Criar paginação dos TODO's e um filtro por (id | title | status | created_at)

# Opcional

Biblioteca de componentes(opcional): MUI

# Diferencial

Monorepo

Subir em um serviço de cloud free como vercel e railway

Utilizar o husky (https://www.npmjs.com/package/husky)

Salvar fuso horario no banco de dados

Seed para popular o banco de dados

Soft delete com data e horario (usuario não pode realmente deletar o registro, apenas marcar como deletado, exemplo deleted_user1@fleeting.com.br)

# Projeto

## Backend

Criar uma API Rest utilizando Nest.js contendo:

CRUD para login
({
id: uuid,
name: string,
email: string,
password: string,
created_at: Date,
updated_at: Date,
todos: Todo[],
})

CRUD para cadastrar TODO's
({
id: uuid,
title: string,
description: string,
status: 'to-do' | 'doing' | 'done',
created_at: Date,
updated_at: Date,
})

## Frontend

Criar o projeto utilizando Next.js com a pages router

Deve conter uma tela de login e uma tela de cadastro de TODO's

OPCIONAL: tela pro usuario editar seus proprios dados basicos e tela de esqueci minha senha
