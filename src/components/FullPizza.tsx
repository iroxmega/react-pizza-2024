import React, {useEffect, useState} from 'react';
import { Button, Modal } from 'antd';
import {Link, useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import PizzaBlock from "./PizzaBlock/PizzaBlock";

const FullPizza: React.FC = () => {

    const [pizza, setPizza] = useState<{
        id: string,
        title: string,
        price: number,
        imageUrl: string,
        types:number[],
        sizes:number[]
    }>()
    const [modal2Open, setModal2Open] = useState(false);

    const {id} = useParams<string>()
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchPizza() {
            try {
                const {data} = await axios.get('https://65d099daab7beba3d5e36950.mockapi.io/pizzas/' + id)
                setPizza(data)
            } catch (e) {
                alert('ошибка при получении пиццы!')
                navigate('/')
            }
        }

        fetchPizza()
    }, [])

    if (!pizza) {
        return <h2>Ooopsie....</h2>
    }

    return (
        <Link to={`pizza/${id}`}>
            <PizzaBlock id={pizza.id} title={pizza.title} price={pizza.price} imageUrl={pizza.imageUrl} types={pizza.types} sizes={pizza.sizes} />
        </Link>

    )
};

export default FullPizza;