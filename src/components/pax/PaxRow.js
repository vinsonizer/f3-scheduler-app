import React from "react";

const PaxRow = (props) => {
  return (
    <tr>
      <td>
        <a href={`/pax/${props.pax.username}`}>{props.pax.nickname}</a>
      </td>
      <td>{props.pax.name}</td>
      <td>{props.pax.email}</td>
    </tr>
  );
};
export default PaxRow;
