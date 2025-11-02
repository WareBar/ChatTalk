import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Rooms } from "../pages/Rooms";
import { Conversation } from "../pages/Conversation";
import { Notifications } from "../pages/Notifications";
import { PageNotFound } from "../components/PageNotFound";


import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

import AppLayout from "../Layout/AppLayout";


import ProtectedAuthRoute from "./ProtectedAuthRoute";
import PrivateRoute from "./PrivateRoute";



export const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="" element={<AppLayout/>}>
                <Route index element={<Home/>}/>
                <Route path="about" element={<About/>}/>

                <Route element={<PrivateRoute/>}>
                    <Route path="rooms" element={<Rooms/>}/>
                    <Route path="conversation/:reference_code/:room_name" element={<Conversation/>}/>
                    <Route path="notifications" element={<Notifications/>}/>
                </Route>

                
                {/* for authentication */}
                <Route element={<ProtectedAuthRoute/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </>
    )
)