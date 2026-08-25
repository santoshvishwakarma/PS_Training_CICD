import * as fs from "node:fs";
import * as path from "node:path";

interface TransactionData {
    transactionId: string;
    timestamp: string;
    version: number;
    isActive: boolean;
    metadata: {
        environment: string;
        serverNode: string;
        apiGateway: {
            provider: string;
            routingRule: string;
            timeoutMs: number;
        };
        tags: string[];
    };
    customer: {
        id: string;
        name: string;
        email: string;
        vipStatus: boolean;
        accountCreated: string;
        contact: {
            primaryPhone: string;
            secondaryPhone: string | null;
            preferences: {
                allowMarketingEmails: boolean;
                smsNotifications: boolean;
                preferredLanguage: string;
            };
        };
        addresses: Array<{
            type: string;
            isDefault: boolean;
            street: string;
            suite: string;
            city: string;
            state: string;
            postalCode: string;
            coordinates: {
                latitude: number;
                longitude: number;
            };
        }>;
    };
    cart: {
        id: string;
        currency: string;
        summary: {
            subtotal: number;
            taxTotal: number;
            shippingCost: number;
            discountTotal: number;
            grandTotal: number;
        };
        items: Array<{
            productId: string;
            sku: string;
            name: string;
            quantity: number;
            unitPrice: number;
            isTaxable: boolean;
            appliedDiscounts: Array<{
                code: string;
                type: string;
                value: number;
                amountSaved: number;
            }>;
        }>;
    };
    security: {
        encryption: string;
        signature: string;
        authorizedRoles: string[];
    };
}

export class JsonReader {
    public readJsonFile<T>(filePath: string): T {
        const fileContent = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
        return JSON.parse(fileContent) as T;
    }
}

const reader = new JsonReader();
const filePath = path.join(__dirname, "\\TestData\\transactionData.json");
const transaction = reader.readJsonFile<TransactionData>(filePath);

console.log("Transaction:", transaction.transactionId);
console.log("API gateway:", transaction.metadata.apiGateway);
console.log("Customer contact preferences:", transaction.customer.contact.preferences);
console.log("Billing address:", transaction.customer.addresses[0]);
console.log("Cart summary:", transaction.cart.summary);
console.log("First item:", transaction.cart.items[0]);
console.log("First item discount:", transaction.cart.items[0].appliedDiscounts[0]);
console.log("Security roles:", transaction.security.authorizedRoles);

