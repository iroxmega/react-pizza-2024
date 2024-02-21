import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { setCategoryId } from '../redux/slices/filterSlice'

function Categories() {
    //redux toolkit logic
    const categoryId = useSelector((state) => state.filterSlice.categoryId)
    const dispatch = useDispatch()



    const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Forbidden']

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