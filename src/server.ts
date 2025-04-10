import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { routes } from "./routes/costumerRoutes";


const app = fastify()
app.register(fastifyCors)
app.register(routes)

app.listen({port: 3333}, (err, address) => {
    if (err) {
        console.log(err);
    }

    console.log(`Server running on ${address}`)
})