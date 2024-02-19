import React from "react";
import styles from './Pagination.module.scss'

const Pagination = (props) => {
    const {nav = null, disable, onNextPageClick, onPrevPageClick} = props;

    const handleNextPageClick = () => {
        onNextPageClick();
    };
    const handlePrevPageClick = () => {
        onPrevPageClick();
    };

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