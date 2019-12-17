import React, { Component } from 'react';
import axios from '../../../../axios-orders';
import classes from '../../AdminPageStyles/GenreTable.module.css';
import GenreModal from './Modal';
import { FaEdit, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import GenreInputForm from './GenreInputForm';

class GenreTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            newGenre: {
                genreName: ''
            },
            modalVisibility: false,
            willBeDeleted: null,
            formVisibility: false
        }
    }
    /*
    state = {
        genres: [],
        newGenre: {
            genreName: ''
        },
        modalVisibility: false,
        willBeDeleted: null,
        formVisibility: false
    };
    */
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

    showModalHandler = () => {
        this.setState({ modalVisibility: true })
    }

    hideModalHandler = () => {
        this.setState({ modalVisibility: false, willBeDeleted: null, formVisibility:false })
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

    handleInputChange = (event) => {
        const gName = event.target.value;
        this.setState({
            newGenre: {
                 genreName: gName
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
                            this.showModalHandler()
                            this.setState({ willBeDeleted: genre.genreId })
                        }} />
                    </td>
                </tr>
            )
        });

        const input = <td className={classes.newRow}>
            <input value={this.state.newGenre.genreName} className={classes.input} type="text" onKeyDown={this.keyDownHandler} onChange={this.handleInputChange} />
            <FaPlusCircle className={classes.FaPlusCircle} onClick={() => this.setState({ formVisibility: true })} />
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
                <GenreModal
                    modalVisibility={this.state.modalVisibility}
                    clickedCancel={this.hideModalHandler}
                    clickedContinue={() => this.deleteDataHandler(this.state.willBeDeleted)}
                />

                <GenreInputForm
                    formVisibility={this.state.formVisibility}
                    postDataHandler={this.postDataHandler}
                    genreName={this.state.newGenre.genreName}
                    clickedCancel={this.hideModalHandler}
                    clickedSubmit={this.hideModalHandler}
                    handleInputChange={this.handleInputChange}
                />
            </div >
        )
    }
}

export default GenreTable;