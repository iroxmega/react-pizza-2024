import React, {useEffect, useState} from "react";
import styles from './Pagination.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../../redux/slices/filterSlice";

const Pagination = ({items, itemsCount, rowsPerPage} ) => {

    //redux states
    const currentPage = useSelector((state) => state.filterSlice.currentPage)
    const dispatch = useDispatch()

    const [pagesCount, setPagesCount] = useState(1)

    useEffect(() => {
        setPagesCount(Math.ceil(itemsCount / rowsPerPage))
    }, [itemsCount, rowsPerPage]);

    //pag elements
    const disable = { left: currentPage === 1, right: currentPage === pagesCount,}
    const nav = {current: currentPage, total: pagesCount}

    const handleNextPageClick = () => {
        const next = currentPage + 1;
        const total = items.length !== 0 ? pagesCount : currentPage;
        onChangePage(next <= total ? next : currentPage);
    }

    const handlePrevPageClick = () => {
        const prev = currentPage - 1;
        onChangePage(prev > 0 ? prev : currentPage);
    }

    const onChangePage = num => {
        console.log(currentPage)
        dispatch(setCurrentPage(num))
    }

    return (
        <div className={styles.paginator}>
            <button
                className={styles.arrow}
                type="button"
                onClick={handlePrevPageClick}
                disabled={disable.left}
            >
                {'<'}
            </button>
            {nav && (
                <span className={styles.navigation}>
                    {nav.current} из {nav.total}
                </span>
            )}
            <button
                className={styles.arrow}
                type="button"
                onClick={handleNextPageClick}
                disabled={disable.right}
            >
                {'>'}
            </button>
        </div>
    );
};

export default Pagination;