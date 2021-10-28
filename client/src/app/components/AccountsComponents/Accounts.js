import React, { useEffect, useState } from "react";

//?API
import { fetchAllAccounts } from "../../api/accountAPI";

//?COMPONENTS
import Account from "./Account";
const Accounts = ({ setAccountId }) => {
  const [accounts, setAccounts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);
  useEffect(() => {
    if (isUpdated) {
      setIsUpdated(false);
      fetchAccounts();
    }
  }, [isUpdated]);

  const fetchAccounts = async () => {
    const result = await fetchAllAccounts();
    if (result.isSuccess) {
      const data = result.data;
      setAccounts(data);
    } else {
      setAccounts([]);
    }
  };
  return (
    <div className="row ">
      {accounts.map((account) => {
        return (
          <Account
            key={account.id}
            setAccountId={setAccountId}
            setIsUpdated={setIsUpdated}
            account={account}
          />
        );
      })}
    </div>
  );
};
export default Accounts;
