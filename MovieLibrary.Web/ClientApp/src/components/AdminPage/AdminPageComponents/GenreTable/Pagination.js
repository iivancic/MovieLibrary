import React from 'react'

export default ({ items, itemsPerPage, currentPage, onClickHandler }) => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = items.slice(indexOfFirstItem, indexOfLastItem);

    const renderItems = currentItem.map((item, index) => {
        return <li key={index}> {item} </li>;
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(items.lenth / itemsPerPage); i++) {
        pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map(number => {
        return (
            <li key={number}
                id={number}
                onClick={onClickHandler}
            >
                {number}
            </li>
        );
    })

    return (
        <div>
            I am here!!
            <ul>
                {renderItems}
            </ul>
            <ul id="page-numbers">
                {renderPageNumbers}
            </ul>
        </div>
    )
}
