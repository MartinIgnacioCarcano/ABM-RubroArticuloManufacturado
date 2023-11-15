import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import { Ram } from "../pages/Ram"
import  PageLogin  from "../pages/PageLogin"

import * as React from 'react';


const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}> </Route>
        <Route path="/admin" element={<Ram/>}></Route>
        <Route path="/login" element={<PageLogin/>}></Route>
    </Routes>
  )
}

export default AppRoutes