import React from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';
import './scss/app.scss';

import Header from "./components/Header";
import NotFound from "./components/NotFoundBlock/NotFoundBlock";

import Main from "./pages/Main";
import Cart from "./pages/Cart";
import FullPizza from "./components/FullPizza";

const App = () => {

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <Routes>
                    <Route path='/pizza/:id' element={<FullPizza />} />
                    <Route path='/' element={<Main/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
