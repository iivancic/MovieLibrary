import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default ({ postDataHandler, genreName, formVisibility, clickedCancel, handleInputChange }) => {
    return (
        <Modal isOpen={formVisibility} >
            <ModalHeader toggle={clickedCancel}>Add new genre</ModalHeader>
            <ModalBody>
                <form>
                    <div>
                        <label >New Genre name</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter genre name"
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
