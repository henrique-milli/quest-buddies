import React from 'react';
import './progressBar.css'; // Import the CSS file for styling

interface ProgressBarProps {
    counter: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ counter }) => {
    return (
        <div className="progress-bar">
            <div className={`slot ${counter >= 1 ? 'filled' : ''}`}></div>
            <div className={`slot ${counter >= 2 ? 'filled' : ''}`}></div>
            <div className={`slot ${counter >= 3 ? 'filled' : ''}`}></div>
        </div>
    );
};

export default ProgressBar;