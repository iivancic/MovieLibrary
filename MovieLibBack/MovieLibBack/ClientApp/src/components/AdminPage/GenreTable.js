import React, { Component } from 'react'
import axios from '../../axios-orders'
import Genre from './Genre'
import classes from './genre.module.css'

class GenreTable extends Component {
    state = {
        genres: [],
        newGenre: {
            genreName: ''
        }
    };

    componentDidMount() {
        axios.get('file/testing')
            .then(response => {
                //this.setState({ genres: response.data });
                const genres = response.data.map(genre => {
                    return { ...genre }
                });
                this.setState({ genres: genres });
            });
    }

    postDataHandler = () => {
        const data = { genreName: this.state.newGenre.genreName };
        axios.post('myServer/admin/newGenre', {
            genreName: this.state.newGenre.genreName
        })

            .then(function(response)  {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        const genres = this.state.genres.map(genre => {
            return (<tr>
                <td >{genre.genreId}</td>
                <td >{genre.genreName}</td>
            </tr>
            )
        });

        return (
            <div>
                <p>This is where the Genre Table should go!</p>
                <p>Wake me up, before you go go!</p>

                <table className={classes.Genre}>
                    <tbody>
                        <tr>
                            <th>Genre Id</th>
                            <th>Genre Name</th>

                        </tr>
                        {genres}
                        <tr>
                            <td></td>
                            <td>
                                <input type="text"  onChange={(event) => this.setState({ genreName: event.target.value })} />
                                <button onClick={this.postDataHandler}>Add Post</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
        )
    }
}

export default GenreTable;