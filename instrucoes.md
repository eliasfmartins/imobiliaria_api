
## Criando API Node com Fastify e Prisma ORM

### Passo 1: Inicializar o Projeto

Primeiro, vamos inicializar um novo projeto Node.js:

```bash
npm init -y
```

Isso criará um arquivo `package.json` na raiz do projeto.

### Passo 2: Criar a Estrutura de Pastas e Arquivos

Crie a pasta `src` e o arquivo `src/server.ts` que será o ponto de entrada do nosso servidor:

```bash
mkdir src
touch src/server.ts
```

### Passo 3: Instalar TypeScript e Tipos do Node

Vamos instalar o TypeScript e os tipos do Node.js para podermos usar TypeScript no nosso projeto:

```bash
npm install typescript @types/node --save-dev
```

### Passo 4: Configurar o TypeScript

Inicialize o TypeScript no seu projeto para criar o arquivo `tsconfig.json`:

```bash
npx tsc --init
```

Edite o arquivo `tsconfig.json` e defina a versão do JavaScript para ES2020:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist"
  },
  "include": ["src"]
}
```

### Passo 5: Instalar e Configurar o TSUP

Vamos instalar o `tsup` para compilar arquivos TypeScript diretamente:

```bash
npm install tsup --save-dev
```

Adicione um script ao `package.json` para compilar o projeto com `tsup`:

```json
"scripts": {
  "dev": "tsup src/server.ts --watch --onSuccess 'node dist/server.js'"
}
```

### Passo 6: Instalar o Fastify

Instale o Fastify, que será o microframework utilizado para criar a API:

```bash
npm install fastify
```

### Passo 7: Criar e Configurar o Fastify

Crie um arquivo `src/app.ts` para instanciar o Fastify:

```typescript
import Fastify from 'fastify';

const app = Fastify({ logger: true });

export default app;
```

Edite o arquivo `src/server.ts` para chamar o Fastify:

```typescript
import app from './app';

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    app.log.info(`Server is running on http://localhost:3000`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
```

### Passo 8: Variáveis de Ambiente

Para gerenciar variáveis de ambiente, instale o `dotenv`:

```bash
npm install dotenv
```

No início do arquivo `src/server.ts`, importe o `dotenv`:

```typescript
import 'dotenv/config';
```

Agora você pode acessar variáveis de ambiente através de `process.env.NOME_DA_VARIAVEL`.

### Passo 9: Começando com o Prisma ORM

Instale o Prisma como dependência de desenvolvimento:

```bash
npm install prisma --save-dev
```

Inicialize o Prisma no projeto:

```bash
npx prisma init
```

Isso criará uma pasta `prisma` com um arquivo `schema.prisma`.

### Passo 10: Configurar o Prisma Schema

Edite o arquivo `prisma/schema.prisma` para definir o modelo `Imovel`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Imovel {
  id                Int      @id @default(autoincrement())
  titulo            String
  descricao         String
  quantidadeQuartos Int
  valor             Float
  imagens           String[]
}
```

### Passo 11: Migrar o Banco de Dados

Aplique a migração para criar as tabelas no banco de dados:

```bash
npx prisma migrate dev --name init
```

Gere o cliente Prisma:

```bash
npx prisma generate
```

Instale o cliente Prisma:

```bash
npm install @prisma/client
```

### Passo 12: Integrar Prisma com Fastify

Edite o arquivo `src/app.ts` para integrar o Prisma:

```typescript
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

const app = Fastify({ logger: true });
const prisma = new PrismaClient();

app.get('/imoveis', async (request, reply) => {
  const imoveis = await prisma.imovel.findMany();
  return imoveis;
});

app.post('/imoveis', async (request, reply) => {
  const { titulo, descricao, quantidadeQuartos, valor, imagens } = request.body as any;
  const imovel = await prisma.imovel.create({
    data: {
      titulo,
      descricao,
      quantidadeQuartos,
      valor,
      imagens,
    },
  });
  return imovel;
});

app.put('/imoveis/:id', async (request, reply) => {
  const { id } = request.params as any;
  const { titulo, descricao, quantidadeQuartos, valor, imagens } = request.body as any;
  const imovel = await prisma.imovel.update({
    where: { id: Number(id) },
    data: {
      titulo,
      descricao,
      quantidadeQuartos,
      valor,
      imagens,
    },
  });
  return imovel;
});

app.delete('/imoveis/:id', async (request, reply) => {
  const { id } = request.params as any;
  await prisma.imovel.delete({ where: { id: Number(id) } });
  return { message: 'Imóvel deletado com sucesso' };
});

export default app;
```

### Passo 13: Iniciar o Servidor

Inicie o servidor para testar a API:

```bash
npm run dev
```

### Testando a API

Você pode usar ferramentas como Insomnia ou Postman para testar as rotas da API:

- **GET /imoveis**: Lista todos os imóveis.
- **POST /imoveis**: Cria um novo imóvel.
- **PUT /imoveis/:id**: Atualiza um imóvel existente.
- **DELETE /imoveis/:id**: Deleta um imóvel existente.

### Resumo

Agora você tem uma API simples criada com Fastify e Prisma ORM, configurada para criar, listar, atualizar e deletar imóveis. Conforme você se sentir mais confortável, pode expandir essa API para incluir autenticação, autorização e outras funcionalidades avançadas.
