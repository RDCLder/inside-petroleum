import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Form.css";
import axios from "axios";

class Form extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			id: parseInt(this.props.id),
			_id: this.props._id,
			title: this.props.title,
			description: this.props.description,
			updateTitle: null,
			updateDescription: null
		};
	}

	updateForm = (updateTitle) => {
		axios.post("http://localhost:3001/api/updateData", {
			id: this.state._id,
			update: {
				title: updateTitle
			}
		});
	};

	deleteForm = () => {
		axios.delete("http://localhost:3001/api/deleteData", {
			data: {
				id: this.state._id
			}
		});
	};

	render() {
		return (
			<Container className="FormContainer">

				<Row className="FormRow FormHeader">
					<Col xs={10} className="my-auto">
						<h4>{this.state.id + 1}. {this.state.title}</h4>
					</Col>
					<Col xs={2} className="my-auto">
						<button className="FormButton"
							id="deleteButton"
							onClick={() => this.deleteForm()}
						>
							<i className="fas fa-times" />
						</button>
						{/* <button className="FormButton"
							id="updateButton"
							onClick={() => this.updateForm()}
						>
							<i className="fas fa-pencil-alt" />
						</button> */}
					</Col>
				</Row>
				<Row className="FormRow FormBody">
					<p>{this.state.description}</p>
				</Row>

			</Container>
		);
	}
}

export default Form;