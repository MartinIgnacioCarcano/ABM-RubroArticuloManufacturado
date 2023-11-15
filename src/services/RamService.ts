import { useNavigate } from 'react-router-dom'
import { Ram } from "../types/RAM";
import { toast } from 'react-toastify';

const BASE_URL = 'http://localhost:8080/api/v1';

export const RamService = {

    getRams: async (): Promise<Ram[]> => {
        try {
            const response = await fetch(`${BASE_URL}/RubroArticuloManufacturado/paged?page=0&size=20&sort=id,asc`, {
                method: "GET",
                headers:
                {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            return data;
        } catch {
            const Navigate = useNavigate();
            toast.error('No tienes permisos para acceder a esta pagina');
            Navigate('/login');
            throw new Error('Inicio de sesion fallido');
        }
    },

    getRam: async (id: number): Promise<Ram> => {

        const response = await fetch(`${BASE_URL}/RubroArticuloManufacturado/${id}`, {
            method: "GET",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
        const data = await response.json();
        return data;

    },

    createRam: async (Ram: Ram): Promise<Ram> => {

        const response = await fetch(`${BASE_URL}/RubroArticuloManufacturado`, {
            method: "POST",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Ram)
        });

        const data = await response.json();
        return data;

    },

    updateRam: async (id: number, Ram: Ram): Promise<Ram> => {

        const response = await fetch(`${BASE_URL}/RubroArticuloManufacturado/${id}`, {
            method: "PUT",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Ram)
        });

        const data = await response.json();
        return data;
    },

    deleteRam: async (id: number): Promise<void> => {
        await fetch(`${BASE_URL}/RubroArticuloManufacturado/${id}`, {
            method: "DELETE",
            headers:
            {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
        });
    }
}
