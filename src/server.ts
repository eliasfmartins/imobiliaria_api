import { app } from "./app";
import { env } from "./env";

app.listen({
    host:`0.0.0.0`,
    port: env.PORT
}).then(()=>{
    console.log(`🔱 HTTP Server Running! http://localhost:3333`)
    
})
app.get('/', (request, reply)=>{
    return reply.send('Deu certo haha').code(200)
})