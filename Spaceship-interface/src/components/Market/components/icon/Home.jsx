import React from "react";
import styled from "styled-components";

const Home = () => {
    return (
        <Homes>
            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="36" viewBox="0 0 37 36" fill="none">
                <g clipPath="url(#clip0_2_170)">
                    <path d="M30.9017 30.0004C30.9017 30.3982 30.743 30.7798 30.4604 31.0611C30.1778 31.3424 29.7946 31.5004 29.395 31.5004H5.28673C4.88711 31.5004 4.50386 31.3424 4.22129 31.0611C3.93872 30.7798 3.77997 30.3982 3.77997 30.0004V14.2354C3.77981 14.0068 3.83213 13.7812 3.93293 13.5759C4.03373 13.3705 4.18035 13.1908 4.36158 13.0504L16.4157 3.71741C16.6802 3.51258 17.0057 3.40137 17.3409 3.40137C17.676 3.40137 18.0015 3.51258 18.266 3.71741L30.3201 13.0504C30.5014 13.1908 30.648 13.3705 30.7488 13.5759C30.8496 13.7812 30.9019 14.0068 30.9017 14.2354V30.0004ZM27.8882 28.5004V14.9674L17.3409 6.80141L6.7935 14.9674V28.5004H27.8882ZM9.80703 22.5004H24.8747V25.5004H9.80703V22.5004Z" fill="#ffffff" />
                </g>
                <defs>
                    <clipPath id="clip0_2_170">
                        <rect width="35.998" height="36" fill="white" transform="translate(0.137878)" />
                    </clipPath>
                </defs>
            </svg>
        </Homes>
    );
};

const Homes = styled.div`
    display: flex;
    align-items: center;
    width: 25px;
`;
export default React.memo(Home);
