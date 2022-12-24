import React from "react";

export default function Header(props) {
  return (
    <div id="footer" className="w-full flex p-2">
      <p>{props.note}</p>
    </div>
  );
}
