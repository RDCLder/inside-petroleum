import React from 'react';
import { Container, Row, Modal, Button, Alert } from "react-bootstrap";
import "../styles/CreateForm.css";
import axios from "axios";

class CreateForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			forms: this.props.forms,
			show: false,
			title: null,
			description: null,
			id: null,
			alertMessage: null,
			alertErrorShow: false
		};
	}

	changeTitle(e) {
		this.setState({
			title: e.target.value,
			id: e.target.value
		});
	}

	changeDescription(e) {
		this.setState({
			description: e.target.value
		});
	}

	handleSubmit = () => {
		let titles = this.props.forms.map(form => (form.title));
		if (this.state.title === null) {
			this.setState({ alertMessage: "The title can't be blank!" });
			this.setState({ alertErrorShow: true });
			setTimeout(() => {
				this.setState({ alertErrorShow: false });
			}, 2500);
		}
		else if (this.state.description === null) {
			this.setState({ alertMessage: "The description can't be blank!" });
			this.setState({ alertErrorShow: true });
			setTimeout(() => {
				this.setState({ alertErrorShow: false });
			}, 2500);
		}
		else if (titles.includes(this.state.title)) {
			this.setState({ alertMessage: `${this.state.title} has already been used!` });
			this.setState({ alertErrorShow: true });
			setTimeout(() => {
				this.setState({ alertErrorShow: false });
			}, 3000);
		}
		else {
			this.setState({
				show: false,
				alertErrorShow: false
			});

			let currentIDs = this.props.forms.map(form => form.id);
			let addID = 0;
	
			while (currentIDs.includes(addID)) {
				addID += 1;
			}
	
			axios.post("http://localhost:3001/api/postData", {
				id: addID,
				title: this.state.title,
				description: this.state.description
			})
			.then(
				this.setState({
					title: null,
					description: null
				})
			)

		}
	}

	handleShow() {
		this.setState({
			show: true
		});
	}

	handleClose() {
		this.setState({
			show: false,
			title: null,
			description: null
		});
	}

	render() {
		return (
			<>
				<button
					type="button"
					className="floatButton"
					id="AddFormButton"
					onClick={() => this.handleShow()}
				>
					<i className="fas fa-plus" />
				</button>

				<Modal
					show={this.state.show}
					onHide={this.handleClose}
					centered
					size="lg"
				>
					<Modal.Header id="CreateFormHeader">
						<Modal.Title>New Form</Modal.Title>
						<i
							className="fas fa-times modalDismiss"
							onClick={() => this.handleClose()}
						/>
					</Modal.Header>
					<Modal.Body>
						<Container id="CreateFormContainer">
							<Row>
								<h5>Title</h5>
							</Row>
							<Row className="mb-4">
								<textarea
									type="text"
									placeholder="Title goes here"
									rows="1"
									onChange={e => this.changeTitle(e)}
									className="CreateFormTextArea p-1"
								/>
							</Row>
							<Row>
								<h5>Description</h5>
							</Row>
							<Row>
								<textarea
									type="text"
									placeholder="Description goes here"
									rows="5"
									onChange={e => this.changeDescription(e)}
									className="CreateFormTextArea p-1"
								/>
							</Row>
						</Container>
					</Modal.Body>
					<Modal.Footer id="CreateFormFooter">
						<Button variant="primary" onClick={() => this.handleSubmit()}>
							Submit
            </Button>
						<Button variant="secondary" onClick={() => this.handleClose()}>
							Close
            </Button>
					</Modal.Footer>
				</Modal>

				<Alert
					variant="danger"
					show={this.state.alertErrorShow}
					className="alert"
				>
					<Alert.Heading>
						Error
            <i
							className="fas fa-times alertDismiss"
							onClick={() => this.setState({ alertErrorShow: false })}
						/>
					</Alert.Heading>
					<p>{this.state.alertMessage}</p>
				</Alert>
			</>
		);
	}
}

export default CreateForm;