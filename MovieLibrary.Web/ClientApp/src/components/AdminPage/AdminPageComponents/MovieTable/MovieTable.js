import React, { Component } from 'react';
import axios from '../../../../axios-orders';
import classes from '../../AdminPageStyles/MovieTable.module.css';
import { FaEdit, FaTrashAlt, FaPlusCircle, FaSearch } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import { IoIosMore } from "react-icons/io"
import Pagination from '../GenreTable/Pagination'

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
            inputFormVisibility: false
        }
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
                </tr>
            )
        });
        return (
            <div>
                <table className={classes.MovieTable}>
                    <tbody>
                        <tr>
                            <td colSpan={5} style={{ width: "100%", verticalAlign: "middle" }} >
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
                        </tr>
                        {movies}
                        <tr>
                            <td colSpan={5} style={{ width: "100%", verticalAlign: "middle" }} >
                                <FaPlusCircle className={classes.FaPlusCircle} onClick={() => this.setState({ formVisibility: true })} />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5} style={{ width: "100%", verticalAlign: "middle" }} >
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

export default MovieTable;