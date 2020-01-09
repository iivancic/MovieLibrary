import React, { Component } from 'react';
import axios from '../../../../axios-orders';
import { Row, Col } from 'react-bootstrap';

class MovieGenreLink extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genres: [],
            tableParameters: {
                pageNumber: 1,
                pageSize: 100,
                orderBy: '',
                searchTerm: '',
                orderDirection: true
            },
            genreListHandler: props.genreListHandler
        }
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
    };

    render() {
        const middle = Math.ceil(this.state.genres.length / 2);
        const left = this.state.genres.slice(0, middle)
        const right = this.state.genres.slice(middle)

        const genresLeft = left.map(left => {
            return (

                <div key={left.genreId}>
                    <input key={left.genreId} type="checkbox" style={{ margin: "1%" }} onClick={ this.state.genreListHandler.bind(this,left.genreId)} label={left.genreName} value={left.genreName} />
                    <label>{left.genreName}</label>
                </div>
            )
        });
        const genresRight = right.map(right => {
            return (
                <div key={right.genreId}>
                    <input style={{ margin: "1%" }} onClick={ this.state.genreListHandler.bind(this, right.genreId)} type="checkbox" label={right.genreName} value={right.genreName} />
                    <label>{right.genreName}</label>
                </div>
            )
        });

        return (
            <div>
                <Row style={{ width: "100%" }}>
                    <Col sm={6}>
                        {genresLeft}
                    </Col>
                    <Col sm={6}>
                        {genresRight}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MovieGenreLink;