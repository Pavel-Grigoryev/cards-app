import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Layout} from "./layout/Layout";
import {PATH} from "./routes/routes";
import {Login} from "../../features/auth/login/Login";
import {Error404} from "./error404/Error404";
import {TestPage} from "./testPage/TestPage";

const App = () => (
    <div className="App">
        <Routes>
            <Route path={"/"} element={<Layout/>}>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.SIGN_UP} element={<h1>SignUp</h1>}/>
                <Route path={PATH.PROFILE} element={<h1>Profile</h1>}/>
                <Route path={PATH.PASSWORD_RECOVERY} element={<h1>Password recovery</h1>}/>
                <Route path={PATH.NEW_PASSWORD} element={<h1>New password</h1>}/>
                <Route path={PATH.NOT_FOUND} element={<Error404/>}/>
                <Route path={'*'} element={<Navigate to={PATH.NOT_FOUND}/>}/>
                <Route path={PATH.TEST_PAGE} element={<TestPage/>}/>
            </Route>
        </Routes>
    </div>
);

export default App;
