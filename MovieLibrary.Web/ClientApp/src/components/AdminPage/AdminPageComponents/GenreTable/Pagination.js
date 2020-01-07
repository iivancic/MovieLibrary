import React from 'react'
import Pagination from "react-js-pagination"
import classes from "../../AdminPageStyles/Pagination.module.css"


export default ({ currentPage, totalNumberOfItems, itemsPerPage, onClickHandler }) => {
    return (
        <div className={classes.Pagination}>
            <Pagination
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={totalNumberOfItems}
                pageRangeDisplayed={3}
                onChange={onClickHandler}
                />
        </div>
    )
}
