export type CustomError = {
    status: number;
    message: string;
}

export function createCustomError(status: number, message: string): CustomError {
    return { status, message };
}