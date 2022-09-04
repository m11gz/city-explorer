import React from "react";
import axios from "axios";
import Main from "./Main.js";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityData: {},
      weatherData: [],
      error: false,
      errorMessage: "",
      showCard: true,
      moviesData: [], 
    };
  }

  handleCity = (e) => {
    let city = e.target.value;

    this.setState({
      city: city,
    });
  };

  handleCitySubmit = async (e) => {
    e.preventDefault();
    let city = await this.helpMap();
    this.helpWeather(city);
    this.helpMovies(this.state.city);

    // let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`;
  };

  helpMap = async () => {
    try {
      let response = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`
      );
      console.log(response);
      this.setState({
        cityData: response.data[0],
        mapURL: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${response.data[0].lat},${response.data[0].lon}&zoom=12`,
        showCard: false,
      });
      return response.data[0];
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `Oh oh! It seems like an error has occured: ${error.response.status}`,
        showCard: false,
      });
    }
  };

  helpWeather = async (input) => {
    try {
       let urlWeather = `${process.env.REACT_APP_SERVER}/weather?lat=${input.lat}&lon=${input.lon}&format=json`;
      //  console.log(this.state);
       console.log(urlWeather);
      let response = await axios.get(urlWeather
      );
      this.setState({
        error: false,
        showForecast: false,
        weatherData: response.data,
      });
      console.log(response.data);
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`,
      });
      console.log(error);
      console.log(error.response.status)
    }

  }

  helpMovies = async (input) => {
    try {
       let urlMovies = `${process.env.REACT_APP_SERVER}/movies?title=${input}`;
       console.log(urlMovies);
      let response = await axios.get(urlMovies
      );
      this.setState({
        error: false,
        moviesData: response.data,
      });
      console.log(response.data);
    } catch (error) {
      this.setState({
        error: true,
        errorMessage: `An Error Occurred: ${error.response.status}`,
      });
      console.log(error);
      console.log(error.response.status)
    }

  }

  render() {
    return (
      <>
        console.log(cityData);
        <Main
          city={this.state.city}
          cityData={this.state.cityData}
          error={this.state.error}
          errorMessage={this.state.errorMessage}
          handleCity={this.handleCity}
          handleCitySubmit={this.handleCitySubmit}
          mapURL={this.state.mapURL}
          showCard={this.state.showCard}
          weatherData={this.state.weatherData}
          moviesData={this.state.moviesData}
        />
      </>
    );
  }
}
export default App;
