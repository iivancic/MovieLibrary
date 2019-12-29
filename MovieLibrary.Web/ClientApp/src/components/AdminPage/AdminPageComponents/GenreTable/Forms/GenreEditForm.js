import React from 'react'
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default ({ editName, formVisibility, clickedCancel, clickedSaveChanges, handleInputChange }) => {
    return (
        <Modal isOpen={formVisibility}>
            <ModalHeader toggle={clickedCancel}>Change Genre Name</ModalHeader>
            <ModalBody>
                <form>
                    <div>
                        <label >Input new Genre name</label>
                        <input
                            required
                            defaultValue={editName}
                            type="text"
                            className="form-control"
                            onChange={handleInputChange}
                        />
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
