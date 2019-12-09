import React, { Component } from 'react';
import axios from '../../../axios-orders';
import classes from './genre.module.css';
import Modal from './Modal/Modal';

import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";

class GenreTable extends Component {
    /*
    constructor() {
        super();

        this.handleInputChange = this.handleInputChange.bind(this);
    }*/

    state = {
        genres: [],
        newGenre: {
            genreName: null
        },
        modalVisibility: false,
        willBeDeleted: null
    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('api/genre').then(
            response => {
                this.setState({ genres: response.data.items });
            },
            error => {
                //When notification alerts are implemented(toast) trigger error toast.
                console.log(error);
            }
        );
    }

    deleteDataHandler = (entityId) => {
        var componentRef = this;

        axios.get('api/genre/' + entityId).then(function (response) {
            console.log(response);
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });

        this.hideModalHandler();
    }

    editDataHandler = () => {

    }

    showModalHandler = () => {
        this.setState({ modalVisibility: true })
    }

    hideModalHandler = () => {
        this.setState({ modalVisibility: false, willBeDeleted: null })
    }

    postDataHandler = () => {
        var componentRef = this;
        const data = { genreName: this.state.newGenre.genreName };
        axios.post('api/genre', data).then(function (response) {
            console.log(response);
            componentRef.setState({ newGenre: { genreName: '' } })
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            this.postDataHandler();
        }
    }

    handleInputChange(event) {
        this.setState({
            newGenre: {
                genreName: event.target.value
            }
        });
    }

    render() {

        const genres = this.state.genres.map(genre => {
            return (
                <tr key={genre.genreId}>
                    <td className={classes.idColumn}>{genre.genreId} </td>
                    <td >{genre.genreName}
                        <FaEdit className={classes.FaEdit} onClick={() => this.editDataHandler(genre.genreId)} />
                        <FaTrashAlt className={classes.FaTrashAlt} onClick={() => {
                            this.showModalHandler(genre)
                            this.setState({ willBeDeleted: genre.genreId })
                        }} />
                    </td>
                </tr>
            )
        });

        const input = <td className={classes.newRow}>
            <input value={this.state.newGenre.genreName} className={classes.input} type="text" onKeyDown={this.keyDownHandler} onChange={(event) => this.setState({ newGenre: { genreName: event.target.value } })} />
            <FaPlusCircle className={classes.FaPlusCircle} onClick={() => this.postDataHandler} />
        </td>

        return (
            <div className={classes.Genre}>
                <table className={classes.GenreTable}>
                    <tbody>
                        <tr>
                            <th className={classes.idColumn}>Genre Id</th>
                            <th>Genre Name</th>
                        </tr>
                        {genres}
                        <tr>
                            <td className={classes.newRowId}></td>
                            {input}
                        </tr>
                    </tbody>
                </table>
                <Modal
                    modalVisibility={this.state.modalVisibility}
                    clickedCancel={this.hideModalHandler}
                    clickedContinue={() => this.deleteDataHandler(this.state.willBeDeleted)}
                />
            </div >
        )
    }
}

export default GenreTable;