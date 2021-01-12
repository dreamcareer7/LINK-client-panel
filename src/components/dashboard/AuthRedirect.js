import React, {useEffect} from 'react';
import {Redirect, Route, useLocation} from "react-router-dom";
import {saveAuthTokenLocalStorage} from "../../helpers/LocalStorageHelper";

function AuthRedirect({...options }) {
    const {search} = useLocation();
    useEffect(()=>{
        const authToken = new URLSearchParams(search).get('token');
        saveAuthTokenLocalStorage({authToken})
    },[]);
    return (
        <Route {...options}>
            {' '}
            <Redirect to="/home" />
        </Route>
    );
}

export default AuthRedirect;