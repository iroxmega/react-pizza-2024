import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectFilters, setCategoryId} from '../redux/slices/filterSlice'

const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Forbidden']


const Categories: React.FC = () => {

    const {categoryId} = useSelector(selectFilters)
    const dispatch = useDispatch()

    return (
        <div className="categories">
            <ul>
                {categories.map((e, i) =>
                    (<li
                        key={i}
                        onClick={() => dispatch(setCategoryId(i))}
                        className={categoryId === i ? 'active' : ''}
                    >
                        {e}
                    </li>)
                )}
            </ul>
        </div>
    )
}


export default Categories