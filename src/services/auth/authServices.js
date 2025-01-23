import { getConstants } from "@/utils/constans";
const { apiUrl } = getConstants();
export class authServices {
    
    async authLogin(email, password, login) {


        try {
            const response = await fetch(`${apiUrl}/auth`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200) {
                const { data, jwt } = await response.json();
                login(jwt, data);
                return response;
            } else {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
