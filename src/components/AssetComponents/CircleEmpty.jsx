import React from 'react';

const CircleEmpty = ({ primary, className = '', onError }) => {
    try {
        const customStyle = {
            '--logo-primary': primary || 'currentColor',

        };

        return (
            <svg
                className={`brand-logo ${className}`}
                style={customStyle}
                viewBox="0 0 393.9 393.9"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
            >
                <path
                    fill="var(--logo-primary, currentColor)"
                    d="M197,0C88.18,0,0,88.18,0,197s88.18,197,197,197,197-88.18,197-196.95S305.72,0,197,0ZM309.4,95.56,176.94,131.32l44.13-62.7Zm-4.82,9.58-32.52,24.15-68.49,3.12Zm-149,164.57L104.77,313.3l-20-151.18c4.56-81.5,55.43-98.62,97.33-98.62a160.22,160.22,0,0,1,30.7,3L163.4,136.69Zm8-.53L170.85,146,298.73,247.8,257.83,314ZM268.49,312l33.8-54.73,9.44,40.51Zm35-70.6L178.13,141.57,271,137.34l47.34,98.77Z"
                />
            </svg>
        );
    } catch (err) {
        if (onError) onError(err);
        return null;
    }
};

export default CircleEmpty;
