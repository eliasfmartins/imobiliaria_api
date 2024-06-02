import { app } from "../src/app";
import { env } from "../src/env";
import { imoveisRoutes } from "../src/routes/imoveis";

app.register(imoveisRoutes, { prefix: 'imoveis' });

module.exports = async (req, res) => {
  await app.ready();
  app.server.emit('request', req, res);
};
