"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_client = require("@prisma/client");
var import_fastify = __toESM(require("fastify"));
var app = (0, import_fastify.default)();
var prisma = new import_client.PrismaClient();

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "production", "test"]).default("dev"),
  PORT: import_zod.z.coerce.number().default(3333)
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274CInvalid environment variables", _env.error.format());
  throw new Error("Invalid environment variables");
}
var env = _env.data;

// src/http/controllers/list-imoveis.ts
var listImoveis = async (request, reply) => {
  try {
    const imoveis = await prisma.property.findMany();
    return reply.status(200).send({
      success: true,
      count: imoveis.length,
      data: imoveis
    });
  } catch (e) {
    reply.status(500).send({ success: false, error: "Erro ao buscar os im\xF3veis" });
  }
};

// src/http/controllers/register-imoveis.ts
var import_zod2 = require("zod");
var register = async (request, reply) => {
  const registerBodySchema = import_zod2.z.object({
    title: import_zod2.z.string(),
    description: import_zod2.z.string(),
    rooms: import_zod2.z.string(),
    value: import_zod2.z.string(),
    images: import_zod2.z.array(import_zod2.z.string())
  });
  try {
    const validatedData = registerBodySchema.parse(request.body);
    const { description, images, rooms, title, value } = validatedData;
    const imovel = await prisma.property.create({
      data: {
        description,
        rooms,
        title,
        value,
        images
      }
    });
    return reply.status(200).send({
      success: true,
      message: "Im\xF3vel cadastrado com sucesso!",
      data: imovel
    });
  } catch (e) {
    reply.status(400).send({ sucess: false, error: e.errors });
  }
};

// src/http/controllers/delete-imoveis.ts
var import_zod3 = require("zod");
var deleteImoveis = async (request, reply) => {
  const updateParamsSchema = import_zod3.z.object({
    id: import_zod3.z.string().uuid()
  });
  try {
    const { id } = updateParamsSchema.parse(request.params);
    const imovel = await prisma.property.delete({
      where: { id }
    });
    return reply.status(200).send({
      success: true,
      message: "Im\xF3vel Deletado com sucesso!",
      data: imovel
    });
  } catch (e) {
    reply.status(400).send({ sucess: false, error: e.errors });
  }
};

// src/http/controllers/update-imoveis copy.ts
var import_zod4 = require("zod");
var updateImoveis = async (request, reply) => {
  const updateBodySchema = import_zod4.z.object({
    title: import_zod4.z.string().optional(),
    description: import_zod4.z.string().optional(),
    rooms: import_zod4.z.string().optional(),
    value: import_zod4.z.string().optional(),
    images: import_zod4.z.array(import_zod4.z.string().optional())
  });
  const updateParamsSchema = import_zod4.z.object({
    id: import_zod4.z.string().uuid()
  });
  try {
    const { id } = updateParamsSchema.parse(request.params);
    const validatedData = updateBodySchema.parse(request.body);
    const dataToUpdate = Object.fromEntries(
      Object.entries(validatedData).filter(([_, v]) => v !== void 0)
    );
    const imovel = await prisma.property.update({
      where: { id },
      data: dataToUpdate
    });
    return reply.status(200).send({
      success: true,
      message: "Im\xF3vel atualizado com sucesso!",
      data: imovel
    });
  } catch (e) {
    reply.status(400).send({ sucess: false, error: e.errors });
  }
};

// src/routes/imoveis.ts
async function imoveisRoutes(app2) {
  app2.get("/", (request, reply) => {
    return reply.status(200).send({ message: "deu certo" });
  });
  app2.get("/imoveis", listImoveis);
  app2.post("/", register);
  app2.patch("/:id", updateImoveis);
  app2.delete("/:id", deleteImoveis);
}

// src/server.ts
app.listen({
  host: `0.0.0.0`,
  port: env.PORT
}).then(() => {
  console.log(`\u{1F531} HTTP Server Running! http://localhost:3333`);
});
app.register(imoveisRoutes);
