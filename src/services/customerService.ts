import { prismaClient } from "../config/prisma";
import { Customer } from "../model/customer.model";
import { CustomerResponseDTO } from "../dtos/CustomerResponseDTO";
import bcrypt from "bcrypt";
import { CustomerUpdateDTO } from "../dtos/CustomerUpdateDTO";
import { createCustomError } from "../exceptions/customException";
import { validatePassoword, checkEmailChange, checkEmailExist } from "../utils/validations";

export class CustomerService {

    private static instance: CustomerService
    private constructor() {}

    public static getInstance(): CustomerService {
        if (!CustomerService.instance) {
          CustomerService.instance = new CustomerService();
        }
        return CustomerService.instance;
    }

    async create({name, email, password, age}: Customer): Promise<Customer>{

        validatePassoword(password)

        await checkEmailExist(email)

        const hashedPassword = await bcrypt.hash(password, 10)

        const customer = await prismaClient.customer.create({
            data: {
                name, 
                email,
                password: hashedPassword, 
                age,
                status: true
            }
        })

        return customer
    }
    
    async getAll(): Promise<CustomerResponseDTO[]> {
        const customers =  await prismaClient.customer.findMany({
            where: { status: true },
            select: {
                id: true,
                name: true,
                email: true,
                age: true
            }
        })

        return customers
    }

    async getCustomer(id: string): Promise<CustomerResponseDTO | null> {
        const customer = await prismaClient.customer.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                age: true
            },
            where: { 
                id,
                status: true
            }
        })

        if (!customer) {
            throw createCustomError(404, "User not found!");
        }

        return customer as CustomerResponseDTO;
    }

    async updateCustomer(id: string, data: CustomerUpdateDTO): Promise<CustomerResponseDTO> {
        const customer = await prismaClient.customer.findUnique({
            where: { id }
        })

        if (!customer) {
            throw createCustomError(404, "User not found!");
        }

        if (data.email){
            await checkEmailChange(data.email, customer.email)
        }

        const updatedData: CustomerUpdateDTO = data


        if (data.password != null && data.currentPassword != null){
            const isValid = await bcrypt.compare(data.currentPassword, customer.password)

            if (!isValid){
                throw createCustomError(401, "The actual password is incorrect!")
            }
            
            updatedData.password = await bcrypt.hash(data.password, 10)

            delete updatedData.currentPassword


        } else if (data.password && !data.currentPassword || data.currentPassword && !data.password){
            throw createCustomError(400, "Current password or new password is required to update password!");
        }

        const updatedCustomer = await prismaClient.customer.update({
            where: { id },
            data: updatedData
        });

        const {password, ...customerResponse } = updatedCustomer;
        
        return customerResponse as CustomerResponseDTO;
    }

    async deleteCustomer(id: string): Promise<CustomerResponseDTO> {
        const customer = await prismaClient.customer.update({
            where: { id },
            data: {
                status: false
            }
        })

        if (!customer){
            throw createCustomError(404, "User not found!");
        }

        const {password, ...customerResponse} = customer

        return customerResponse as CustomerResponseDTO 
    }
}