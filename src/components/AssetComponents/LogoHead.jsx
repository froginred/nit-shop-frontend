import React from 'react';

const LogoHead = ({ primary, className = '', onError }) => {
    try {
        const customStyle = {
            '--logo-primary': primary || 'currentColor',


        };

        return (
            <svg
                className={`brand-logo ${className}`}
                style={customStyle}
                viewBox="0 0 304.18 326.25"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
            >
                <polygon
                    fill="var(--logo-primary, currentColor)"
                    points="283.29 252.28 295.58 305.05 239.28 323.56 283.29 252.28"
                />
                <polygon
                    fill="var(--logo-primary, currentColor)"
                    points="121.6 101.67 242.54 96.16 304.18 224.78 284.81 231.62 121.6 101.67"
                />
                <polygon
                    fill="var(--logo-primary, currentColor)"
                    points="286.27 54.22 243.92 85.68 154.73 89.74 286.27 54.22"
                />
                <path
                    fill="var(--logo-primary, currentColor)"
                    d="M0,128.43C5.93,22.3,72.17,0,126.74,0a209.06,209.06,0,0,1,40,3.94L102.41,95.32,92.2,268.54,26.07,325.3Z"
                />
                <polygon
                    fill="var(--logo-primary, currentColor)"
                    points="177.52 6.67 292.55 41.75 120.05 88.33 177.52 6.67"
                />
                <polygon
                    fill="var(--logo-primary, currentColor)"
                    points="102.67 267.85 112.12 107.42 278.64 240.01 225.38 326.25 102.67 267.85"
                />
            </svg>
        );
    } catch (err) {
        if (onError) onError(err);
        return null;
    }
};

export default LogoHead;
