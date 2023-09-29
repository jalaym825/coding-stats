import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import React from 'react'
import image from '../assets/leetcode.png'

export const Leetcode = ({ Data }) => {
  return (
    Data.loaded ?
      <Card className='shadow' style={{ width: '15rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>LeetCode</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Easy Problems: {Data.matchedUser.submitStats.acSubmissionNum[1].count}</ListGroup.Item>
          <ListGroup.Item>Medium Problems: {Data.matchedUser.submitStats.acSubmissionNum[2].count}</ListGroup.Item>
          <ListGroup.Item>Hard Problems: {Data.matchedUser.submitStats.acSubmissionNum[3].count}</ListGroup.Item>
          <ListGroup.Item>Total Problems: {Data.matchedUser.submitStats.acSubmissionNum[0].count}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          <Card.Link href={`https://leetcode.com/${import.meta.env.VITE_leetcode}`}>Profile</Card.Link>
        </Card.Body>
      </Card>
      :
      <Card className='shadow' style={{ width: '15rem' }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>LeetCode</Card.Title>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
          <Card.Link href={`https://leetcode.com/${import.meta.env.VITE_leetcode}`}>Profile</Card.Link>
        </Card.Body>
      </Card>

  )
}