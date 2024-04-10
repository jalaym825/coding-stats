import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import React from 'react'
import image from '../assets/codeforces.png'

export const CodeForces = ({ Data }) => {
  return (
    <>
      {

        Data ?
          <Card className='shadow' style={{ width: '15rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>Codeforces</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Rating: {Data.rating} (Max: {Data.maxRating})</ListGroup.Item>
              <ListGroup.Item>Rank: {Data.rank} (Max: {Data.maxRank})</ListGroup.Item>
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
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><Placeholder xs={7} />  <Placeholder xs={4} /></ListGroup.Item>
              <ListGroup.Item><Placeholder xs={4} />{' '}<Placeholder xs={6} /> </ListGroup.Item>
              <ListGroup.Item><Placeholder xs={8} /></ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href={`https://codeforces.com/profile/${import.meta.env.VITE_codeforces}`}>Profile</Card.Link>
            </Card.Body>
          </Card>
      }
    </>
  )
}
