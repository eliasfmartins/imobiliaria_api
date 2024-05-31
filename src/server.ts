import { app } from "./app";

app.listen({
    host:`0.0.0.0`,
    port: 3333
}).then(()=>{
    console.log(`🔱 HTTP Server Running! http://localhost:3333`)
    
})
app.get('/', (request, reply)=>{
    return reply.send('Deu certo haha').code(200)
})