import { useNavigate } from 'react-router-dom'
import './HeaderStyles.css'; // Importa el archivo CSS
import useIsLoggedIn from '../../hooks/useIsLoggedIn';
import { useEffect } from 'react';

function Header() {

    const Navigate = useNavigate();
    const isLoggedIn = useIsLoggedIn();

    const rutaChekeo = () => {
        if (isLoggedIn) {
            Navigate('/admin')
        } else {
            Navigate('/login')
        }
    }

    useEffect(() => {
        if(isLoggedIn){
            var boton = document.getElementById('cerrarSesion');
            if (boton) {
                boton.style.display = 'block'
            }
        }else{
            var boton = document.getElementById('cerrarSesion');
            if (boton) {
                boton.style.display = 'none'
            }
        }
    }, [isLoggedIn]);

    const logUt = () =>{
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        Navigate('/');
    }

    return (
        <>
            <nav>
                <img src="https://i.imgur.com/BMj5BOg.png" alt="" style={{ height: '100px' }} onClick={() => Navigate('/')} />
                <div id="navdiv">
                    <button style={{ display: 'block' }} onClick={() => Navigate('/')}>Home</button>
                    <div id="divbuscador">
                        <input
                            id="inputbuscar"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Buscar"
                        />
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 25 24"
                                fill="none"
                            >
                                <g clip-path="url(#clip0_855_41)">
                                    <path
                                        d="M15.8594 14H15.0694L14.7894 13.73C15.7694 12.59 16.3594 11.11 16.3594 9.5C16.3594 5.91 13.4494 3 9.85938 3C6.26938 3 3.35938 5.91 3.35938 9.5C3.35938 13.09 6.26938 16 9.85938 16C11.4694 16 12.9494 15.41 14.0894 14.43L14.3594 14.71V15.5L19.3594 20.49L20.8494 19L15.8594 14ZM9.85938 14C7.36938 14 5.35938 11.99 5.35938 9.5C5.35938 7.01 7.36938 5 9.85938 5C12.3494 5 14.3594 7.01 14.3594 9.5C14.3594 11.99 12.3494 14 9.85938 14Z"
                                        fill="black" fill-opacity="0.75" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_855_41">
                                        <rect width="24" height="24" fill="white" transform="translate(0.359375)" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                    <div className='logeable'>
                        <button style={{ display: 'block' }} id="IniciarSesion" onClick={rutaChekeo}>
                            <div>
                                {/*uso el hook is logged in para poder cambiar entre admin e iniciar sesion*/}
                                {isLoggedIn ? (
                                    <p>Administrador</p>
                                ) : (
                                    <p>Iniciar Sesión</p>
                                )}
                            </div>
                        </button>
                        {isLoggedIn ? (
                            <button id='cerrarSesion' onClick={logUt}>
                                <p>Cerrar Sesión</p>
                            </button>
                        ) : (
                            <></>
                        )}

                    </div>
                </div>

                <div className="menu">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="72"
                        height="48"
                        viewBox="0 0 72 48"
                        fill="none"
                    >
                        <path d="M0 48H72V40H0V48ZM0 28H72V20H0V28ZM0 0V8H72V0H0Z" fill="#FFD23F" />
                    </svg>
                </div>

            </nav>
        </>
    );
}

export default Header;