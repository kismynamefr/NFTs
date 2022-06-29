import React from "react";
import styled from "styled-components";

const Logout = () => {
    return (
        <Logouts>
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="44" viewBox="0 0 31 44" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M-1.2499 0.643146C-3.15213 0.216865 -5 1.66312 -5 3.65303V40.0035C-5 42.0433 -3.0788 43.4686 -1.18766 43.0001C-0.645481 43.0736 -0.071312 43.0026 0.483225 42.7537L17.204 35.2462C18.3115 34.749 19.024 33.648 19.024 32.434V8.94734C19.024 7.60088 18.1502 6.41019 16.8656 6.00648L0.144854 0.751272C-0.3273 0.602878 -0.801428 0.573594 -1.2499 0.643146ZM27.8807 7.71422C26.1781 7.71422 24.798 9.09439 24.798 10.7969V29.293C24.798 30.9956 26.1781 32.3757 27.8807 32.3757C27.9035 32.3757 27.9262 32.3755 27.9489 32.375L27.9782 32.3751C29.6268 32.3751 30.9633 31.0386 30.9633 29.39V29.3015L30.9633 29.293V10.7969L30.9633 10.7884V10.6988C30.9633 9.05012 29.6268 7.71362 27.9782 7.71362C27.9557 7.71362 27.9332 7.71387 27.9108 7.71437L27.8807 7.71422Z" fill="url(#paint0_linear_162_239)" />
                <defs>
                    <linearGradient id="paint0_linear_162_239" x1="31" y1="1" x2="-5" y2="43" gradientUnits="userSpaceOnUse">
                        <stop stopColor="rgb(20 235 212)" />
                        <stop offset="1" stopColor="rgb(20 235 212)" />
                    </linearGradient>
                </defs>
            </svg>
        </Logouts>
    );
};

const Logouts = styled.div`
    display: flex;
    align-items: center;
    width: 25px;
`;
export default React.memo(Logout);
