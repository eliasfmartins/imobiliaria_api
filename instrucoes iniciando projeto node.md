# Estrutura do projeto Node

npm init -y => para criar o package.json
criar pasta src => onde vai ficar a estrutura do projeto
criar um arquivo server.ts dentro da pasta src

logo apos intalar exentesoes que seram utilizadas

{"tsx"

tsx biblioteca que torna possivel rodar codigo typescript sem ter q converter
o codigo para JavaScript antes de executa-lo}

{"@types/node"

tipagem do node}

{typeScript // o proprio ts}

{"tsup"

biblioteca pra criar a versao de build do projeto}

{-D 

referenciando dependencia de desenvolvimento}

npm i typescript @types/node tsx tsup -D

apos intalar essas dependendicas 

{npx tsc --init

para criar o arquivo de configuracoes do TS}

alterar target: "es2020" que e a verssão do javaScript a qual o ts sera copilado


{npm i fastify

instalando o fastify}

criar dentro de src/app.ts

importar e instaciar o fastify


ex: import fastify from 'fastify';

export const app = fastify()

dentro de server.ts

import { app } from "./app";

app.listen({
    host:`0.0.0.0`,
    port: 3333
}).then(()=>{
    console.log(`🔱 HTTP Server Running! http://localhost:3333`)
})

chamar o app.listen e rodar na porta 3333, colocar o host: 0.0.0.0 pra não
dar conflito com front end 

assim que o app estiver rodando vai retornar o console na promise

configurando scripts no package.json

 "dev": "tsx watch src/server.ts"

basicamente fala pro tsx a biblioteca instalada anteriormente  assita o
server.ts procurando por alteracoes

script para build do projeto

"build": "tsup src --out-dir build"

vai converter todos os arquivos da pasta src pra pasta build

apos converter os arquivos pra js vc pode testar  a funcionalidade
com comando

"start": "node build/server.js",

executa o serve.js

## Carregando variaveis de ambiente

criar o .env na raiz do projeto
declarar o NODE_ENV=dev

e criar um arquivo .env.example que sera um exemplo de dados necessarios
para rodar a aplicação


intalar a bibioteca dotenv

npm i dotenv

carregar as variaveis de ambiente dentro do projeto

carrega as informacoes da env pra qualquer arquivo do node

criar o arquivo na pasta src/env/index.ts

importar o (import 'dotenv/config')

pra carregar as variaveis de ambiente e dar acesso a elas dentro do arquivo

agora que ja temos acesso as variaveis de ambiente, vamos fazer a validação
das mesmas  com a biblioteca zod

npm i zod

validando as variaveis de ambiente 

```
import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
	NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
	PORT: z.coerce.number().default(3333), // converte qualquer valor pra number
});

const _env = envSchema.safeParse(process.env);
// safe parse tenta validar se o process.env tem as informacoes
// que o envSchema esta pedindo caso ao contrario vai dar um
//thorw error
if (_env.success === false) {
	console.error('❌Invalid environment variables', _env.error.format());
	throw new Error('Invalid environment variables');
}
// esse thorw  serve para parar a aplicacao
//se passar daqui e sucesso

export const env = _env.data;

// apos salvo vc pode importar o env e utilizar as variaveis de ambiente
// em qualqer lugar da aplicacao

```
apos salvo vc pode importar o env.port ou outra chave pra acessar o valor

configurando imports com alis @/

no tsconfig.json 
descomente o  "baseUrl": "./",
e a linha abaixo 
"paths": {
      "@/*":["./src/*"]
    }
tudo que vier dps do @/ vai ser como-se viesse de dentro da pasta src



## ORM Prisma

primeiro passo instalar o prisma

npm i prisma -D

pra instalar o prisma  como dependencia de desenvolvimento

dps de instalar vc da

npx prisma init 

vai criar a pasta prisma  e la dentro o schema.prisma onde vc vai colocar suas tabelas
que vc tera no seu banco de dados


model Property {
  id        String   @id @default(uuid())
  title     String
  description String
  images    String[]
  rooms     Int
  value     Float

  @@map("imoveis")
}

aqui e a sua tabela 

dps disso vc vai usar o 

npx prisma generate pra criar a tipagem do nosso schema

agora nosso codigo typescript vai saber q existe a tabela imoveis e
os campos q ela possue
agora q o prisma ja criou o schema 
vc precisa instalar o 

npm i @prisma/client

esse e uma dependencia de producao utilizado pra acessar o banco de dados 
quando instalar isso e possivel
insanciar  e usar os metodos criados pelo negerate
ex:

const prisma = new PrismaClient();

prisma.property.create({
    data:{
        title:'teste'
    }
})
esse foi um exemplo do create mas tbm aparece os outro methodos 
disponiveis pra model

agora vamos comecar com o banco de dados


pra procurar uma imagem do docker pronta vc pode usar o dockerhub
o repositorio de imagens do docker 

nesse exemplo vamos usar da bitnami/postgresql
ja que oferece uma camada a mais de seguranca


docker run --name

name= como eu quero chamar o banco de dados na minha maquina 

docker run --name api-imoveis-pg(pg e pra indicar postgresql)

docker run --name api-imoveis-pg bitnami/postgresql

bitnami/postgresql e o nome da imagem que eu quero utilizar

agora vou passar variaveis ed ambiente pra ja configurar o ambiente
 - POSTGRESQL_USERNAME=my_user
 - POSTGRESQL_PASSWORD=senha
 - POSTGRESQL_DATABASE=my_database
 - aqui vamos publicar uma porta 
 - o -p indica a porta 
 - o postgresql por padrao roda na porta 5432
 - o -p 5432:5432 quer dizer pra porta 5432 do postgresql seja 
 - direcionada pra porta 5432 do host da maquina

docker run --name api-imoveis-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=imoveisapi -p 5432:5432 bitnami/postgresql

alterar configuracoes na env
por padrao o prisma ja gera uma chave no .env
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public" padrao
DATABASE_URL="postgresql://{nomeusuario}:{senha}@localhost:5432/{database}?schema=public" preenchimento campos
DATABASE_URL="postgresql://docker:docker@localhost:5432/imoveisapi?schema=public" preenchida

apos subir o container  
executar o 
npx prisma migrate dev

pra aplicar as mudancas no banco de dados

pra verificar o banco de dados vc pode utilizar o 
npx prisma studio
script para deploy vercel
 "vercel-build":"npx prisma migrate deploy && prisma generate"

implementando jwt no fastify

npm i @fastify/jwt
