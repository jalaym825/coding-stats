import { Card, ListGroup, Placeholder } from 'react-bootstrap'
import React from 'react'
import image from '../assets/coding.png'
export const OverAll = ({ Data }) => {
    return (
        <>
            {
                Data.LCData && Data.GFGData && Data.CCData && Data.CFData ?
                    <Card className='shadow' style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={image} />
                        <Card.Body>
                            <Card.Title>Overall Stats</Card.Title>
                        </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>Total Problems: {Data.LCData.problems.matchedUser.submitStatsGlobal.acSubmissionNum[0].count + Data.GFGData.problems_solved + Data.CCData.problems_solved + Data.CFData.problems_solved}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    :
                    <Card className='shadow' style={{ width: '15rem' }}>
                        <Card.Img variant="top" src={image} />
                        <Card.Body>
                            <Card.Title>CodeChef</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroup.Item><Placeholder xs={5} /> <Placeholder xs={4} /></ListGroup.Item>
                        </ListGroup>
                    </Card>
            }
        </>
    )
}
