import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import React from 'react'
import image from '../assets/codeforces.png'

export const CodeForces = ({ Data }) => {
  return (
    Data.loaded ?
      <Card className='shadow' style={{ width: '15rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>Codeforces</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Current Rating & Rank: {Data.ratings.current}, {Data.user_rank.current}</ListGroup.Item>
          <ListGroup.Item>Highest Rating & Rank: {Data.ratings.max}, {Data.user_rank.max[0].toUpperCase() + Data.user_rank.max.slice(1)}</ListGroup.Item>
          <ListGroup.Item>Total Problems: {Data.problems_solved}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href={`https://codeforces.com/profile/${import.meta.env.VITE_codeforces}`}>Profile</Card.Link>
        </Card.Body>
      </Card>
      :
      <Card className='shadow' style={{ width: '15rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>Codeforces</Card.Title>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Card.Link href={`https://codeforces.com/profile/${import.meta.env.VITE_codeforces}`}>Profile</Card.Link>
        </Card.Body>
      </Card>

  )
}
