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
