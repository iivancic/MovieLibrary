import React, { Component } from 'react';
import axios from '../../../../../axios-orders';
import classes from '../../../AdminPageStyles/MovieTable.module.css';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from 'react-icons/fa';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Pagination from '../../Pagination/Pagination'
import MovieInputForm from '../../Forms/MovieInputForm';
import Modal from '../../Modals/Modal'
import { Navbar, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class MovieTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            tableParameters: {
                pageNumber: 1,
                pageSize: 25,
                orderBy: '',
                searchTerm: '',
                orderDirection: true
            },
            totalNumberOfRecords: null,
            inputFormVisibility: false,
            newMovie: {
                movieName: '',
                movieLength: '',
                language: '',
                year: '',
                shortDescription: '',
                longDescription: '',
                trivia: '',
                movieGenres: []
            },
            editForm: {
                formVisibility: false,
                editMovie: {
                    movieId: 2894,
                    movieName: 'aaaa',
                    movieLength: null,
                    language: '',
                    year: null,
                    shortDescription: '',
                    longDescription: '',
                    trivia: '',
                    movieGenres: []
                }
            },
            willBeDeleted: null,
            modalVisibility: false
        }
        this.state.newMovie = () => this.newMovie.bind(this)
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('api/Movies', { params: this.state.tableParameters }).then(
            response => {
                this.setState({ movies: response.data.items });
                this.setState({ totalNumberOfRecords: response.data.totalRecords })
            },
            error => {
                //When notification alerts are implemented(toast) trigger error toast.
                console.log(error);
            }
        );
    }

    postDataHandler = () => {
        var componentRef = this;
        const data = { newMovie: this.state.newMovie };
        axios.post('api/Movies', data.newMovie).then(function (response) {
            console.log(response);
            componentRef.setState({
                newMovie: {
                    movieName: '',
                    movieLength: null,
                    language: '',
                    year: null,
                    shortDescription: '',
                    longDescription: '',
                    trivia: '',
                    movieGenres: []
                }
            })
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    putDataHandler = () => {
        var componentRef = this;
        const data = { editMovie: this.state.editForm.editMovie };
        axios.put('api/Movies/' + data.editMovie.movieId, data.editMovie).then(function (response) {
            console.log(response);
            componentRef.setState({
                editForm: {
                    formVisibility: false,
                    editMovie: {
                        movieId: null,
                        movieName: '',
                        movieLength: null,
                        language: '',
                        year: null,
                        shortDescription: '',
                        longDescription: '',
                        trivia: '',
                        movieGenres: [],
                    }
                }
            });
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    deleteDataHandler = (entityId) => {
        var componentRef = this;

        axios.delete('api/Movies/' + entityId).then(function (response) {
            console.log(response);
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });

        this.hideModalHandler();
    }

    hideModalHandler = () => {
        this.setState({ inputFormVisibility: false });
    }

    orderByPropAscending = (prop) => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                orderBy: prop.Id,
                orderDirection: true
            }
        }), () => {
            this.getData();
        });
    }

    orderByPropDescending = (prop) => {
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                orderBy: prop.Id,
                orderDirection: false
            }
        }), () => {
            this.getData();
        });
    }

    hideEditModalHandler = () => {
        this.setState(prevState => ({
            editForm: {
                ...prevState.editForm,
                formVisibility: false
            }
        }))
    }

    onChangeHandler = (event) => {
        var searchTerm = event.target.value;
        this.setState(prevState => ({
            tableParameters: {
                ...prevState.tableParameters,
                pageNumber: 1,
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

    handleInputChange = (propertyName, event) => {
        const movie = this.state.newMovie;
        movie[propertyName] = event.target.value;
        if (propertyName === 'year' || propertyName === 'movieLength') {
            movie[propertyName] = parseInt(movie[propertyName])
        }
        this.setState({ newMovie: movie })
    }

    handleEditInputChange = (propertyName, event) => {
        const movie = this.state.editForm.editMovie;
        movie[propertyName] = event.target.value;
        if (propertyName === 'year' || propertyName === 'movieLength') {
            movie[propertyName] = parseInt(movie[propertyName])
        }
        this.setState(prevState => ({
            editForm: {
                ...prevState.editForm,
                editMovie: movie
            }
        }))

    }

    keyDownHandlerSearch = (event) => {
        if (event.key === 'Enter') {
            this.getData();
        }
    }

    findIndex(id, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].genreId === id) {
                return i;
            }
        }
        return -1;
    }

    checkboxInitialStateHandler = (id) => {
        const data = this.state.editForm.editMovie.movieGenres;
        const index = this.findIndex(id, data)
        if (index > -1) {
            this.setState(prevState => ({
                editForm: {
                    ...prevState.editForm,
                    checked: true
                }
            }
            ))
        }
    }


    genreListHandler = (id) => {
        const data = this.state.newMovie.movieGenres;
        const index = this.findIndex(id, data)
        if (index > -1) {
            data.splice(index, 1)
        }
        else {
            data.push({ genreId: id })
            this.setState(prevState => ({
                newMovie: {
                    ...prevState.newMovie,
                    movieGenres: data
                }
            }))
        }
    }


    render() {
        const movies = this.state.movies.map(movie => {
            return (
                <tr key={movie.movieId}>
                    <td>{movie.movieId} </td>
                    <td>{movie.movieName}</td>
                    <td>{movie.movieLength}</td>
                    <td>{movie.language}</td>
                    <td>{movie.year}</td>
                    <td style={{ display: "flex" }}>
                        <Navbar style={{ padding: "0" }}>
                            <NavItem tag={Link} to={'/myServer/admin/MovieTableEdit/' + movie.movieId.toString()} className={classes.SidebarInnerContainer} >

                                <FaEdit className={classes.FaEdit} onClick={() =>
                                    this.setState({
                                        editForm: {
                                            editMovie: movie
                                        }
                                    })
                                } />
                            </NavItem>
                        </Navbar>
                        <FaTrashAlt className={classes.FaTrashAlt} onClick={() => {
                            this.setState({ modalVisibility: true, willBeDeleted: movie.movieId })
                        }} />
                    </td>
                </tr>
            )
        });
        return (
            <div>
                <table className={classes.MovieTable}>
                    <tbody>
                        <tr>
                            <td colSpan={6} style={{ width: "100%", verticalAlign: "middle" }} >
                                <div style={{ float: "left", display: "flex", width: "50%", margin: "1%", alignContent: "center" }}>
                                    Number of records per page:
                                        <select
                                        style={{ marginLeft: "1%" }}
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
                                    <FaSearch className={classes.FaSearch} onClick={this.getData} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>Id <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'MovieId' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'MovieId' })} /></th>
                            <th>Movie Name <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'MovieName' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'MovieName' })} /></th>
                            <th>Length <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'MovieLength' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'MovieLength' })} /></th>
                            <th>Language <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'Language' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'Language' })} /></th>
                            <th>Year <TiArrowSortedDown onClick={() => this.orderByPropDescending({ Id: 'Year' })} className={classes.TiArrowSortedDown} /> <TiArrowSortedUp className={classes.TiArrowSortedUp} onClick={() => this.orderByPropAscending({ Id: 'Year' })} /></th>
                            <th />
                        </tr>
                        {movies}
                        <tr>
                            <td colSpan={6} style={{ width: "100%", verticalAlign: "middle" }} >
                                <Navbar style={{ padding: "0" }}>
                                    <NavItem tag={Link} to={'/myServer/admin/MovieTableEdit/new'} className={classes.SidebarInnerContainer} >
                                        <FaPlusCircle className={classes.FaPlusCircle}/>
                                    </NavItem>
                                </Navbar>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={6} style={{ width: "100%", verticalAlign: "middle" }} >
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

                <MovieInputForm
                    formVisibility={this.state.inputFormVisibility}
                    postDataHandler={this.postDataHandler}
                    data={this.state.newMovie}
                    clickedCancel={this.hideModalHandler}
                    handleInputChange={this.handleInputChange}
                    genreListHandler={this.genreListHandler}
                />

                <MovieInputForm
                    formVisibility={this.state.editForm.formVisibility}
                    postDataHandler={this.putDataHandler}
                    data={this.state.editForm.editMovie}
                    clickedCancel={this.hideEditModalHandler}
                    handleInputChange={this.handleEditInputChange}
                    genreListHandler={this.genreListHandler}
                    checked={this.state.editForm.checked}
                />

                <Modal
                    modalVisibility={this.state.modalVisibility}
                    clickedCancel={() => this.setState({ modalVisibility: false })}
                    clickedContinue={() => {
                        this.deleteDataHandler(this.state.willBeDeleted)
                        this.setState({ modalVisibility: false })
                    }}
                />
            </div >
        )
    }
}

export default MovieTable;