import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { getApi, postApi } from "../../Client";
import { useParams } from "react-router-dom";

const PaxDetails = (props) => {
  const { regionId, username } = useParams();
  const [thePax, setThePax] = useState({
    username: username,
    name: "",
    nickname: "",
    email: "",
  });

  useEffect(
    (thePax) => {
      console.log("inside with " + username);
      if (username) {
        getApi("/user/" + username, (err, data) => {
          console.log(`got ${JSON.stringify(data)}`);
          if (err) throw err;
          setThePax({
            ...thePax,
            username: data.username,
            name: data.name,
            nickname: data.nickname,
            email: data.email,
          });
        });
      }
    },
    [username]
  );

  //const {regionName, emailAddress, id, location, website} = props.region

  const myChangeHandler = (target, context) => (event) => {
    //console.log("target: " + target + ", context: " + context + ", eventVal: " + event.target.value)
    setThePax({
      ...thePax,
      [target]: context ? context : event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    alert("submitting for " + JSON.stringify(thePax, null, 2));
    /*
    postApi("/regions/" + regionId + "/pax", thePax, function (err, data) {
      if (err) console.log(JSON.stringify(err, null, 2));
      setThePax({
        ...thePax,
        paxId: data.paxId,
        paxName: data.paxName,
        regionId: data.regionId,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        emailAddress: data.emailAddress,
        socialAccounts: data.socialAccounts,
      });
      alert("post save is " + JSON.stringify(thePax, null, 2));
   });
   */
  };

  return (
    <Container>
      <h1>{!thePax.nickname ? "New PAX" : thePax.nickname}</h1>
      <Container className="p-3">
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="gridName">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                placeholder="Enter name"
                value={thePax.nickname}
                onChange={myChangeHandler("nickname")}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="gridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                value={thePax.email}
                onChange={myChangeHandler("email")}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="gridName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                placeholder="Enter full name"
                value={thePax.name}
                onChange={myChangeHandler("name")}
              />
            </Form.Group>
          </Row>

          <Row>
            <Col className="pt-3 pb-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
};
export default PaxDetails;
