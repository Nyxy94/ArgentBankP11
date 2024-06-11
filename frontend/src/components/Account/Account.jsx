import Button from "../Button/Button";
import { PropTypes } from "prop-types";
import "./Account.scss"


function Account({ title, amount, description }) {
    return (
        <section className="account">
            <div className="account__content">
                <h3 className="account__title">{title}</h3>
                <p className="account__amount">{amount}</p>
                <p className="account__amount--description">{description}</p>
            </div>
            <div className="account__content cta">
                <Button className={"transaction-button"} btnText={"View transactions"}></Button>
            </div>
        </section>
    );
};

Account.propTypes = {
 title: PropTypes.string.isRequired,
 amount: PropTypes.string.isRequired,
 description: PropTypes.string.isRequired,

};


export default Account;