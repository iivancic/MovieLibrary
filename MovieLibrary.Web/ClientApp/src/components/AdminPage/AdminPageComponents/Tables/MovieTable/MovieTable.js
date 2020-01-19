import React, { Component } from 'react';
import axios from '../../../../../api/baseApi';
import classes from '../../../AdminPageStyles/MovieTable.module.css';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from 'react-icons/fa';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import Pagination from '../../Pagination/Pagination'
import Modal from '../../Modals/Modal'
import { Navbar, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import movieApi from '../../../../../api/movieApi'

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
            willBeDeleted: null,
            modalVisibility: false
        }
        this.state.newMovie = () => this.newMovie.bind(this)
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        movieApi.getList(this.state.tableParameters).then(
            response => {
                this.setState({ movies: response.data.items });
                this.setState({ totalNumberOfRecords: response.data.totalRecords })
            },
            error => {
                console.log(error);
            }
        );
    }

    deleteDataHandler = (entityId) => {
        var componentRef = this;
        movieApi.deleteEntity(entityId).then(function (response) {
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

    keyDownHandlerSearch = (event) => {
        if (event.key === 'Enter') {
            this.getData();
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
                                        label="React Select">

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
                                <div style={{ float: "right", alignContent: "center" }}>
                                    <Navbar >
                                        <NavItem style={{ float: "right" }} tag={Link} to={'/myServer/admin/MovieTableEdit/new'} className={classes.SidebarInnerContainer} >
                                            <FaPlusCircle className={classes.FaPlusCircle} />
                                        </NavItem>
                                    </Navbar>
                                </div>
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