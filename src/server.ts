import { app } from "./app";
import { env } from "./env";
import { imoveisRoutes } from "./routes/imoveis";

app.listen({
    host:`0.0.0.0`,
    port: env.PORT||3333
}).then(()=>{
    console.log(`🔱 HTTP Server Running! http://localhost:3333`)
    
})
app.get('/', (request, reply) => {
    return reply.status(200).send({ message: 'deu certo' });
});

app.register(imoveisRoutes,{prefix:'imoveis'})