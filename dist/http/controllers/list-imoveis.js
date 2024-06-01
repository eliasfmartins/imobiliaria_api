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

// src/http/controllers/list-imoveis.ts
var list_imoveis_exports = {};
__export(list_imoveis_exports, {
  listImoveis: () => listImoveis
});
module.exports = __toCommonJS(list_imoveis_exports);

// src/app.ts
var import_client = require("@prisma/client");
var import_fastify = __toESM(require("fastify"));
var app = (0, import_fastify.default)();
var prisma = new import_client.PrismaClient();

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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listImoveis
});
