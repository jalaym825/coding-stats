import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import React from 'react'
import image from '../assets/gfg.png'

export const GeeksForGeeks = ({ Data }) => {
  return (
    <>
      {

        Data ?
          <Card className='shadow' style={{ width: '14rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>GeeksForGeeks</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Institue Rank: {Data.rank}</ListGroup.Item>
              {/* <ListGroup.Item>Monthly Coding Score: {Data.score_cards.monthly_coding_score}</ListGroup.Item>
          <ListGroup.Item>Overall Coding Score: {Data.score_cards.overall_coding_score}</ListGroup.Item> */}
              <ListGroup.Item>Total Problems: {Data.problems_solved}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href={`https://auth.geeksforgeeks.org/user/${import.meta.env.VITE_codeforces}`}>Profile</Card.Link>
            </Card.Body>
          </Card>
          :
          <Card className='shadow' style={{ width: '15rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>CodeChef</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><Placeholder xs={7} />  <Placeholder xs={4} /></ListGroup.Item>
              <ListGroup.Item><Placeholder xs={4} />{' '}<Placeholder xs={6} /> </ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href={`https://auth.geeksforgeeks.org/user/${import.meta.env.VITE_codeforces}`}>Profile</Card.Link>
            </Card.Body>
          </Card>
      }
    </>
  )
}
