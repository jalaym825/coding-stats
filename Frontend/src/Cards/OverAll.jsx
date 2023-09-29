import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import React from 'react'
import image from '../assets/coding.png'
export const OverAll = ({ Data }) => {
    return (
        Data.LCData.loaded && Data.GFGData.loaded && Data.CCData.loaded && Data.CFData.loaded ?
            <Card className='shadow' style={{ width: '15rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>Overall Stats</Card.Title>
                </Card.Body>

                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Total Problems: {Data.LCData.matchedUser.submitStats.acSubmissionNum[0].count + Data.GFGData.score_cards.total_problem_solved + Data.CCData.problems_solved.fully_solved + Data.CFData.problems_solved}</ListGroup.Item>
                </ListGroup>
            </Card>
            :
            <Card className='shadow' style={{ width: '15rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>Overall Stats</Card.Title>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                        <Placeholder xs={6} /> <Placeholder xs={8} />
                    </Placeholder>
                </Card.Body>
            </Card>

    )
}
