import React, {createContext, useEffect, useRef, useState} from 'react';

import Categories from "../components/Categories";
import Sort, {sorts} from "../components/Sort";
import PizzaSkeleton from "../components/PizzaBlock/Skeleton";
import PizzaBlock from "../components/PizzaBlock/PizzaBlock";
import Error from "../components/Error";
import Pagination from "../components/Pagination/Pagination";
import {useDispatch, useSelector} from 'react-redux'
import qs from "qs";
import {useNavigate} from 'react-router-dom'
import {selectFilters, selectPages, setFilters} from "../redux/slices/filterSlice";
import {fetchPizza, fetchPizzaCount, selectPizzaData} from "../redux/slices/pizzaSlice";
import {Modal} from "antd";

// export const PizzaModalContext = createContext()

const Main = () => {

    // const [isOpen, setIsOpen] = useState(false);
    // const [modalPizza, setModalPizza] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    //filters
    const {categoryId, sortType, searchValue} = useSelector(selectFilters)

    //pizzas data and loading status
    const {items, status, totalCount} = useSelector(selectPizzaData)

    //pagination
    const page = useSelector(selectPages)
    const rowsPerPage = 8;

    //window.search params
    const isMounted = useRef(false)
    const isSearch = useRef(false)

    const getPizzasCount = () => {
        //@ts-ignore
        dispatch(fetchPizzaCount({categoryId, searchValue}))
    }

    const getPizzas = () => {
        //@ts-ignore
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

    useEffect(() => {
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            getPizzas();
        }

        isSearch.current = false;
    }, [categoryId, sortType, searchValue, page]); //запрос пицц при первом рендере

    const pizzas = items.map(pizza => (<PizzaBlock {...pizza} />))
    const skeletonPizzas = [...new Array(8)].map((_, i) => <PizzaSkeleton key={i}/>)

    return (
        <div className='container'>

            {/*<Modal*/}
            {/*    centered*/}
            {/*    open={isOpen}*/}
            {/*    onOk={() => setIsOpen(false)}*/}
            {/*    onCancel={() => setIsOpen(false)}*/}
            {/*>*/}

            {/*</Modal>*/}
            <div className="content__top">
                <Categories/>
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>

                <div className="content__items">
                    {/*<PizzaModalContext.Provider value={{isOpen, setIsOpen}}>*/}
                    {status === 'error' && <Error/>}
                    {status === 'loading' && skeletonPizzas}
                    {status === 'success' && pizzas}
                    {/*</PizzaModalContext.Provider>*/}
                </div>

            {status === 'success' &&
                <Pagination
                    itemsCount={totalCount}
                    rowsPerPage={rowsPerPage}/>}
        </div>
    );
}

export default Main;