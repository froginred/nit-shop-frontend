import React from 'react';

const LogoDetail = ({ primary, className = '', onError }) => {
    try {
        const customStyle = {
            '--logo-primary': primary || 'currentColor',


        };

        return (
            <svg
                className={`brand-logo ${className}`}
                style={customStyle}
                viewBox="0 0 443.8 566.06"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
            >
                <path
                    fill="var(--logo-primary, currentColor)"
                    d="M206.08,566.06C82.81,566.06,0,544.77,0,524.88c0-13.11,35.88-26.38,91.76-34.06l-4.27,9.48L37.42,527.85l1,3.75,82-2.47,38.15-44.28c15.5-.76,31.47-1.14,47.48-1.14,25.69,0,50.76,1,74.54,2.85l0,7-4.17,24.36,68,26.85L328,508.19l5-15.51c48.92,7.86,79.22,20.15,79.22,32.2C412.16,544.77,329.35,566.06,206.08,566.06Z"
                />
                <polygon fill="var(--logo-primary, currentColor)" points="126.7 398.91 183.55 323.66 266.4 324.61 191.9 424.99 126.7 398.91" />
                <polygon fill="var(--logo-primary, currentColor)" points="91.49 501.17 96.88 489.18 134.26 406.24 193.28 429.85 230.19 380.12 303.18 406.58 210.67 418.29 119.28 524.36 91.49 501.17" />
                <polygon fill="var(--logo-primary, currentColor)" points="88.81 504.14 114.18 525.32 46.62 527.35 88.81 504.14" />
                <polygon fill="var(--logo-primary, currentColor)" points="232.68 376.76 270.43 325.9 347.01 418.21 232.68 376.76" />
                <polygon fill="var(--logo-primary, currentColor)" points="284.6 493.9 284.87 412.92 311.42 409.56 350.76 423.82 324.9 504.7 281.35 512.92 284.6 493.9" />
                <polygon fill="var(--logo-primary, currentColor)" points="285.89 516.13 325.2 508.72 336.69 537.02 285.89 516.13" />
                <polygon fill="var(--logo-primary, currentColor)" points="215.21 200.4 213.67 178.18 260.59 200.51 311.47 222.01 275.77 248.02 278.04 255.26 215.21 200.4" />
                <polygon fill="var(--logo-primary, currentColor)" points="282.95 167.69 287.68 187.97 266.03 195.09 282.95 167.69" />
                <polygon fill="var(--logo-primary, currentColor)" points="220.79 109.78 267.29 107.67 290.98 157.12 283.54 159.75 220.79 109.78" />
                <polygon fill="var(--logo-primary, currentColor)" points="284.1 91.55 267.82 103.64 233.53 105.2 284.1 91.55" />
                <path
                    fill="var(--logo-primary, currentColor)"
                    d="M174.05,120.07c2.28-40.79,27.74-49.37,48.72-49.37a79.82,79.82,0,0,1,15.37,1.52l-24.72,35.12-3.93,66.6-25.42,21.82Z"
                />
                <polygon fill="var(--logo-primary, currentColor)" points="165.23 259.21 131.2 220.94 212.87 203.67 280.32 262.56 282.67 270.1 165.23 259.21" />
                <polygon fill="var(--logo-primary, currentColor)" points="184.07 319.67 167.81 263.47 283.96 274.24 287.39 285.21 269.13 320.65 184.07 319.67" />
                <polygon fill="var(--logo-primary, currentColor)" points="109.35 253.49 64.33 195.84 84.33 176.51 125.96 221.06 160.41 259.81 109.35 253.49" />
                <polygon fill="var(--logo-primary, currentColor)" points="242.29 73.27 286.51 86.75 220.2 104.66 242.29 73.27" />
                <polygon fill="var(--logo-primary, currentColor)" points="179.28 23.02 105.71 137.21 103.41 139.26 83.95 118.62 179.28 23.02" />
                <polygon fill="var(--logo-primary, currentColor)" points="230.59 0 220.69 34.94 116.86 127.29 192.44 10 230.59 0" />
                <polygon fill="var(--logo-primary, currentColor)" points="30.95 172.01 83.35 157.31 82.45 172.76 61.44 193.07 30.95 172.01" />
                <polygon fill="var(--logo-primary, currentColor)" points="64.65 140.01 70.66 144.96 70.81 145.08 81.29 153.73 34.18 166.96 64.65 140.01" />
                <polygon fill="var(--logo-primary, currentColor)" points="73.27 141.93 73.19 141.87 67.19 136.59 60.18 115.46 80.11 120.38 101.36 142.92 103.88 168.82 73.27 141.93" />
                <polygon fill="var(--logo-primary, currentColor)" points="38.84 182.32 57.12 194.95 35.7 201.56 38.84 182.32" />
                <polygon fill="var(--logo-primary, currentColor)" points="213.52 173.67 217.15 112 281.17 162.97 260.69 196.12 213.52 173.67" />
                <polygon fill="var(--logo-primary, currentColor)" points="287.38 271.77 283.97 260.83 280.45 249.56 341.22 205.31 407.2 217.9 315.75 362.61 287.38 271.77" />
                <polygon fill="var(--logo-primary, currentColor)" points="318 366.54 410.04 220.9 443.8 307.21 401.4 408.56 318 366.54" />
            </svg>
        );
    } catch (err) {
        if (onError) onError(err);
        return null;
    }
};

export default LogoDetail;
