import React from "react";
import {Card, Col} from 'react-bootstrap'

class Movies extends React.Component {



  render() {
    return (
      <>
      {
        this.props.error
        ?
        <p>{this.props.errorMessage}</p>
        :
        <Col>
        <Card className="h-100" style={{width: '18rem'}}>
          <Card.Body>
            <Card.Title>Title: {this.props.moviesData.title}</Card.Title>
            <Card.Img variant="top" src={this.props.moviesData.img} alt= {this.props.moviesData.title}/>
            <Card.Text>{`Overview: ${this.props.moviesData.overview}`}</Card.Text>
          </Card.Body>
        </Card>
        </Col>
      }
      </>
    )
  }
}

export default Movies; 
