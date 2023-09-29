import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import React from 'react'
import image from '../assets/codechef.png'

export const CodeChef = ({ Data }) => {
  return (
    Data.loaded ?
      <Card className='shadow' style={{ width: '15rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>Codechef</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>{Data.stars} 🌟</ListGroup.Item>
          <ListGroup.Item>Current Rating: {Data.ratings.current}</ListGroup.Item>
          <ListGroup.Item>Highest Rating: {Data.ratings.highest}</ListGroup.Item>
          <ListGroup.Item>Conutry Rank: {Data.ranks.country_rank}</ListGroup.Item>
          <ListGroup.Item>Global Rank: {Data.ranks.global_rank}</ListGroup.Item>
          <ListGroup.Item>Total Problems: {Data.problems_solved.fully_solved}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href={`https://codechef.com/users/${import.meta.env.VITE_codechef}`}>Profile</Card.Link>
        </Card.Body>
      </Card>
      :
      <Card className='shadow' style={{ width: '15rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>Codechef</Card.Title>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Card.Link href={`https://codechef.com/users/${import.meta.env.VITE_codechef}`}>Profile</Card.Link>
        </Card.Body>
      </Card>
  )
}
