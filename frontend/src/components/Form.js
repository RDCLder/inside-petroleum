import React from 'react';
import { Container, Row, Col, Button } from "react-bootstrap";
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
			<Row>
				<h3>{this.state.title}</h3>
				<br/>
				<p>{this.state.description}</p>
				<Button variant="danger"
					onClick={() => this.deleteForm()}
				>
					Delete
				</Button>
			</Row>
		);
	}
}

export default Form;