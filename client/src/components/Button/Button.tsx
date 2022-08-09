// Internal Dependencies
import './style.css';

interface IButton {
    name: string;
    type: boolean;
    handleClick: (name: string) => void;
}
const Button = ({name, type, handleClick}: IButton) => {
    return (
        <button
            id={`btn-${name}`}
            className={type ? 'number': 'operator'}
            onClick={() => handleClick(name)}>
                {name}
        </button>
    )
};

export default Button;