import { Ram } from "../../types/RAM";

import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";

//Dependencias para validar los formularios
import * as Yup from "yup";
import { useFormik } from "formik";

import { RamService } from "../../services/RamService";


//Recibe parametros como props para que se renderice, su titulo y según qué operación queremos realizar.
type RamModalProps = {
    show: boolean;
    onHide: () => void;
    title: string;
    modalType: ModalType;
    rm: Ram;
    refreshData: React.Dispatch<React.SetStateAction<boolean>>;

};

const RamModal = ({ show, onHide, title, rm, modalType, refreshData }: RamModalProps) => { //rm es una abreviacion de rubroArticuloManufacturado 

    //CREATE-UPDATE función handleSaveUpdate 
    const handleSaveUpdate = async (rm: Ram) => {
        try {
            const isNew = rm.id === 0;
            if (isNew) {
                await RamService.createRam(rm);
            } else {
                await RamService.updateRam(rm.id, rm);
            }
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
        }

    };


    //Función handleDelete (DELETE)
    const handleDelete = async () => {
        try {
            await RamService.deleteRam(rm.id);
            onHide();
            refreshData(prevState => !prevState);
        } catch (error) {
            console.error(error);
        }

    }

    //YUP - Esquema de validación
    const validationSchema = () => {
        return Yup.object().shape({
            id: Yup.number().integer().min(0),
            denominacion: Yup.string().required('La denominacion es requerido')
        });
    };


    //Formik -  Utiliza el esquema de validación de YUP y obtiene un formulario dinámico que
    // bloquea el formulario en caso de haber errores.
    const formik = useFormik({
        initialValues: rm,
        validationSchema: validationSchema(),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (obj: Ram) => handleSaveUpdate(obj),
    });



    return (
        <>

            {modalType === ModalType.DELETE ? (
                <>

                    <Modal show={show} onHide={onHide} centered backdrop="static">

                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p> ¿Está seguro que desea eliminar al rubro(AM)
                                <br /> <strong> {rm.denominacion} </strong> ?
                            </p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={onHide}>
                                Cancelar
                            </Button>

                            <Button variant="danger" onClick={handleDelete}>
                                Borrar
                            </Button>
                        </Modal.Footer>

                    </Modal>
                </>
            ) : (

                <>
                    <Modal show={show} onHide={onHide} centered backdrop="static" className="modal-xl">

                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form onSubmit={formik.handleSubmit}>

                                {/*DENOMINACION*/}
                                <Form.Group controlId="formDenominacion">
                                    <Form.Label>Denominacion</Form.Label>
                                    <Form.Control
                                        name="denominacion"
                                        type="text"
                                        value={formik.values.denominacion || ''}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        isInvalid={Boolean(formik.errors.denominacion &&
                                            formik.touched.denominacion)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {formik.errors.denominacion}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Modal.Footer className="mt-4">

                                    <Button variant="secondary" onClick={onHide}>
                                        Cancelar
                                    </Button>
                                    <Button variant="primary" type="submit" disabled={!formik.isValid}>
                                        Guardar
                                    </Button>

                                </Modal.Footer>
                            </Form>


                        </Modal.Body>

                    </Modal>

                </>
            )}
        </>
    )

}

export default RamModal;