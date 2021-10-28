import React from "react";

const FormBox = (props) => {
  return (
    <div className="form w-50 h-auto d-flex flex-column p-3 border border-warning">
      {props.children}
    </div>
  );
};
export default FormBox;
