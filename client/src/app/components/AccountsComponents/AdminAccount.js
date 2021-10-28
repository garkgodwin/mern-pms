import React, { useState } from "react";
import { Switch, Route, Link } from "react-router-dom";

//?COMPONENTS
import Accounts from "./Accounts";
import AccountForm from "./AccountForm";

const AdminAccount = ({ type }) => {
  const [accountId, setAccountId] = useState(0);
  return (
    <div className="px-5">
      {type === 1 ? (
        <div>
          <h5>Admin Accounts</h5>
          <div className="bg-light text-dark mb-2">
            <Link to="/accounts" className="me-2">
              Account List
            </Link>
            <Link to="/accounts/form">Form</Link>
          </div>
          <Switch>
            <Route path="/accounts/form">
              <AccountForm accountId={accountId} setAccountId={setAccountId} />
            </Route>
            <Route path="/accounts">
              <Accounts setAccountId={setAccountId} />
            </Route>
          </Switch>
        </div>
      ) : null}
    </div>
  );
};
export default AdminAccount;
