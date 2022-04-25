import React, {useContext} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import { privateRoutes } from '../routes';
import { publicRoutes } from '../routes';
import { CHAT_ROUTE } from '../utils/consts';
import { LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from "react-firebase-hooks/auth";
import {Context} from "../index";

const AppRouter = () => {
    const {auth} = useContext(Context)
    const [user] = useAuthState(auth)

  return user ?
        (
            <Routes>
                {privateRoutes.map(({path, Component}) => 
                    <Route path={path} element={<Component />}/>
                )}
                <Route path='*' element={<Navigate to={CHAT_ROUTE} replace />}/>
            </Routes>
        )
        :
        (
            <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route path={path} element={<Component />}/>
            )}
            <Route path='*' element={<Navigate to={LOGIN_ROUTE} replace />}/>
        </Routes>
        )
}

export default AppRouter