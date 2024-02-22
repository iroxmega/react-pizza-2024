import {Link} from "react-router-dom";
import Searchbar from "./Searchbar/Searchbar";
import HeaderCart from "./HeaderCart";

const Header = () => {
    return (
        <div className="header">
            <div className="container">
                <Link to='/'>
                    <div className="header__logo">
                        <img width="38" src="./img/pizza-logo.svg" alt="Pizza logo"/>
                        <div>
                            <h1>React Pizza</h1>
                            <p>самая вкусная пицца во вселенной</p>
                        </div>
                    </div>
                </Link>
                <Searchbar />
                <HeaderCart />
            </div>
        </div>
    )
}

export default Header