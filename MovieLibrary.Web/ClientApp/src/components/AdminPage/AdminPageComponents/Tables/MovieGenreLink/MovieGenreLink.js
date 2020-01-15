import React, { Component } from 'react';
import axios from '../../../../../axios-orders';
import { Row, Col } from 'react-bootstrap';

class MovieGenreLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            genreListHandler: props.genreListHandler
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get('api/genre/all').then(
            response => {
                this.setState({ genres: response.data});
            },
            error => {
                //When notification alerts are implemented(toast) trigger error toast.
                console.log(error);
            }
        );
    };

    render() {

        function containsGenre(list, object) {
            for (var i = 0; i < list.length; i++) {
                if (list[i] === object.genreId) {
                    return true;
                }
            }
            return false;
        }

        const middle = Math.ceil(this.state.genres.length / 2);
        const left = this.state.genres.slice(0, middle)
        const right = this.state.genres.slice(middle)
        const listGenre = this.props.genreList

        const genresLeft = left.map(y => {
            if (containsGenre(listGenre, y)) {
                var checkedGenre = true;
            }
            else {
                checkedGenre = false;
            }
            return (
                <div key={y.genreId}>
                    <input type="checkbox" checked={checkedGenre} style={{ margin: "1%" }} onChange={this.state.genreListHandler.bind(this, y.genreId)} label={y.genreName} value={y.genreName} />
                    <label>{y.genreName}</label>
                </div>
            )
        });

        const genresRight = right.map(x => {
            if (containsGenre(listGenre, x)) {
                var checkedGenre = true;
            }
            else {
                checkedGenre = false;
            }
            return (
                <div key={x.genreId}>
                    <input style={{ margin: "1%" }} checked={checkedGenre} onChange={this.state.genreListHandler.bind(this, x.genreId)} type="checkbox" label={x.genreName} value={x.genreName} />
                    <label>{x.genreName}</label>
                </div>
            )
        });

        return (
            <div>
                <label>Genres: </label>
                <Row style={{ width: "100%" }}>
                    <Col sm={6}>
                        <div style={{ padding: "1%", width: "99%", backgroundColor: "white", borderRadius: "3%", border: "1px, blue" }}>
                            {genresLeft}
                            </div>
                    </Col>
                    <Col sm={6}>
                        <div style={{ padding: "1%", width: "99%", backgroundColor: "white", borderRadius: "3%", border: "1px, blue" }}>
                            {genresRight}
                            </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MovieGenreLink;