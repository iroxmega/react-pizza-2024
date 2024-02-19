import React from 'react';
import styles from './NotFoundBlock.module.scss'
function NotFound(props) {
    return (
        <div className={styles.root}>
            <h2>Эй, дружок-пирожок,<br /> тобою была выбрана <strong>неправильная дверь. </strong></h2>
            <h3>Клуб кожевенного мастерства два блока вниз</h3>
        </div>

    );
}

export default NotFound;