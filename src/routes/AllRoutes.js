import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import SideBar from '../components/SideBar/SideBar';
// import VerifyReset from '../components/auth/VerifyReset';
import RequireAuth from '../components/auth/RequiredAuth';
import Landingpage from '../components/Landingpage/Landingpage';

function AllRoutes() {

    return (
        <BrowserRouter>
        <Routes className="main min-h-screen h-ful w-full">
            <Route path='/' >
            <Route index element={<Landingpage />} />
                <Route path='auth'>
                    <Route path='login'  element={<Login />} />
                    <Route path='register' element={<Register />} />
                </Route>
                <Route element={<RequireAuth />}>
                <Route path="/*" element={<SideBar />} />
                </Route>
                <Route path="*"
                    element={<h1 style={{ color: "red", margin: "50px" }}>
                        404 | PAGE NOT FOUND
                    </h1>
                    }
                />
            </Route>
        </Routes>
        </BrowserRouter>
    )
}

export default AllRoutes