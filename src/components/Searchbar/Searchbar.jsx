import React, {useCallback, useContext, useRef, useState} from 'react';
import styles from './Searchbar.module.scss'
import {SearchContext} from "../../App";
import debounce from 'lodash.debounce'

function Searchbar() {

    const {searchValue, setSearchValue} = useContext(SearchContext)
    const [ localSearchValue, setLocalSearchValue] = useState('')

    const inputRef = useRef()

    const closeButtonHandler = () => {
        setSearchValue('')
        setLocalSearchValue('')
        inputRef.current.focus()
    }

    const updateSearchValue = useCallback(
        debounce((newValue) => setSearchValue(newValue), 750), []
    )

    const searchChangeHandler = (event) => {
        setLocalSearchValue(event.target.value)
        updateSearchValue(event.target.value)
    }



    return (
        <div className={styles.root}>

            <svg className={styles.search} width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                    stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            <input
                ref={inputRef}
                maxLength='10'
                className={styles.input}
                value={localSearchValue}
                onChange={(event) => searchChangeHandler(event)}
                placeholder='искать питсу...'
            />

            {localSearchValue &&
                <svg
                    onClick={closeButtonHandler}
                    className={styles.close}
                    width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.00386 9.41816C7.61333 9.02763 7.61334 8.39447 8.00386 8.00395C8.39438 7.61342 9.02755 7.61342 9.41807 8.00395L12.0057 10.5916L14.5907 8.00657C14.9813 7.61605 15.6144 7.61605 16.0049 8.00657C16.3955 8.3971 16.3955 9.03026 16.0049 9.42079L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.0039C15.6133 16.3945 14.9802 16.3945 14.5896 16.0039L12.0057 13.42L9.42097 16.0048C9.03045 16.3953 8.39728 16.3953 8.00676 16.0048C7.61624 15.6142 7.61624 14.9811 8.00676 14.5905L10.5915 12.0058L8.00386 9.41816Z"
                        fill="#0F0F0F"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12ZM3.00683 12C3.00683 16.9668 7.03321 20.9932 12 20.9932C16.9668 20.9932 20.9932 16.9668 20.9932 12C20.9932 7.03321 16.9668 3.00683 12 3.00683C7.03321 3.00683 3.00683 7.03321 3.00683 12Z"
                          fill="#0F0F0F"/>
                </svg>
            }


        </div>
    );
}

export default Searchbar;