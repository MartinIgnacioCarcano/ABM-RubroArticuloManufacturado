import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./components/Navbar/Header"
import AppRoutes from "./routes/AppRoutes"
import Footer from "./components/Footer/Footer"

import Loader from './components/Loader/Loader';
import { Suspense } from 'react';
import { Container } from 'react-bootstrap';

//Notificaciones al usuario.
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css'


function App () {
  return (
    <>
      <ToastContainer/>
      <Router>
        <Header/>
          <Container style={{minHeight: '90vh', minWidth: '100%', padding: '0'}}>
            <Suspense fallback={<Loader/>}>
              <AppRoutes/>
            </Suspense>
          </Container>
        <Footer/>
      </Router>
    </>
    )
}

export default App