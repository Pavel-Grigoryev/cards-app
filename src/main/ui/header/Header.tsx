import React from 'react';
import {Link} from "react-router-dom";
import {PATH} from "../routes/routes";

export const Header = () => {
    return (
        <header>
           <h1>Header</h1>
           <Link to={PATH.TEST_PAGE}> TestPage </Link>
        </header>
    );
};

