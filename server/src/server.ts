import fastify from "fastify";
import cors from "@fastify/cors"
import { appRoutes } from "./lib/routes";

const app = fastify()

app.register(cors)
app.register(appRoutes)

app.listen({
    port: 2812,
}).then(() => {
    console.log('HTTP Server running!')
})