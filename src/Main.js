import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import {Form, Row, Container} from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Weather from "./Weather.js"
import Movies from "./Movies"

class Main extends React.Component {
  render() {




    let weather = this.props.weatherData.map((weather, idx) => {
      return (<Weather
        key={idx}
        showForecast = {this.props.showForeCast}
        error = {this.props.error}
        errorMessage = {this.props.errorMessage}
        handleSubmit = {this.props.handleSubmit}
        weatherData={weather}
      />);
    });


    let movies = this.props.moviesData.map((movie, idx) => {
      return (<Movies
        key={idx}
        error = {this.props.error}
        errorMessage = {this.props.errorMessage}
        handleSubmit = {this.props.handleSubmit}
        moviesData={movie}
      />);
    });

    
    return (
      <>
        <Form onSubmit={this.props.handleCitySubmit}>
          <Form.Group>
            <Form.Label>Enter a city name</Form.Label>
            <Form.Control
              name='city'
              onInput={this.props.handleCity}
              placeholder='"Seattle", "San Francisco"'
              type='text'
            ></Form.Control>
            <Button type='submit' variant='primary'>
              Explore!
            </Button>{" "}
          </Form.Group>
        </Form>
        {this.props.showCard ? (
          <p> </p>
        ) : this.props.error ? (
          <p>{this.props.errorMessage}</p>
        ) : (
          <Card>
            <Card.Body>
              <Card.Title>{this.props.cityData.display_name}</Card.Title>
              <Card.Img variant='top' src={this.props.mapURL} />
              <Card.Text></Card.Text>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item>'Lat: {this.props.cityData.lat}'</ListGroup.Item>
              <ListGroup.Item>'Lon: {this.props.cityData.lon}'</ListGroup.Item>
            </ListGroup>
          </Card>
        )}
        {weather}
      <Container>
          <Row xs={1} sm={2} md={3} lg={4}>
            {movies}
          </Row>
      </Container>    
      </>
    );
  }
}

export default Main;
