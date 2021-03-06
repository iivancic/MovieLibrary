﻿import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import MovieGenreLink from '../Tables/MovieGenreLink/MovieGenreLink'

export default ({ clicked, postDataHandler, data, formVisibility, clickedCancel, handleInputChange, genreListHandler }) => {
    return (
        <Modal isOpen={formVisibility} >
            <ModalHeader toggle={clickedCancel}>Add a new movie</ModalHeader>
            <ModalBody>
                <form>
                    <div>
                        <label >Name:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter movie name"
                            defaultValue={data.movieName}
                            onChange={handleInputChange.bind(this, 'movieName')} />
                        <small className="form-text text-muted"></small>

                        <label >Length:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter movie length (in minutes)"
                            defaultValue={data.movieLength}
                            onChange={handleInputChange.bind(this, 'movieLength')} />

                        <label >Language:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter Movie language"
                            defaultValue={data.language}
                            onChange={handleInputChange.bind(this, 'language')} />

                        <label>Year:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter movie year"
                            defaultValue={data.year}
                            onChange={handleInputChange.bind(this, 'year')} />

                        <label>Short description:</label>
                        <textarea
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter short Description (for main screen)"
                            defaultValue={data.shortDescription}
                            onChange={handleInputChange.bind(this, 'shortDescription')} />

                        <label>Long description:</label>
                        <textarea
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter long description(for detail screen)"
                            defaultValue={data.longDescription}
                            onChange={handleInputChange.bind(this, 'longDescription')} />

                        <label>Trivia:</label>
                        <textarea
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter movie trivia"
                            defaultValue={data.trivia}
                            onChange={handleInputChange.bind(this, 'trivia')} />
                        <MovieGenreLink clicked={clicked} genreListHandler={genreListHandler} /> 
                    </div>

                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={postDataHandler} > Submit</Button>
                <Button color="secondary" onClick={clickedCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>

    );
}
