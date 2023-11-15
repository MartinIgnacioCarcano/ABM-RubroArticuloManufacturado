import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080';

export const LoginService = {


    login: async (email: String, contra: String): Promise<String> => {

        try {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        'username': email,
                        'password': contra
                    })
            });
            const data = await response.json();
            console.log(data);

            if (!response.ok) {
            }

            const { token } = data;
            const { rol } = data;

            localStorage.setItem('rol', rol);

            console.log(token);

            localStorage.setItem('token', token);

            return 'true';

        } catch {
            toast.error('Credenciales incorrectas');
            throw new Error('Inicio de sesion fallido');
            return 'false';
        }
    },


}