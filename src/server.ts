import fastify from "fastify";
import fastifyCors from "@fastify/cors";
<<<<<<< HEAD
import { routes } from "./routes/costumerRoutes";
=======
import { routes } from "./routes/routes";
>>>>>>> c3bf14305b63924b0f114f38849c7d5ac4cf8a44


const app = fastify()
app.register(fastifyCors)
app.register(routes)

app.listen({port: 3333}, (err, address) => {
    if (err) {
        console.log(err);
    }

    console.log(`Server running on ${address}`)
})