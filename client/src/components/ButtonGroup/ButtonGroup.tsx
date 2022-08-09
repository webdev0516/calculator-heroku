// Internal Dependencies
import Button from "../Button";
import './style.css';

interface IButtonGroup {
    handleClick: (name: string) => void;
}
const buttons = ['7', '8', '9', '*', '4', '5', '6', '-', '1', '2', '3', '+', '/', '0', '.', '='];

const ButtonGroup = ({handleClick}: IButtonGroup) => {
    return (
        <div>
            <Button name={'C'} type={true} handleClick={handleClick}/>
            <div className="buttons">
                {buttons.map(button => (
                    <Button key={button} name={button} type={(/[0-9]/.test(button))} handleClick={handleClick}/>
                ))}
            </div>
        </div>
    )
};

export default ButtonGroup;