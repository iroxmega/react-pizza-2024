import React, {useContext, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem, selectCartData} from "../../redux/slices/cartSlice";
import {Link} from "react-router-dom";
// import {PizzaModalContext} from "../../pages/Main";

const typeNames = ['Тонкое', 'Традиционное']

export type PizzaProps = {
    id: string,
    title: string,
    price: number,
    imageUrl: string,
    types: number[],
    sizes: number[]
}

const PizzaBlock = ({id, title, price, imageUrl, types, sizes}: PizzaProps) => {
    // const {isOpen, setIsOpen} = useContext(PizzaModalContext)

    const dispatch = useDispatch()

    const [pizzaType, setPizzaType] = useState(0)
    const [pizzaSize, setPizzaSize] = useState(Math.min(...sizes))
    const [addedCount, setAddedCount] = useState(0)

    const {items} = useSelector(selectCartData)

    const typeProp = typeNames[pizzaType]

    const addPizzaHandler = () => {
        dispatch(addItem({id, title, price, imageUrl, typeProp, pizzaSize}))
    }
    useEffect(() => {
        const currentPizzaCount = items.find((obj: { id: string; typeProp: string; pizzaSize: number; }) =>
            obj.id === id
            && obj.typeProp === typeNames[pizzaType]
            && obj.pizzaSize === pizzaSize)
        setAddedCount(currentPizzaCount ? currentPizzaCount.count : 0)
    }, [pizzaType, pizzaSize, addPizzaHandler])


    return (

            <div className='pizza-block-wrapper'>
                <div className="pizza-block">
                    {/*<div onClick={() => setIsOpen(true)}>*/}
                        <img
                            className="pizza-block__image"
                            src={imageUrl}
                            alt="Pizza"
                        />
                        <h4 className="pizza-block__title">{title}</h4>
                    {/*</div>*/}

                    <div className="pizza-block__selector">
                        <ul>
                            {types.map(typeId => (
                                <li key={typeId}
                                    onClick={() => setPizzaType(typeId)}
                                    className={pizzaType === typeId || types.length === 1 ? 'active' : ''}
                                >
                                    {typeNames[typeId]}
                                </li>))}
                        </ul>
                        <ul>
                            {sizes.map((size, i) => (
                                <li key={i}
                                    onClick={() => setPizzaSize(size)}
                                    className={pizzaSize === size ? 'active' : ''}
                                >
                                    {size + ' см'}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">

                        <div className='pizza-block__price'>от {price} ₽</div>
                        <button onClick={addPizzaHandler} className="button button--outline button--add">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Добавить</span>
                            <i>{addedCount ? addedCount : 0}</i>
                        </button>
                    </div>
                </div>

            </div>


    )
}

export default PizzaBlock