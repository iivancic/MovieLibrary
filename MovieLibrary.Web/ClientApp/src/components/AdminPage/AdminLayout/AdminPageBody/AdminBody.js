import React, { Component } from 'react'
import axios from '../../../../axios-orders'

class Body extends Component {
    state = {
        Genre: {
            GenreId = NULL,
            GenreName= ''
        }
    }

    componentDidMount() {
        axios.get('file/test')
            .then(response => {
                this.setState({ imageBase64: response.data })
            });
    }
    render() {
        return (

        )
    }
}

export default Body;