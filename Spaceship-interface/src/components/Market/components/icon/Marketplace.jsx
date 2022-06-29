import React from "react";
import styled from "styled-components";

const Marketplace = () => {
    return (
        <Marketplaces>
            <svg xmlns="http://www.w3.org/2000/svg" width={36} height={37} viewBox="0 0 36 37" fill="none">
                <g clipPath="url(#clip0_2_134)">
                    <path d="M6.05345 14.8213C6.11266 14.0836 6.44755 13.3953 6.99143 12.8934C7.53531 12.3916 8.24827 12.113 8.98833 12.1131H26.7359C27.476 12.113 28.1889 12.3916 28.7328 12.8934C29.2767 13.3953 29.6116 14.0836 29.6708 14.8213L30.8527 29.5398C30.8852 29.9449 30.8335 30.3523 30.7008 30.7363C30.5682 31.1204 30.3574 31.4729 30.0819 31.7715C29.8063 32.0702 29.4719 32.3085 29.0997 32.4716C28.7276 32.6347 28.3256 32.7189 27.9193 32.719H7.80496C7.39861 32.7189 6.99669 32.6347 6.6245 32.4716C6.25231 32.3085 5.91791 32.0702 5.64236 31.7715C5.36681 31.4729 5.15607 31.1204 5.02341 30.7363C4.89075 30.3523 4.83905 29.9449 4.87156 29.5398L6.05345 14.8213V14.8213Z" stroke="white" strokeWidth="2.17" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M23.7495 16.5287V9.16942C23.7495 7.60798 23.1292 6.1105 22.0251 5.00639C20.921 3.90229 19.4235 3.28201 17.8621 3.28201C16.3006 3.28201 14.8032 3.90229 13.6991 5.00639C12.5949 6.1105 11.9747 7.60798 11.9747 9.16942V16.5287" stroke="white" strokeWidth="2.17" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_2_134">
                        <rect width="35.998" height={36} fill="white" transform="translate(0 0.491913)" />
                    </clipPath>
                </defs>
            </svg>

        </Marketplaces>
    );
};

const Marketplaces = styled.div`
    display: flex;
    align-items: center;
    width: 25px;
`;
export default React.memo(Marketplace);
