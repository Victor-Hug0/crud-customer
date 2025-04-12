import { createCustomError } from "../exceptions/customException";
import { prismaClient } from "../config/prisma";

export function validatePassoword(password: string): void {
    if (password.length < 6){
        throw createCustomError(400, "Password must be at least 6 characters!")
    }
}

export async function checkEmailExist(email: string): Promise<void> {
    const existentEmail = await prismaClient.customer.findFirst({
        where: { email: email }
    });

    if (existentEmail) {
        throw createCustomError(409, "E-mail already exists!")
    }
}

export async function checkEmailChange(newEmail: string, currentEmail: string): Promise<void> {
    if (newEmail === currentEmail){
        throw createCustomError(409, "Email must be different from the current one!");
    }

    await checkEmailExist(newEmail)
}