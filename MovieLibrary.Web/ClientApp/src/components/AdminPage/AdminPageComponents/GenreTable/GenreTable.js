import React, { Component, useEffect } from 'react';
import axios from '../../../../axios-orders';
import classes from '../../AdminPageStyles/GenreTable.module.css';
import GenreModal from './Modal';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from "react-icons/fa";
import GenreInputForm from './Forms/GenreInputForm';
import GenreEditForm from './Forms/GenreEditForm';
import Select from 'react-select'
import Pagination from "react-js-pagination";


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
            formVisibility: false,

            editForm: {
                formVisibility: false,
                editName: '',
                editId: null
            },

            tableParameters: {
                pageNumber: 1,
                pageSize: 25,
                orderBy: '',
                searchTerm: '',
                orderDirection: true
            }
        }
        this.selectPageSizeHandler = this.selectPageSizeHandler.bind(this)
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('api/genre', { params: this.state.tableParameters }).then(
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
        this.setState({ modalVisibility: false, willBeDeleted: null, formVisibility: false, editForm: { formVisibility: false } })
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

    saveChangesHandler = () => {
        var componentRef = this;
        const data = { genreId: this.state.editForm.editId, genreName: this.state.editForm.editName };

        axios.put('api/genre/' + data.genreId, data).then(function (response) {
            console.log(response);
            componentRef.setState({
                editForm: {
                    formVisibility: false,
                    editName: '',
                    editId: null
                }
            })
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
        const newName = event.target.value;
        this.setState({
            newGenre: {
                genreName: newName
            }
        });
    }

    editChangeHandler = (event) => {
        const changedName = event.target.value;
        const id = this.state.editForm.editId
        this.setState({
            editForm: {
                editName: changedName,
                formVisibility: true,
                editId: id
            }
        });
    }

    onChangeHandler = (event) => {
        var searchTerm = event.target.value;
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                searchTerm: searchTerm
            }
        }))
    }

    selectPageSizeHandler = (event) => {
        var pageSizeTarget = event.target.value;
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                pageSize: Number(pageSizeTarget)
            }
        }), () => {
            this.getData();
        });

    }

    render() {
        const genres = this.state.genres.map(genre => {
            return (
                <tr key={genre.genreId}>
                    <td className={classes.idColumn}>{genre.genreId} </td>
                    <td >{genre.genreName}
                        <FaEdit className={classes.FaEdit}
                            onClick={() => this.setState({
                                editForm: {
                                    formVisibility: true,
                                    editName: genre.genreName,
                                    editId: genre.genreId
                                }
                            })}

                        />
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
                            <td colSpan={2} style={{ width: "100%", verticalAlign: "middle" }} >
                                <div style={{ float: "left", display: "flex", width: "50%" }}>
                                    <div style={{ width: "40%", margin: "0.4rem" }}>
                                        Number of records per page:
                                    </div>
                                    <div style={{ width: "15%" }}>
                                        <select
                                            placeholder={this.state.tableParameters.pageSize}
                                            value={this.state.tableParameters.pageSize}
                                            clearable={false}
                                            onChange={this.selectPageSizeHandler}
                                            label="React Select"
                                        >
                                            <option value={25}>25</option>
                                            <option value={50}>50</option>
                                            <option value={75}>75</option>
                                            <option value={100}>100</option>

                                        </select>
                                    </div>
                                </div>
                                <div style={{ float: "right", margin: "0.4rem", alignContent: "center" }}>
                                    <input value={this.state.tableParameters.searchTerm}
                                        required
                                        type="text"
                                        placeholder="Search"
                                        onChange={this.onChangeHandler} />
                                    <FaSearch className={classes.FaSearch} onClick={this.getData} />
                                </div>
                            </td>

                        </tr>

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

                <GenreEditForm
                    formVisibility={this.state.editForm.formVisibility}
                    clickedCancel={this.hideModalHandler}
                    clickedSaveChanges={this.saveChangesHandler}
                    editName={this.state.editForm.editName}
                    handleInputChange={this.editChangeHandler}
                />


            </div >

        )
    }
}

export default GenreTable;