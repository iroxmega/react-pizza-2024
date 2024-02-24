import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFilters, setSortType} from '../redux/slices/filterSlice'

type SortItem = {
    name: string,
    type: 'rating' | 'price' | 'title',
    order: 'asc' | 'desc'
}

export const sorts: SortItem[] = [
    {name: 'популярности (>)', type: 'rating', order: 'desc'},
    {name: 'популярности (<)', type: 'rating', order: 'asc'},
    {name: 'цене (>)', type: 'price', order: 'desc'},
    {name: 'цене (<)', type: 'price', order: 'asc'},
    {name: 'алфавиту (>)', type: 'title', order: 'asc'},
    {name: 'алфавиту (<)', type: 'title', order: 'desc'}
]

const Sort = () => {

    const dispatch = useDispatch()
    const {sortType} = useSelector(selectFilters)

    const sortRef = useRef<HTMLDivElement>(null)

    const [isVisible, setIsVisible] = useState(false)

    const sortClosing = (obj:SortItem ) => {
        setIsVisible(isVisible => !isVisible)
        dispatch(setSortType({...obj}))
    }

    useEffect(() => {
        const handleClickOutside = (event:any) => {

            if (!event.composedPath().includes(sortRef.current)) {
                setIsVisible(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () => {
            document.body.removeEventListener('click', handleClickOutside)
        }
    }, [])

    return (
        <div ref={sortRef} className="sort">
            <div className="sort__label">
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span onClick={() => {
                    setIsVisible((isVisible) => !isVisible)
                }}>{sortType.name}</span>
            </div>
            {isVisible &&
                <div className="sort__popup">
                    <ul>
                        {sorts.map((sort, i) => (
                            <li key={i}
                                onClick={() => sortClosing(sort)}
                                className={
                                    sort.type === sortType.type
                                    && sort.order === sortType.order
                                        ? 'active'
                                        : ''
                                }>{sort.name}</li>
                        ))}
                    </ul>
                </div>
            }

        </div>
    )
}

export default Sort