import React, { Component } from 'react';
import axios from '../../../axios-orders';
import MovieGenreLink from '../AdminPageComponents/Tables/MovieGenreLink/MovieGenreLink';
import { Button } from 'reactstrap';
import { Navbar, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

class MovieEditPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageSrc:'',
            newMovie: {
                movieId: null,
                movieName: '',
                movieLength: null,
                language: '',
                year: null,
                shortDescription: '',
                longDescription: '',
                trivia: '',
                genres: [],
                images: []
            }
        }
    }

    componentDidMount = () => {
        this.getData();
    }

    getData = () => {
        if (window.location.pathname.split('/').pop() !== "new") {
            axios.get('api/Movies/' + window.location.pathname.split('/').pop()).then(
                response => {
                    this.setState({ newMovie: response.data });
                },
                error => {
                    //When notification alerts are implemented(toast) trigger error toast.
                    console.log(error);
                }
            );
        }

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
                    genres: []
                }
            })
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    putDataHandler = () => {
        var componentRef = this;
        const data = this.state.newMovie;
        axios.put('api/Movies/' + data.movieId, data).then(function (response) {
            console.log(response);
            componentRef.setState({
                editForm: {
                    formVisibility: false,
                    newMovie: {
                        movieName: '',
                        movieLength: null,
                        language: '',
                        year: null,
                        shortDescription: '',
                        longDescription: '',
                        trivia: '',
                        genres: []
                    }
                }
            });
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    hideModalHandler = () => {
        this.setState({ inputFormVisibility: false });
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

    findIndex(id, list) {
        var i;
        if (list) {
            for (i = 0; i < list.length; i++) {
                if (list[i].genreId === id) {
                    return i;
                }
            }
        }
        return -1;
    }

    checkboxInitialStateHandler = (id) => {
        const data = this.state.newMovie.genres;
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
        const data = this.state.newMovie.genres;
        const index = this.findIndex(id, data)
        if (index > -1) {
            data.splice(index, 1)
        }
        else {
            data.push(id)
            this.setState(prevState => ({
                newMovie: {
                    ...prevState.newMovie,
                    genres: data
                }
            }))
        }
    }

    render() {
        var data = this.state.newMovie;
        if (window.location.pathname.split('/').pop() === "new") {
            var str = this.postDataHandler
        } else {
            str = this.putDataHandler
        }

        var listGenres = this.state.newMovie.genres;
        return (
            <div style={{ margin: "3%" }}>
                <img src={this.state.imageSrc}/>
                <form>
                    <label >Name:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter movie name"
                        defaultValue={data.movieName}
                        onChange={this.handleInputChange.bind(this, 'movieName')} />
                    <small className="form-text text-muted"></small>

                    <label >Length:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter movie length (in minutes)"
                        defaultValue={data.movieLength}
                        onChange={this.handleInputChange.bind(this, 'movieLength')} />

                    <label >Language:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter Movie language"
                        defaultValue={data.language}
                        onChange={this.handleInputChange.bind(this, 'language')} />

                    <label>Year:</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter movie year"
                        defaultValue={data.year}
                        onChange={this.handleInputChange.bind(this, 'year')} />

                    <label>Short description:</label>
                    <textarea
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter short Description (for main screen)"
                        defaultValue={data.shortDescription}
                        onChange={this.handleInputChange.bind(this, 'shortDescription')} />

                    <label>Long description:</label>
                    <textarea
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter long description(for detail screen)"
                        defaultValue={data.longDescription}
                        onChange={this.handleInputChange.bind(this, 'longDescription')} />

                    <label>Trivia:</label>
                    <textarea
                        required
                        type="text"
                        className="form-control"
                        placeholder="Enter movie trivia"
                        defaultValue={data.trivia}
                        onChange={this.handleInputChange.bind(this, 'trivia')} />
                    <MovieGenreLink genreList={listGenres} genreListHandler={this.genreListHandler} />
                    <div style={{ width: "50%" }}>
                                <Button style={{ width: "35%"}} color="primary" onClick={str}>Save Changes</Button>
                        <Navbar style={{ margin: "1%", width: "35%", height: "100%", padding: "0", display: "inline-block" }}>

                            <NavItem tag={Link} to={'/myServer/admin/MovieTable'} style={{ width: "100%", height: "100%" }} >
                                <Button style={{ width: "100%" }} color="secondary">Discard Changes</Button>
                            </NavItem>
                        </Navbar>
                    </div>
                </form>
            </div >
        )
    }
}

export default MovieEditPage;