import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({ text, type,disabled,to,onClick }) => {
    const className = `btn btn-${type}`;
    return (
        to ?
            <Link to={to} className={className}>{text}</Link>
            :
            <button className={className} onClick={onClick} disabled={disabled}>{text}</button>
    )
}

export default Button;