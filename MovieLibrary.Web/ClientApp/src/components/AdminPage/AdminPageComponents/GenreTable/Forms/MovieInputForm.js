import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default ({ postDataHandler, data, formVisibility, clickedCancel, handleInputChange }) => {
    return (
        <Modal isOpen={formVisibility} >
            <ModalHeader toggle={clickedCancel}>Add a new movie</ModalHeader>
            <ModalBody>
                <form>
                    <div>
                        <label > Name</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            paceholder="Enter movie name"
                            value={data.movieName}
                            onChange={handleInputChange} />
                        <small className="form-text text-muted">Genre name must be unique.</small>
                        <label >Movie Length(in minutes)</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            paceholder="Enter movie length"
                            value={data.movieLength}
                            onChange={handleInputChange} />
                        <small className="form-text text-muted">Genre name must be unique.</small>
                        <input
                            required
                            type="text"
                            className="form-control"
                            paceholder="Enter Movie language"
                            value={genreName}
                            onChange={handleInputChange} />
                        <small className="form-text text-muted">Genre name must be unique.</small>
                        <input
                            required
                            type="text"
                            className="form-control"
                            paceholder="Enter movie year"
                            value={genreName}
                            onChange={handleInputChange} />
                        <small className="form-text text-muted">Genre name must be unique.</small>
                        <input
                            required
                            type="text"
                            className="form-control"
                            paceholder="Enter movie length"
                            value={genreName}
                            onChange={handleInputChange} />
                        <small className="form-text text-muted">Genre name must be unique.</small>
                        <input
                            required
                            type="text"
                            className="form-control"
                            paceholder="Enter short Description"
                            value={genreName}
                            onChange={handleInputChange} />
                        <small className="form-text text-muted">Genre name must be unique.</small>
                        <input
                            required
                            type="text"
                            className="form-control"
                            paceholder="Enter long description"
                            value={genreName}
                            onChange={handleInputChange} />
                        <small className="form-text text-muted">Genre name must be unique.</small>
                        <input
                            required
                            type="text"
                            className="form-control"
                            paceholder="Enter movie trivia"
                            value={genreName}
                            onChange={handleInputChange} />
                        <small className="form-text text-muted">Genre name must be unique.</small>
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
