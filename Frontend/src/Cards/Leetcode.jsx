import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import React from 'react'
import image from '../assets/leetcode.png'

export const Leetcode = ({ Data }) => {
  return (
    <>
      {
        Data ?
          <Card className='shadow' style={{ width: '14rem' }}>
            <Card.Img variant="top" src={image} />
            <Card.Body>
              <Card.Title>LeetCode</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Rating: {Math.round(Data.rating.userContestRanking.rating)}, Top {Data.rating.userContestRanking.topPercentage}%</ListGroup.Item>
              <ListGroup.Item>Easy Problems: {Data.problems.matchedUser.submitStatsGlobal.acSubmissionNum[1].count}</ListGroup.Item>
              <ListGroup.Item>Medium Problems: {Data.problems.matchedUser.submitStatsGlobal.acSubmissionNum[2].count}</ListGroup.Item>
              <ListGroup.Item>Hard Problems: {Data.problems.matchedUser.submitStatsGlobal.acSubmissionNum[3].count}</ListGroup.Item>
              <ListGroup.Item>Total Problems: {Data.problems.matchedUser.submitStatsGlobal.acSubmissionNum[0].count}</ListGroup.Item>
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
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><Placeholder xs={7} />  <Placeholder xs={4} /></ListGroup.Item>
              <ListGroup.Item><Placeholder xs={4} />{' '}<Placeholder xs={6} /> </ListGroup.Item>
              <ListGroup.Item><Placeholder xs={8} /></ListGroup.Item>
              <ListGroup.Item><Placeholder xs={6} />  <Placeholder xs={5} /></ListGroup.Item>
              <ListGroup.Item><Placeholder xs={9} /></ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Card.Link href={`https://leetcode.com/${import.meta.env.VITE_leetcode}`}>Profile</Card.Link>
            </Card.Body>
          </Card>
      }
    </>
  )
}