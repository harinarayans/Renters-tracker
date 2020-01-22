import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from "react-redux";
import './LinearProgressBar.css'
export default function LinearBuffer() {
    const showLinearProgressBar = useSelector(state => state.globalReducer.showLinearProgressBar);
    const [completed, setCompleted] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);

    const progress = React.useRef(() => { });
    React.useEffect(() => {
        progress.current = () => {
            if (completed > 100) {
                setCompleted(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setCompleted(completed + diff);
                setBuffer(completed + diff + diff2);
            }
        };
    });

    React.useEffect(() => {
        function tick() {
            progress.current();
        }
        const timer = setInterval(tick, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <React.Fragment>
            {showLinearProgressBar ?
                <div className="progress-bar-div">
                    <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} />
                </div> : null
            }
        </React.Fragment>
    );
}
