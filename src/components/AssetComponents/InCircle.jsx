import React from 'react';

const InCircle = ({ primary, secondary, stroke, className = '', onError }) => {
    try {
        const customStyle = {
            '--logo-primary': primary || '#1d1d1b',
            '--logo-secondary': secondary || '#ffffff',
            '--logo-stroke': stroke || primary || '#1d1d1b',
            ...(size ? { width: size, height: size } : {}),

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
                {/* background */}
                <circle
                    cx="196.95"
                    cy="196.95"
                    r="196.95"
                    fill="var(--logo-primary, currentColor)"
                />

                {/* foreground */}
                <polygon
                    points="297.7 257.23 307.14 297.74 263.9 311.96 297.7 257.23"
                    fill="var(--logo-secondary, #fff)"
                    stroke="var(--logo-stroke, currentColor)"
                    strokeMiterlimit="10"
                />
                <polygon
                    points="173.54 141.57 266.41 137.34 313.74 236.11 298.87 241.36 173.54 141.57"
                    fill="var(--logo-secondary, #fff)"
                    stroke="var(--logo-stroke, currentColor)"
                    strokeMiterlimit="10"
                />
                <polygon
                    points="299.99 105.14 267.47 129.29 198.97 132.41 299.99 105.14"
                    fill="var(--logo-secondary, #fff)"
                    stroke="var(--logo-stroke, currentColor)"
                    strokeMiterlimit="10"
                />
                <path
                    d="M80.16,162.12c4.55-81.5,55.42-98.62,97.32-98.62a160.13,160.13,0,0,1,30.7,3L158.8,136.69l-7.84,133L100.17,313.3Z"
                    fill="var(--logo-secondary, #fff)"
                    stroke="var(--logo-stroke, currentColor)"
                    strokeMiterlimit="10"
                />
                <polygon
                    points="216.48 68.62 304.81 95.56 172.35 131.32 216.48 68.62"
                    fill="var(--logo-secondary, #fff)"
                    stroke="var(--logo-stroke, currentColor)"
                    strokeMiterlimit="10"
                />
                <polygon
                    points="159 269.18 166.26 145.98 294.13 247.8 253.23 314.03 159 269.18"
                    fill="var(--logo-secondary, #fff)"
                    stroke="var(--logo-stroke, currentColor)"
                    strokeMiterlimit="10"
                />
            </svg>
        );
    } catch (err) {
        if (onError) onError(err);
        return null;
    }
};

export default InCircle;
