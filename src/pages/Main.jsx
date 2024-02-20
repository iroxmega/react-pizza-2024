import React, {useContext, useEffect, useState} from 'react';

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock";
import Pizza404 from "../assets/pizza404.json"
import Pagination from "../components/Pagination/Pagination";
import {SearchContext} from "../App";
import { useSelector } from 'react-redux'

const Main = () => {

    //redux toolkit logic
    const categoryId = useSelector((state) => state.filterSlice.categoryId)
    const sortType = useSelector((state) => state.filterSlice.sortType)

    const {searchValue} = useContext(SearchContext)

    //pizzas data and loading status
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    //backend props
    // const [categoryId, setCategoryId] = useState(0)
    // const [sortType, setSortType] = useState({
    //     name: 'популярности (>)',
    //     type: 'rating',
    //     order: 'desc'
    // })

    //pagination
    const [page, setPage] = useState(1);
    const rowsPerPage = 8;
    const [itemsCount, setItemsCount] = useState(0)


    //vars for backend queries
    const categoryProp = categoryId > 0 ? `&category=${categoryId}` : ''
    const sortProp = `&sortBy=${sortType.type}`
    const orderProp = `&order=${sortType.order}`
    const pageLimitProp = `&p=${page}&l=${rowsPerPage}`

    useEffect(
        () => {
            fetch(`https://65d099daab7beba3d5e36950.mockapi.io/pizzas?` + categoryProp)
                .then(res => res.json())
                .then(json => setItemsCount(Math.ceil(json.length / rowsPerPage)))
        }, [categoryId]
    )


    useEffect(() => {
            setIsLoading(true)
            fetch(
                `https://65d099daab7beba3d5e36950.mockapi.io/pizzas?`
                + pageLimitProp
                + categoryProp
                + sortProp
                + orderProp
            )
                .then((res) =>
                    res.status === 200 ? res.json() : [Pizza404])
                .then((arr) => {
                    setItems(arr)
                    setIsLoading(false)
                })


        }, [categoryId, sortType, page]
    )

    const filteredPizzas = items.filter(
        value => value.title.toLowerCase().includes(searchValue.toLowerCase()))

    const pizzas = filteredPizzas.length !== 0
        ? filteredPizzas.map(pizza => (<PizzaBlock {...pizza} />))
        : <PizzaBlock {...Pizza404} />
    const skeletonPizzas = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i}/>)


    const handleNextPageClick = () => {
        const next = page + 1;
        const total = items.length !== 0 ? itemsCount : page;

        setPage(next <= total ? next : page);
    }

    const handlePrevPageClick = () => {
        const prev = page - 1;
        setPage(prev > 0 ? prev : page);
    }

    // const categoryChangeHandler = (id) => {
    //     setPage(1)
    //     setCategoryId(id)
    // }

    // const sortChangeHandler = (nam, type, order) => {
    //     setPage(1)
    //     setSortType({name: nam, type: type, order: order})
    // }

    return (
        <div className='container'>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? skeletonPizzas
                    : pizzas
                }
            </div>

            <Pagination
                onNextPageClick={handleNextPageClick}
                onPrevPageClick={handlePrevPageClick}
                disable={{
                    left: page === 1,
                    right: page === itemsCount,
                }}
                nav={{current: page, total: itemsCount}}
            />

        </div>
    );
}

export default Main;