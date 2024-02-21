import React, {useEffect, useState} from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pizza404 from "../assets/pizza404.json"
import Pagination from "../components/Pagination/Pagination";
import {useSelector} from 'react-redux'
import axios from "axios";

const Main = () => {

    //redux toolkit logic
    const categoryId = useSelector((state) => state.filterSlice.categoryId)
    const sortType = useSelector((state) => state.filterSlice.sortType)
    const searchValue = useSelector((state) => state.filterSlice.searchValue)

    //pizzas data and loading status
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    //pagination
    const page = useSelector((state) => state.filterSlice.currentPage)
    const rowsPerPage = 8;
    const [itemsCount, setItemsCount] = useState(0)

    //vars for queries
    const categoryProp = categoryId > 0 ? `&category=${categoryId}` : ''
    const sortProp = `&sortBy=${sortType.type}`
    const orderProp = `&order=${sortType.order}`
    const pageLimitProp = `&p=${page}&l=${rowsPerPage}`
    const searchQueryProp = searchValue !== '' ? `&title=${searchValue}` : ''

    //сколько всего пицц в запросе, без учета пагинации
    useEffect(
        () => {
            axios.get(`https://65d099daab7beba3d5e36950.mockapi.io/pizzas?` + categoryProp + searchQueryProp)
                .then((res) => {
                    if (res.status === 200 && res.data) {
                        console.log('с заданной категорий и поисковым запросом: ' + res.data.length + ' пицц')
                        setItemsCount(res.data.length)
                    }
                })
                .catch((err) => alert(err.response.data))
        }, [categoryId, searchValue]
    )


    useEffect(() => {
            setIsLoading(true)
            axios.get(
                `https://65d099daab7beba3d5e36950.mockapi.io/pizzas?`
                + pageLimitProp
                + searchQueryProp
                + categoryProp
                + sortProp
                + orderProp
            )
                .then((res) => {
                    if (res.status === 200 && res.data) {
                        console.log(`Страница: ${page}, показано пицц: ${res.data.length} из ${itemsCount}`)
                        setItems(res.data)
                        setIsLoading(false)
                    } else {
                        setItems([Pizza404])
                        setIsLoading(false)
                    }
                })
                .catch((err) => alert(err.response.data))
        }, [categoryId, sortType, page, searchValue]
    )


    const pizzas = items.map(pizza => (<PizzaBlock {...pizza} />))
    const skeletonPizzas = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i}/>)


    return (
        <div className='container'>
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeletonPizzas
                    : pizzas
                }
            </div>
            <Pagination
                items={items} //ето например лимитные 8 пицц на 3 странице
                itemsCount={itemsCount}
                rowsPerPage={rowsPerPage}
            />

        </div>
    );
}

export default Main;