"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/http/controllers/update-imoveis copy.ts
var update_imoveis_copy_exports = {};
__export(update_imoveis_copy_exports, {
  updateImoveis: () => updateImoveis
});
module.exports = __toCommonJS(update_imoveis_copy_exports);

// src/app.ts
var import_client = require("@prisma/client");
var import_fastify = __toESM(require("fastify"));
var app = (0, import_fastify.default)();
var prisma = new import_client.PrismaClient();

// src/http/controllers/update-imoveis copy.ts
var import_zod = require("zod");
var updateImoveis = async (request, reply) => {
  const updateBodySchema = import_zod.z.object({
    title: import_zod.z.string().optional(),
    description: import_zod.z.string().optional(),
    rooms: import_zod.z.string().optional(),
    value: import_zod.z.string().optional(),
    images: import_zod.z.array(import_zod.z.string().optional())
  });
  const updateParamsSchema = import_zod.z.object({
    id: import_zod.z.string().uuid()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateImoveis
});
