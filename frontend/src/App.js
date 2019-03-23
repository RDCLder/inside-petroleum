import React, { Component } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import Form from "./components/Form";
import axios from "axios";

class App extends Component {

  state = {
    forms: [],
    title: null,
    description: null,
    intervalSet: false,
    // deleteID: null,
    // updateID: null,
    // updateTitle: null
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

  // Get all data from DB
  getData = () => {
    fetch("http://localhost:3001/api/getData")
      .then(res => res.json())
      .then(res => this.setState({ forms: res.data }))
    // .then(res => console.log(res.data))
  };

  // Post new data to DB
  postData = (title) => {
    let currentIDs = this.state.forms.map(form => form.id);
    let addID = 0;

    while (currentIDs.includes(addID)) {
      addID += 1;
    }

    console.log(currentIDs, addID);
    axios.post("http://localhost:3001/api/postData", {
      id: addID,
      title: title
    });
  };

  // // Update existing data in DB
  // updateData = (updateID, updateTitle) => {
  //   let objectID = null;

  //   this.state.forms.forEach(form => {
  //     if (form.id === parseInt(updateID)) {
  //       objectID = form._id;
  //     }
  //   });

  //   axios.post("http://localhost:3001/api/updateData", {
  //     id: objectID,
  //     update: {
  //       title: updateTitle
  //     }
  //   });
  // };

  // // Delete data from DB
  // deleteData = deleteID => {
  //   let objectID = null;

  //   this.state.forms.forEach(form => {
  //     if (form.id === parseInt(deleteID)) {
  //       objectID = form._id;
  //     }
  //   });

  //   axios.delete("http://localhost:3001/api/deleteData", {
  //     data: {
  //       id: objectID
  //     }
  //   });
  // };

  render() {
    const forms = this.state.forms;

    return (
      <Container>

        <div style={{ padding: "10px" }}>
          <input
            type="text"
            onChange={e => this.setState({ title: e.target.value })}
            placeholder="Title"
            style={{ width: "200px" }}
          />
          <button onClick={() => this.postData(this.state.title)}>
            ADD
          </button>
        </div>

        {/* <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ deleteID: e.target.value })}
            placeholder="ID"
          />
          <button onClick={() => this.deleteData(this.state.deleteID)}>
            DELETE
          </button>
        </div> */}

        {/* <div style={{ padding: "10px" }}>
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateID: e.target.value })}
            placeholder="id of item to update here"
          />
          <input
            type="text"
            style={{ width: "200px" }}
            onChange={e => this.setState({ updateTitle: e.target.value })}
            placeholder="put new value of the item here"
          />
          <button
            onClick={() =>
              this.updateData(this.state.updateID, this.state.updateTitle)
            }
          >
            UPDATE
          </button>
        </div> */}

        {forms.length <= 0
          ? "Empty"
          : forms.map(form => (
            <Form key={form.id}
              id={form.id} 
              _id={form._id} 
              title={form.title}
              description={form.description}
            />
            // <li
            //   style={{ padding: "10px" }}
            //   key={form.id}
            // >
            //   <h2 style={{ color: "gray" }}>{form.title}</h2>
            //   <br />
            //   <p style={{ color: "gray" }}>{form.description}</p>
            // </li>
          ))
        }

      </Container>
    );
  }
}

export default App;