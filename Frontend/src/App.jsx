import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Leetcode } from './Cards/Leetcode';
import { GeeksForGeeks } from './Cards/GeeksForGeeks';
import { CodeChef } from './Cards/CodeChef';
import { CodeForces } from './Cards/CodeForces';
import { OverAll } from './Cards/OverAll';

export const App = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BackendServerURL
  });

  const [LCData, setLCData] = useState(null);
  const [GFGData, setGFGData] = useState(null);
  const [CCData, setCCData] = useState(null);
  const [CFData, setCFData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        instance.get(`/leetcode/${import.meta.env.VITE_leetcode}`).then((leetcodeResponse) => {
          for(let i = 0; i < 999999; i++){
            // console.log('This is a test');
          }
          setLCData(leetcodeResponse.data);
        })

        instance.get(`/geeksforgeeks/${import.meta.env.VITE_geeksforgeeks}`).then((gfgResponse) => {
          setGFGData(gfgResponse.data);
        })

        instance.get(`/codechef/${import.meta.env.VITE_codechef}`).then((ccResponse) => {
          setCCData(ccResponse.data);
        })

        instance.get(`/codeforces/${import.meta.env.VITE_codeforces}`).then((cfResponse) => {
          setCFData(cfResponse.data);
        })
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array

  return (
    <>
      <Container className='mt-3'>
        <Row>
          <Col>
            <Container className='p-0 pt-3 d-flex justify-content-center'>
              <Leetcode Data={LCData}></Leetcode>
            </Container>
          </Col>

          <Col>
            <Container className='p-0 pt-3 d-flex justify-content-center'>
              <CodeChef Data={CCData}></CodeChef>
            </Container>
          </Col>

          <Col>
            <Container className='p-0 pt-3 d-flex justify-content-center'>
              <GeeksForGeeks Data={GFGData}></GeeksForGeeks>
            </Container>
          </Col>

          <Col>
            <Container className='p-0 pt-3 d-flex justify-content-center'>
              <CodeForces Data={CFData}></CodeForces>
            </Container>
          </Col>

          <Col>
            <Container className='p-0 pt-3 d-flex justify-content-center'>
              <OverAll Data={{ LCData, GFGData, CCData, CFData }}></OverAll>
            </Container>
          </Col>
        </Row>
        <Row className='my-5'>
          {/* Additional rows if needed */}
        </Row>
      </Container>
    </>
  );
};
