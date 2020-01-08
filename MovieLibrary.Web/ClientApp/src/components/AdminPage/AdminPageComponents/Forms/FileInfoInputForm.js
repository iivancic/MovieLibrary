import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default ({ postDataHandler, data, formVisibility, clickedCancel, handleInputChange }) => {
    return (
        <Modal isOpen={formVisibility} >
            <ModalHeader toggle={clickedCancel}>Add a new File Info</ModalHeader>
            <ModalBody>
                <form>
                    <div>
                        <label >File Data Id:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter fileDataId"
                            defaultValue={data.fileDataId}
                            onChange={handleInputChange.bind(this, 'fileDataId')} />
                        <small className="form-text text-muted"></small>

                        <label >File Name:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter File Name"
                            defaultValue={data.fileName}
                            onChange={handleInputChange.bind(this, 'fileName')} />

                        <label >File Extension:</label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter File Extension"
                            defaultValue={data.fileExtension}
                            onChange={handleInputChange.bind(this, 'fileExtension')} />

                        <label>Size: </label>
                        <input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Enter data size"
                            defaultValue={data.size}
                            onChange={handleInputChange.bind(this, 'size')} />
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={postDataHandler}>Submit</Button>
                <Button color="secondary" onClick={clickedCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>

    );
}
