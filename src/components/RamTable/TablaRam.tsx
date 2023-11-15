import { useEffect, useState } from "react"
import { Ram } from "../../types/RAM"
import { RamService } from "../../services/RamService";

import { Table } from "react-bootstrap";
import Loader from "../Loader/Loader";


import { ModalType } from "../../types/ModalType";

import RamModal from "../RamModal/RamModal";
import { EditButton } from "../EditButton/EditButton";
import { DeleteButton } from "../DeleteButton/DeleteButton";
import './TablaRam.css'
import { useNavigate } from "react-router-dom";


const TablaRams = () => {
    //Navigate para poder movernos entre las paginas
    const Navigate = useNavigate();

    //Variable que va a contener los datos recibidos por la API
    const [rams, setRams] = useState<Ram[]>([]);
    const [ramsLocal, setRamsLocal] = useState<Ram[]>([]);

    //Variable que muestra el componente Loader hasta que se reciban los datos de la API
    const [isLoading, setIsLoading] = useState(true);

    //Variable que va actualizar los datos de la tabla luego de cada operacion exitosa
    const [refreshData, setRefreshData] = useState(false);

    //Este hook se va a ejecutar cada vez que se renderice el componente o refreshData cambie de estado
    useEffect(() => {
        // Llamamos a la función para obtener todos los Rubros(AM) declarado en el service
        const fetchRams = async () => {
            try {
                const response = await RamService.getRams();

                // Verifica que la respuesta tenga una propiedad 'content'
                if ('content' in response) {
                    const contenido = response.content as Ram[];//le indico que tipo de content va a ser
                    setRamsLocal(contenido);
                    setRams(contenido);
                    setIsLoading(false);
                } else {
                    console.error('La propiedad "content" no está presente en la respuesta del servicio.');
                    // Manejo de errores o lógica adicional según sea necesario
                }
            } catch (error) {
                console.error('Error al obtener las Rams:', error);
                // Manejo de errores o lógica adicional según sea necesario
            }
        };

        fetchRams();
    }, [refreshData]);

    //Test, este log está modificado para que muestre los datos de una manera más legible
    //console.log(JSON.stringify(Rams, null, 2));

    //Se inicializa un Rurbos(AM) vacio cuando vayamos a crear uno nuevo, para evitar "undefined"
    const initializeNewRam = (): Ram => {
        return {
            id: 0,
            denominacion: "",
            fechaAlta: new Date(""),
            fechaModificacion: new Date(""),
            fechaBaja: new Date("")
        };
    };

    //rubro seleccionado que se va a pasar como prop al Modal
    const [ram, setRam] = useState<Ram>(initializeNewRam);

    //Manejo de Modal
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
    const [title, setTitle] = useState("");

    //Logica de Modal
    const handleClick = (newTitle: string, rm: Ram, modal: ModalType) => { //rm es RAm pero mas abreviado
        setTitle(newTitle);
        setModalType(modal)
        setRam(rm);
        setShowModal(true);
    };


    const [textoEscrito, setTextoEscrito] = useState('');

    useEffect(() => {
        const resultadoFiltrado = rams.filter(
            (rm) => rm.denominacion.toLocaleLowerCase().includes(textoEscrito.toLocaleLowerCase()))
        setRamsLocal(resultadoFiltrado)
    }, [textoEscrito]);


    const handleTextoEscrito = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextoEscrito(event.target.value);
    };

    return (
        <>
            <div className="BotonesRams">
                <div id="titulo">
                    <h1>Rubros (Articulo Manufacturado) Registrados</h1>
                </div>
                <div id="divbuscador">
                    <input
                        id="inputbuscar"
                        type="search"
                        placeholder="Buscar"
                        aria-label="Buscar"
                        value={textoEscrito}
                        onChange={handleTextoEscrito}
                    />
                    <button onClick={() => setTextoEscrito}>
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
                <div id="botones">
                    <button onClick={() => handleClick("Nuevo Rubro",
                        initializeNewRam(), ModalType.CREATE)}>
                        Crear nuevo rubro
                    </button>

                </div>
            </div>
            <div className="m-3">
                {isLoading ? <Loader /> : (
                    <Table id="tablaRams">
                        <thead>
                            <tr>
                                <th> Denominación </th>
                                <th> Modificar </th>
                                <th> Eliminar </th>
                            </tr>
                        </thead>
                        <tbody>
                            {ramsLocal.map(ram => (
                                <tr key={ram.id}>

                                    <td> {ram.denominacion} </td>
                                    <td> <EditButton onClick={() => handleClick("Editar Rubro", ram, ModalType.UPDATE)} /> </td>
                                    <td> <DeleteButton onClick={() => handleClick("Borrar Rubro", ram, ModalType.DELETE)} /> </td>

                                </tr>
                            ))}
                        </tbody>

                    </Table>

                )}

                {showModal && (
                    <RamModal
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        title={title}
                        modalType={modalType}
                        rm={ram}
                        refreshData={setRefreshData}
                    />
                )}


            </div>
            <div className="BtnVolver">
                <button id="volver" onClick={() => Navigate('/')}>VOLVER</button>
            </div>
        </>
    )
}

export default TablaRams;
