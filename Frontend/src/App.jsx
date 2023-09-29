import { Container, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Leetcode } from './Cards/Leetcode';
import { GeeksForGeeks } from './Cards/GeeksForGeeks';
import { CodeChef } from './Cards/CodeChef';
import { CodeForces } from './Cards/CodeForces';
import { OverAll } from './Cards/OverAll';

export const App = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BackendServerURL
  })
  const [LCData, setLCData] = useState({ loaded: false });
  const [GFGData, setGFGData] = useState({ loaded: false });
  const [CCData, setCCData] = useState({ loaded: false });
  const [CFData, setCFData] = useState({ loaded: false });

  useEffect(() => {
    const plateForms = [`/leetcode/${import.meta.env.VITE_leetcode}`, `/geeksforgeeks/${import.meta.env.VITE_geeksforgeeks}`, `/codechef/${import.meta.env.VITE_codechef}`, `/codeforces/${import.meta.env.VITE_codeforces}`];
    Promise.all(plateForms.map(plateForm => {
      instance.get(plateForm)
        .then((res) => res.data)
        .then((d) => {
          d.loaded = true
          if (plateForm.includes('leetcode'))
            setLCData(d)
          else if (plateForm.includes('geeksforgeeks'))
            setGFGData(d)
          else if (plateForm.includes('codechef'))
            setCCData(d)
          else
            setCFData(d)
        })
    }))
  }, [])
  return (
    <>
      <Container className='mt-3'>
        <Row>
          <Col>
            <Container className='p-0 d-flex justify-content-center'>
              <Leetcode Data={LCData}></Leetcode>
            </Container>
          </Col>

          <Col>
            <Container className='p-0 d-flex justify-content-center'>
              <CodeChef Data={CCData}></CodeChef>
            </Container>
          </Col>

          <Col>
            <Container className='p-0 d-flex justify-content-center'>
              <GeeksForGeeks Data={GFGData}></GeeksForGeeks>
            </Container>
          </Col>
          <Col>
            <Container className='p-0 d-flex justify-content-center'>
              <CodeForces Data={CFData}></CodeForces>
            </Container>
          </Col>
          <Col>
            <Container className='p-0 d-flex justify-content-center'>
              <OverAll Data={{ LCData, GFGData, CCData, CFData }}></OverAll>
            </Container>
          </Col>
        </Row>
        <Row className='my-5'>
        </Row>
      </Container>
    </>
  )
}