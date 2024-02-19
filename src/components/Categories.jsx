import React, {useState} from "react";


function Categories({choosedCategory, categoryChangeHandler}) {

    const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые', 'Акции']


    return (
        <div className="categories">
            <ul>
                {categories.map((e, i) =>
                    (<li
                        onClick={() => categoryChangeHandler(i)}
                        className={choosedCategory === i ? 'active' : ''}
                    >
                        {e}
                    </li>)
                )}
            </ul>
        </div>
    )
}


export default Categories