import { exec } from 'child_process';
import * as crypto from 'crypto';
import * as fs from 'fs';

// Hardcoded credentials - VULNERABILITY
const DB_PASSWORD = "admin123";
const API_KEY = "sk_live_12345abcdef";
const SECRET_TOKEN = "my-secret-token";

// Insecure crypto algorithm - VULNERABILITY
function encryptData(data: string) {
    const cipher = crypto.createCipher('des', 'weak-key');
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// SQL Injection vulnerability - VULNERABILITY
function getUserByUsername(username: string) {
    const query = "SELECT * FROM users WHERE username = '" + username + "'";
    console.log(query);
    return query;
}

// Command injection vulnerability - VULNERABILITY
function executeCommand(userInput: string) {
    exec('ls ' + userInput, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
        }
        console.log(stdout);
    });
}

// Path traversal vulnerability - VULNERABILITY
function readUserFile(filename: string) {
    const filePath = '/uploads/' + filename;
    return fs.readFileSync(filePath, 'utf8');
}

// Insecure random - VULNERABILITY
function generateToken() {
    return Math.random().toString(36).substring(2);
}

// Empty catch block - CODE SMELL
function riskyOperation() {
    try {
        JSON.parse('invalid json');
    } catch (e) {
        // Empty catch - swallows error
    }
}

// Unused variable - CODE SMELL
function calculateTotal() {
    const unusedVariable = 100;
    const price = 50;
    return price * 2;
}

// Password in plain text - VULNERABILITY
const users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'password123' }
];

// Eval usage - VULNERABILITY
function evaluateCode(code: string) {
    return eval(code);
}

// Weak regex - VULNERABILITY (ReDoS)
function validateEmail(email: string) {
    const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

// No error handling - CODE SMELL
async function fetchData(url: string) {
    const response = await fetch(url);
    return response.json();
}

// Cognitive complexity - CODE SMELL
function complexFunction(a: number, b: number, c: number) {
    if (a > 0) {
        if (b > 0) {
            if (c > 0) {
                for (let i = 0; i < a; i++) {
                    if (i % 2 === 0) {
                        for (let j = 0; j < b; j++) {
                            if (j % 2 === 0) {
                                console.log(i + j + c);
                            }
                        }
                    }
                }
            }
        }
    }
}

// Export to avoid unused warnings
export {
    DB_PASSWORD,
    API_KEY,
    encryptData,
    getUserByUsername,
    executeCommand,
    readUserFile,
    generateToken,
    riskyOperation,
    calculateTotal,
    evaluateCode,
    validateEmail,
    fetchData,
    complexFunction
};
