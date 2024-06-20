import React, { useState } from "react";
import EditName from "../EditName/EditName";
import accounts from "../../data/accounts.json";
import Account from "../Account/Account";
import "./User.scss";
import { useSelector } from "react-redux";

function User() {
  // Stocke les informations du profil utilisateur depuis l'état global Redux.
  const userProfile = useSelector(state => state.user.userProfile);
  // Extrait le userName de userProfile si celui-ci existe, sinon il est null
  const username = userProfile ? userProfile.userName : null;

  const [isEditingName, setIsEditingName] = useState(false);

  const handleEditNameClick = () => {
    setIsEditingName(true);
  };

  const handleCloseEditName = () => {
    setIsEditingName(false);
  };

  return (
    <main className="main bg-dark2">
      {!isEditingName ? (
        <div className="header">
          <h1>
            Welcome back <br />
            {username && `${username}!`}
          </h1>
          <button className={"edit-button"} onClick={handleEditNameClick}>
            Edit Name
          </button>
        </div>
      ) : (
        <EditName onClose={handleCloseEditName} />
      )}

      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <Account
          key={"account" + index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
}

export default User;
