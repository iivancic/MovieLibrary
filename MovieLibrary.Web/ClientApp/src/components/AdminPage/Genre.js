import React from 'react';
import classes from './genre.module.css'

const genre = (props) => (

    <tr>
        <td>{props.genreId}</td>
        <td>{props.genreName}</td>
    </tr>

);

export default genre;