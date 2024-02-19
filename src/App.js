import {Route, Routes} from "react-router-dom";
import './App.css';
import './scss/app.scss';
import Header from "./components/Header";
import NotFound from "./components/NotFoundBlock";
import Main from "./pages/Main";

import Cart from "./pages/Cart";
import {useState} from "react";


function App() {
    const [searchValue, setSearchValue] = useState('')

    return (
        <div className="wrapper">
            <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            <div className="content">
                <Routes>
                    <Route path='/' element={<Main searchValue={searchValue}/>}/>
                    <Route path='/cart' element={<Cart/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>

            </div>
        </div>
    );
}

export default App;
