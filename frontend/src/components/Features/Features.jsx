import { PropTypes } from "prop-types";
import "./Features.scss"


function Feature({ alt, image, paragraph, title }) {

    return (
        <div className="featureItem">
            <img src={image} alt={alt} className="featureItem__icon" />
            <h3 className="featureItem__title">{title}</h3>
            <p>{paragraph}</p>
        </div>
    )
}

Feature.propTypes = {
    paragraph: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
};

export default Feature;