import { useState } from 'react';
import { LoginService } from '../../services/LoginService';
import './Login.css';
import { useNavigate } from 'react-router-dom'



const FormLogin = () => {
    const Navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [contra, setContra] = useState('');
    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleContra = (event: React.ChangeEvent<HTMLInputElement>) => setContra(event.target.value);

    const login = async () => {
        var respuesta: String = await LoginService.login(email, contra);
        if (respuesta == "true"){
            Navigate('/');
            var cerrarSesion = document.getElementById('cerrarSesion');
            if(cerrarSesion){
                cerrarSesion.style.display = 'block';
            }
        }
        
        
    };

    return (
        <>
            <div className='pantallaLogin'>
                <div className='formLogin'>
                    <h1>Bienvenido</h1>
                    <input className='inputLogin' type="text" placeholder='Ingrese su email' onChange={handleEmail} />
                    <input className='inputLogin' type="password" placeholder='Ingrese su contraseña' onChange={handleContra} />
                    <a href="">¿Olvidaste tu contraseña?</a>
                    <button id='iniciarSesion' onClick={login}>Iniciar Sesión</button>
                </div>
            </div>
        </>
    );
};

export default FormLogin;