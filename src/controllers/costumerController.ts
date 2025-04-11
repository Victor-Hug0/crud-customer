import { CustomerService } from "../services/customerService";
import { FastifyRequest, FastifyReply } from "fastify";
import { CustomError } from "../exceptions/customException";
import { CustomerUpdateDTO } from "../dtos/CustomerUpdateDTO";

export class CustomerController {

    private customerService: CustomerService

    constructor(customerService: CustomerService) {
        this.customerService = CustomerService.getInstance();
    }

    async create(request: FastifyRequest, reply: FastifyReply){
        try{
            const { name, email, password, age } = request.body as {name: string, email: string, password: string, age: number};

            const customerService = this.customerService
            const customer = await customerService.create({name, email, password, age});
            reply.code(201).send(customer)
        }catch(error){
            if (typeof error === 'object' && error !== null) {
                const customError = error as CustomError;
                reply.code(customError.status).send({ message: customError.message });
              } else {
                reply.code(500).send({ message: "Internal Server Error" });
              }
        }
    }

    async getAll(reply: FastifyReply) {
        const customerService = this.customerService
        const customers = await customerService.getAll()

        reply.code(200).send(customers)
    }

    async getCustomer(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){
        try{
            const customerService = this.customerService
            const { id } = request.params
            const customer = await customerService.getCustomer(id)
            return reply.code(200).send(customer);
        }catch(error){
            if (typeof error === 'object' && error !== null) {
                const customError = error as CustomError;
                reply.code(customError.status).send({ message: customError.message });
            } else {
                reply.code(500).send({ message: "Internal Server Error" });
            }
        }
    }

    async updateCustomer(request: FastifyRequest<{Params: {id: string}, Body: CustomerUpdateDTO}>, reply: FastifyReply){
        try {
            const customerService = this.customerService
            const { id } = request.params
            const data = request.body

            if (Object.keys(data).length == 0){
                return reply.code(400).send({ message: "No data provided for update" });
            }

            const updatedCustomer = await customerService.updateCustomer(id, data);

            return reply.code(200).send(updatedCustomer);
        } catch(error) {
            if (typeof error === 'object' && error !== null) {
                const customError = error as CustomError;
                reply.code(customError.status).send({ message: customError.message });
            } else {
                reply.code(500).send({ message: "Internal Server Error" });
            }
        }
    }

    async deleteCustomer(request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply){
        try {
            const customerService = this.customerService;
            const { id } = request.params
            const deletedCustomer = await customerService.deleteCustomer(id)

            return reply.code(200).send(deletedCustomer)
        } catch(error){
            if (typeof error === 'object' && error !== null) {
                const customError = error as CustomError;
                reply.code(customError.status).send({ message: customError.message });
            } else {
                reply.code(500).send({ message: "Internal Server Error" });
            }
        }
    }
}