import React, { Component } from 'react';
import { Container, Row } from "react-bootstrap";
import Form from "./components/Form";
import CreateForm from "./components/CreateForm";
import "./styles/App.css";

class App extends Component {

  state = {
    forms: [],
    intervalSet: false
  };

  componentDidMount() {
    this.getData();

    if (!this.state.intervalSet) {
      let interval = setInterval(this.getData, 500);
      this.setState({ intervalSet: interval });
    }
  };

  componentWillUnmount() {
    if (this.state.intervalSet) {
      clearInterval(this.state.intervalSet);
      this.setState({ intervalSet: null });
    }
  };

  getData = () => {
    fetch("http://localhost:3001/api/getData")
      .then(res => res.json())
      .then(res => this.setState({ forms: res.data }))
  };

  render() {
    const forms = this.state.forms;
    console.log(forms);

    return (
      <Container fluid="true" className="AppContainer">

        {forms.length <= 0
          ? <div className="vertical-center">
            <Row>
              <h1>There's nothing here!</h1>
            </Row>
            <Row>
              <h3>Click on the button in the corner to add something.</h3>
            </Row>
            </div>
          : forms.map(form => (
            <Form key={form.id}
              id={form.id} 
              _id={form._id} 
              title={form.title}
              description={form.description}
            />
          ))
        }

        <CreateForm forms={this.state.forms} />

      </Container>
    );
  }
}

export default App;