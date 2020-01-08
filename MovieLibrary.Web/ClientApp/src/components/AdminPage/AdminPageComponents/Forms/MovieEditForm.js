import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({ data, formVisibility, clickedCancel, clickedSaveChanges, handleInputChange }) => {
    return (
        <Modal isOpen={formVisibility}>
            <ModalHeader toggle={clickedCancel}>Change Movie</ModalHeader>
            <ModalBody>
                <form>
                    <div>
                        <label >Input new Movie Name</label>
                        <input
                            required
                            defaultValue={editName}
                            type="text"
                            className="form-control"
                            onChange={handleInputChange}
                        />

                        <label >Length:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter movie length (in minutes)"
                            value={data.movieLength}
                            onChange={handleInputChange} />

                        <label >Language:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter Movie language"
                            value={data.language}
                            onChange={handleInputChange} />

                        <label>Year:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter movie year"
                            value={data.year}
                            onChange={handleInputChange} />

                        <label>Short description:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter short Description (for main screen)"
                            value={data.shortDescription}
                            onChange={handleInputChange} />

                        <label>Long description:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter long description(for detail screen)"
                            value={data.longDescription}
                            onChange={handleInputChange} />

                        <label>Trivia:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter movie trivia"
                            value={data.trivia}
                            onChange={handleInputChange} />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={clickedSaveChanges}>Save Changes</Button>
                <Button color="secondary" onClick={clickedCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>

    );
}
