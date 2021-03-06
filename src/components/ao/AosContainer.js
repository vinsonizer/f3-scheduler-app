import React, { useState, useEffect } from "react";
import AoRow from "./AoRow";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import { getApi } from "../../Client";

const AosContainer = (props) => {
  const [aos, setAos] = useState([]);
  const [pax, setPax] = useState({});

  useEffect(() => {
    if (props.regionId) {
      getApi("/regions/" + props.regionId + "/aos", (err, data) => {
        if (err) throw err;
        setAos(data);
      });
      getApi("/user", (err, data) => {
        if (err) throw err;
        setPax(
          data.reduce((map, obj) => {
            map[obj.username] = obj;
            return map;
          }, {})
        );
      });
    }
  }, [props.regionId]);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>AO Name</th>
            <th>Type</th>
            <th>Schedule</th>
            <th>Site Q</th>
          </tr>
        </thead>
        <tbody>
          {!aos ? (
            <tr>
              <td colSpan="4">Loading</td>
            </tr>
          ) : (
            aos.map((ao) => {
              //console.log(ao);
              return (
                <AoRow
                  ao={ao}
                  key={ao.aoId}
                  siteQ={ao.siteQId ? pax[ao.siteQId] : {}}
                />
              );
            })
          )}
        </tbody>
      </Table>
    </Container>
  );
};
export default AosContainer;
