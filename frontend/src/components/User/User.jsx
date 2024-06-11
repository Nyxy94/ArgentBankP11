import React from "react";
import Button from "../Button/Button";
import accounts from "../../data/accounts.json";
import Account from "../Account/Account";
import "./User.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function User() {
    const userProfile = useSelector(state => state.user.userProfile); // Accédez à l'ensemble du profil utilisateur
    const username = userProfile ? userProfile.userName : null; // Vérifiez si userProfile est défini avant d'accéder à userName
    const navigate = useNavigate();
    const handleDisplayEdit = (e) => {
        e.preventDefault()
        navigate("/editUser");
    };
    return (
        <main className="main bg-dark2">
            <div className="header">
                <h1>
                    Welcome back <br />
                    {username && `${username}!`} {/* Affichez username s'il est défini */}
                </h1>

                <Button className={"edit-button"} btnText={"Edit Name"} onClick={handleDisplayEdit}/>
            </div>
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
