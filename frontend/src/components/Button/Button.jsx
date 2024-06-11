import PropTypes from "prop-types"

function Button({btnText, onClick, className}) {

 return (

<button className={className} onClick={onClick}>{btnText}</button>

 )
}

Button.propTypes = {
    btnText: PropTypes.string.isRequired,
    onClick : PropTypes.func,
    className : PropTypes.string
}

export default Button;