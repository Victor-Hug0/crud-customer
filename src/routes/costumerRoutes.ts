import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CustomerController } from "../controllers/costumerController";
import { CustomerService } from "../services/customerService";
import { CustomerUpdateDTO } from "../dtos/CustomerUpdateDTO";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    const customerController = new CustomerController(CustomerService.getInstance()) 

    fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return customerController.create(request, reply)
    })

    fastify.get("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
        return customerController.getAll(reply)
    })

    fastify.get("/customer/:id", async (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) => {
        return customerController.getCustomer(request, reply)
    })

    fastify.put("/customer/:id", async (request: FastifyRequest<{Params: {id: string}, Body: CustomerUpdateDTO}>, reply: FastifyReply) => {
        return customerController.updateCustomer(request, reply)
    })

    fastify.delete("/customer/:id", async (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) => {
        return customerController.deleteCustomer(request, reply)
    })
}