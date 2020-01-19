import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default ({ modalVisibility, className, clickedCancel, clickedContinue, keyDownHandlerDelete }) => {
    return (
        <Modal
            isOpen={modalVisibility}
            className={className}
        >
            <ModalHeader toggle={clickedCancel}>Delete</ModalHeader>
            <ModalBody>
                Are you sure you want to delete this item?
             </ModalBody>
            <ModalFooter>
                <Button color="primary" onKeyDown={keyDownHandlerDelete} onClick={clickedContinue}>Continue</Button>
                <Button color="secondary" onClick={clickedCancel}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

