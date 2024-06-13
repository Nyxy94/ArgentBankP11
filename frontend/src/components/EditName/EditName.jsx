import React, { useState } from "react";
import Button from "../Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchChangeUsername, selectUserProfile, selectUserStatus, selectUserError } from "../../redux/userSlice.js";
import "./EditName.scss";

function EditName({ onClose }) {
  const dispatch = useDispatch();

  const userProfile = useSelector(selectUserProfile);
  const userStatus = useSelector(selectUserStatus);
  const userError = useSelector(selectUserError);

  const [newUserName, setNewUserName] = useState(userProfile?.userName || "");
  const token = useSelector((state) => state.login.userToken);

  const handleChangeUserName = (e) => {
    setNewUserName(e.target.value);
  };

  const handleCancel = () => {
    onClose(); // Appeler la fonction onClose pour fermer le formulaire
  };

  const handleForm = async (e) => {
    e.preventDefault();
    dispatch(fetchChangeUsername({ newUsername: newUserName, token }));
    onClose(); // Fermer le formulaire après la soumission
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in">
        <i className="fa fa-user-circle sign-in__icon"></i>
        <h1>Edit User info</h1>
        <form onSubmit={handleForm} onClick={(event) => event.stopPropagation()}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              value={newUserName}
              onChange={handleChangeUserName}
              type="text"
              id="username"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              disabled
              value={userProfile?.firstName || ""}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              disabled
              value={userProfile?.lastName || ""}
            />
          </div>
          <Button btnText={"Save"} className={"sign-in__button"} />
        </form>
        <Button btnText={"Cancel"} onClick={handleCancel} className={"sign-in__button"} />
        {userStatus === 'loading' && <p>Updating username...</p>}
        {userStatus === 'failed' && <p>Error: {userError}</p>}
      </section>
    </main>
  );
}

export default EditName;
