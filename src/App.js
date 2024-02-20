import React from "react";
import {Route, Routes} from "react-router-dom";
import './App.css';
import './scss/app.scss';
import Header from "./components/Header";
import NotFound from "./components/NotFoundBlock";
import Main from "./pages/Main";

import Cart from "./pages/Cart";
import {useState} from "react";

export const SearchContext = React.createContext('')

function App() {
    const [searchValue, setSearchValue] = useState('')


    return (
        <div className="wrapper">
            <SearchContext.Provider value={{ searchValue, setSearchValue }} >
                <Header />
                <div className="content">
                    <Routes>
                        <Route path='/' element={<Main/>}/>
                        <Route path='/cart' element={<Cart/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>

                </div>
            </SearchContext.Provider>
        </div>
    );
}

export default App;
