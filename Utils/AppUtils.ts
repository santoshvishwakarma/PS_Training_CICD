
export class AppUtils {
    private apiRequest: any;

    constructor(apiRequest: any) {
        this.apiRequest = apiRequest;
    }

    async getToken(): Promise<string> {

        const response = await this.apiRequest.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', {
            data: {
                email: 'qauser5@yopmail.com',
                password: 'Test@12345'
            }
        });
        const data = await response.json();
        return data.token;
    }

    async bookEvent(): Promise<any> {
        let response: any = {};
        response.token = await this.getToken();
        const apiResponse = await this.apiRequest.post('https://api.eventhub.rahulshettyacademy.com/api/bookings', {
            data: { "customerName": "Test User", "customerEmail": "userqa5@yopmail.com", "customerPhone": "2344322394", "quantity": 1, "eventId": 3 },
            headers: {
                Authorization: `Bearer ${response.token}`
            }
        });
        console.log(await apiResponse.json());
        response.apiResponse = apiResponse;
        return response;
    }
}