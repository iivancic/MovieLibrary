import React, { Component } from 'react';
import axios from '../../../../axios-orders';
import classes from '../../AdminPageStyles/GenreTable.module.css';
import GenreModal from './Modal';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from "react-icons/fa";
import GenreInputForm from './Forms/GenreInputForm';
import GenreEditForm from './Forms/GenreEditForm';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Pagination from './Pagination'

class GenreTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            totalNumberOfRecords: null,
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
            },
            paginationVisibility: true
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
                this.setState({ totalNumberOfRecords: response.data.totalRecords })
            },
            error => {
                //When notification alerts are implemented(toast) trigger error toast.
                console.log(error);
            }
        );
    }

    deleteDataHandler = (entityId) => {
        var componentRef = this;

        axios.delete('api/genre/' + entityId).then(function (response) {
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
                pageNumber :1,
                searchTerm: searchTerm
            }
        }))
    }

    selectPageSizeHandler = (event) => {
        var pageSizeTarget = event.target.value;
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                pageSize: Number(pageSizeTarget),
                pageNumber: 1
            }
        }), () => {
            this.getData();
        });
    }


    orderByIdDescending = () => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                orderBy: 'GenreId',
                orderDirection: false
            }
        }), () => {
            this.getData();
        });
    }
    orderByIdAscending = () => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                orderBy: 'GenreId',
                orderDirection: true
            }
        }), () => {
            this.getData();
        });
    }
    orderByNameDescending = () => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                orderBy: 'GenreName',
                orderDirection: false
            }
        }), () => {
            this.getData();
        });
    }
    orderByNameAscending = () => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                orderBy: 'GenreName',
                orderDirection: true
            }
        }), () => {
            this.getData();
        });
    }
    pageChangeHandler = (pageNumber) => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                pageNumber: pageNumber
            }
        }), () => {
            this.getData();
        });
    }

    keyDownHandlerSearch = (event) => {
        if (event.key === 'Enter') {
            this.getData();
        }
            
    }

    keyDownInputHandler = (event) => {
        if (event.key === 'Enter') {
            this.postDataHandler();
        }
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

        const input = <td className={classes.newRow} colSpan={2} style={{ width: "100%", verticalAlign: "middle" }} >
            <input value={this.state.newGenre.genreName} className={classes.input} type="text" onKeyDown={this.keyDownHandler} onChange={this.handleInputChange} />
            <FaPlusCircle className={classes.FaPlusCircle} onClick={() => this.setState({ formVisibility: true })} />
        </td>
        return (
            <div className={classes.Genre}>

                <table className={classes.GenreTable}>
                    <tbody>
                        <tr>
                            <td colSpan={2} style={{ width: "100%", verticalAlign: "middle" }} >
                                <div style={{ float: "left", display: "flex", width: "50%", margin: "1%", alignContent: "center" }}>
                                    Number of records per page:
                                        <select
                                        style={{marginLeft: "1%"}}
                                        placeholder={this.state.tableParameters.pageSize}
                                        value={this.state.tableParameters.pageSize}
                                        onChange={this.selectPageSizeHandler}
                                        label="React Select"
                                    >
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={75}>75</option>
                                        <option value={100}>100</option>

                                    </select>
                                </div>

                                <div style={{ float: "right", margin: "0.4rem", alignContent: "center" }}>
                                    <input
                                        value={this.state.tableParameters.searchTerm}
                                        required
                                        type="text"
                                        placeholder="Search"
                                        onChange={this.onChangeHandler}
                                        onKeyDown={this.keyDownHandlerSearch}
                                    />
                                    <FaSearch  className={classes.FaSearch} onClick={this.getData} />
                                </div>
                            </td>

                        </tr>

                        <tr>
                            <th className={classes.idColumn}>Genre Id <TiArrowSortedDown onClick={this.orderByIdDescending} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp onClick={this.orderByIdAscending} className={classes.TiArrowSortedUp} /></th>
                            <th>Genre Name <TiArrowSortedDown onClick={this.orderByNameDescending} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={this.orderByNameAscending} /></th>
                        </tr>
                        {genres}
                        <tr>
                            {input}
                        </tr>
                        <tr>
                            <td colSpan={2} style={{ width: "100%", verticalAlign: "middle" }} >
                            <div style={{ float: "right", margin: "0.4rem", alignContent: "center" }}>
                                    <Pagination
                                        showPagination={this.state.paginationVisibility}
                                        totalNumberOfItems={this.state.totalNumberOfRecords}
                                        itemsPerPage={this.state.tableParameters.pageSize}
                                        currentPage={this.state.tableParameters.pageNumber}
                                        onClickHandler={this.pageChangeHandler}
                                />
                                </div>
                                </td>
                        </tr>
                    </tbody>
                </table>

                <GenreModal
                    modalVisibility={this.state.modalVisibility}
                    clickedCancel={this.hideModalHandler}
                    clickedContinue={() => this.deleteDataHandler(this.state.willBeDeleted)}
                />

                <GenreInputForm
                    KeyDown={this.keyDownInputHandler}
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