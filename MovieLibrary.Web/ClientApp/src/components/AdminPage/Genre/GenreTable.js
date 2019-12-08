import React, { Component } from 'react'
import axios from '../../../axios-orders'
import classes from './genre.module.css'

class GenreTable extends Component {
    state = {
        genres: [],
        newGenre: {
            genreName: null
        }
    };

    getData() {
        axios.get('api/genre').then(response => {
            //this.setState({ genres: response.data });
            //if (response.data && response.data.items) {
            //    const genres = response.data.items.map(genre => {
            //        return { ...genre }
            //    });
            //    this.setState({ genres: genres });
            //}

            this.setState({ genres: response.data.items });
        });
    }

    componentDidMount() {
        this.getData();
    }

    postDataHandler = () => {
        var componentRef = this;
        const data = { genreName: this.state.newGenre.genreName };

        axios.post('api/genre', data).then(function (response) {
            console.log(response);
            componentRef.getData();
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const genres = this.state.genres.map(genre => {
            return (<tr key={genre.genreId}>
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
                                <input type="text" onChange={(event) => this.setState({ newGenre: { genreName: event.target.value } })} />
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