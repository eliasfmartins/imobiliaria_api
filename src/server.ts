import { app } from "./app";
import { env } from "./env";
import { imoveisRoutes } from "./routes/imoveis";

app.listen({
    host:`0.0.0.0`,
    port: env.PORT
}).then(()=>{
    console.log(`🔱 HTTP Server Running! http://localhost:3333`)
    
})

app.register(imoveisRoutes)