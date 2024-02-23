import React, {useEffect, useRef} from 'react';

import Categories from "../components/Categories";
import Sort, {sorts} from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Error from "../components/Error";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from 'react-redux'
import qs from "qs";
import {useNavigate} from 'react-router-dom'
import {setFilters} from "../redux/slices/filterSlice";
import {fetchPizza, fetchPizzaCount} from "../redux/slices/pizzaSlice";

const Main = () => {

    //redux toolkit logic
    const categoryId = useSelector((state) => state.filterSlice.categoryId)
    const sortType = useSelector((state) => state.filterSlice.sortType)
    const searchValue = useSelector((state) => state.filterSlice.searchValue)

    //pizzas data and loading status
    const {items, status, totalCount} = useSelector((state) => state.pizzaSlice)

    //pagination
    const page = useSelector((state) => state.filterSlice.currentPage)
    const rowsPerPage = 8;


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const isMounted = useRef(false)
    const isSearch = useRef(false)

    const getPizzasCount = () => {
        dispatch(fetchPizzaCount({categoryId, searchValue}))
    }

    const getPizzas = () => {

        dispatch(fetchPizza({
            categoryId,
            sortType: sortType.type,
            sortOrder: sortType.order,
            pageLimit: rowsPerPage,
            page,
            searchValue
        }))
    }

    useEffect(() => {
        getPizzas()
    }, [])

    useEffect(() => {
        getPizzasCount()
    }, [categoryId, searchValue])


    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortType: sortType.type,
                order: sortType.order,
                categoryId,
                page
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, page])

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));

            const sort = sorts.find((obj) => obj.type === params.sortType && obj.order === params.order);

            dispatch(
                setFilters({
                    ...params,
                    sort,
                }),
            );
            isSearch.current = true;
        }
    }, []);

    // Если был первый рендер, то запрашиваем пиццы
    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType, searchValue, page]);


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
                {status === 'error' && <Error/>}
                {status === 'loading' && skeletonPizzas}
                {status === 'success' && pizzas}
            </div>
            {status === 'success' &&
                <Pagination
                    items={items}
                    itemsCount={totalCount}
                    rowsPerPage={rowsPerPage}/>}

        </div>
    );
}

export default Main;