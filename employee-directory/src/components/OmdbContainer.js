import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import SearchForm from "./SearchForm";
import MovieDetail from "./MovieDetail";
import API from "../utils/API";

class OmdbContainer extends Component {
  state = {
    employees: [],
    search: ""
  };

  // When this component mounts, search for the movie "The Matrix"
  componentDidMount() {
    this.searchMovies();
  }

  searchMovies = () => {
    API.search()
      .then(res => this.setState({ employees: res.data.results }))
      // .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchMovies(this.state.search);
  };

  handleClick = event => {
    console.log("clicked")
  }

  render() {

    console.log('state',this.state)
    return (
      <Container>
        <Row>
          <Col size="md-8">
            <Card
              heading={"Employee List"}
            >
         <table>
           <thead>
           <tr>
    <th onClick={this.handleClick}>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
  </tr>
     </thead>

<tbody>
{this.state.employees.map((employee, index) => (
      <tr key={index}>
      <td>{employee.name.first} </td>
      <td>{employee.name.last}</td>
      <td>{employee.email}</td>
      </tr>
        ))}

</tbody>
</table>
            </Card>
          </Col>
          <Col size="md-4">
            <Card heading="Search">
              <SearchForm
                value={this.state.search}
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default OmdbContainer;
