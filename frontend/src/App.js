import React, { Component } from 'react';
import { Container, Row, Pagination } from "react-bootstrap";
import Form from "./components/Form";
import CreateForm from "./components/CreateForm";
import "./styles/App.css";

class App extends Component {

  state = {
    forms: [],
    currentPage: 1,
    formsPerPage: 5,
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

    // Forms on the current page
    const { forms, currentPage, formsPerPage } = this.state;
    const indexLastForm = currentPage * formsPerPage;
    const indexFirstForm = indexLastForm - formsPerPage;
    const currentForms = forms.slice(indexFirstForm, indexLastForm);
    const renderForms = currentForms.map(form => (
      <Form key={form.id}
        id={form.id}
        _id={form._id}
        title={form.title}
        description={form.description}
      />
    ));

    // Pagination
    let active = this.state.currentPage;
    let pages = [];
    for (let i = 1; i <= Math.ceil(forms.length / formsPerPage); i++) {
      pages.push(
        <Pagination.Item key={i}
          id={i}
          active={i === active}
          onClick={(e) => this.setState({ currentPage: e.target.id })}
        >
          {i}
        </Pagination.Item>
      );
    }

    return (
      <Container fluid="true" className="AppContainer">

        {forms.length <= 0
          ? <div className="true-center">
            <Row>
              <h1>There's nothing here!</h1>
            </Row>
            <Row>
              <h3>Click on the button in the corner to add something.</h3>
            </Row>
          </div>
          : <div>
              {renderForms}
            <Pagination id="pageContainer">{pages}</Pagination>
          </div>
        }

        <CreateForm forms={this.state.forms} />

      </Container>
    );
  }
}

export default App;