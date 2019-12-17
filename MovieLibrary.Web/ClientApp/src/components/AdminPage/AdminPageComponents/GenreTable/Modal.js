import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class GenreModal extends Component {

	render() {
		return (
			<Modal isOpen={this.props.modalVisibility} className={this.props.className}>
				<ModalHeader toggle={this.props.clickedCancel}>Delete</ModalHeader>
				<ModalBody>
					Are you sure you want to delete this item?
                        </ModalBody>
				<ModalFooter>
					<Button color="primary" onClick={this.props.clickedContinue}>Continue</Button>
					<Button color="secondary" onClick={this.props.clickedCancel}>Cancel</Button>
				</ModalFooter>
			</Modal>
		)
	}
}

export default GenreModal;
