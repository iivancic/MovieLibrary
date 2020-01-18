import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ImageUploader from 'react-images-upload';

export default ({ postDataHandler, formVisibility, clickedCancel, handleInputChange }) => {
    return (
        <Modal isOpen={formVisibility} >
            <ModalHeader >Add new image</ModalHeader>
            <ModalBody>
                <form>
                    <div>
                        <label>Add :movieName: images.</label>
                        <ImageUploader
                            withIcon={true}
                            buttonText='Choose images'
                            //imgExtension={['.jpg', '.gif', '.png', '.gif']}
                            maxFileSize={5242880}
                        />
                        <label>Select image type: </label>
                        <select style={{ margin: '2%' }}>
                            <option value={2}> Front Image </option>
                            <option value={1}> Background Image </option>
                            <option value={3}> Carousel Images </option>
                        </select>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleInputChange}> Submit</Button>
                <Button color="secondary" onClick={clickedCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>

    );
}
