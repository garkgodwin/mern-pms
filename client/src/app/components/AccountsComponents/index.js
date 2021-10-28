import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

//?COMPONENTS
import AdminAccount from "./AdminAccount";
const AccountsContent = ({ type }) => {
  return (
    <div className="px-5">
      {type === 1 ? <AdminAccount type={type} /> : null}
    </div>
  );
};
export default AccountsContent;
