import React, { useState, useEffect } from "react";
import PaxRow from "./PaxRow";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getApi } from "../../Client";
import { useParams, useHistory } from "react-router-dom";

const PaxContainer = (props) => {
  const history = useHistory();
  const { regionId } = useParams();
  const [pax, setPax] = useState([]);

  useEffect(() => {
    getApi("/user", (err, data) => {
      if (err) throw err;
      setPax(data);
    });
  }, [regionId]);

  const newPax = () => {
    let path = "/region/" + regionId + "/pax";
    history.push(path);
  };

  return (
    <Container>
      <Row>
        <Col className="offset-md-10 pt-3">
          <Button variant="primary" type="button" onClick={newPax}>
            Add Pax
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="p-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Full Name</th>
                  <th>Email Address</th>
                </tr>
              </thead>
              <tbody>
                {!pax ? (
                  <tr>
                    <td colSpan="4">Loading</td>
                  </tr>
                ) : (
                  pax.map((thePax) => {
                    return <PaxRow key={thePax.email} pax={thePax} />;
                  })
                )}
              </tbody>
            </Table>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default PaxContainer;
