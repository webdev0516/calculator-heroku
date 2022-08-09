// Internal Dependencies
import './style.css';

interface DisplayProps {
    result: string | null;
    loading: boolean;
}

const Display =  ({ result, loading }: DisplayProps) => {
    return (
        <div id={"display"} className={'display'}>
            {result}
        </div>
    );
};

export default Display;
