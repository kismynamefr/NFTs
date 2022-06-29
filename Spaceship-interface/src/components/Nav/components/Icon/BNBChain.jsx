import React from "react";
import styled from "styled-components";

const BNBChain = ({ width, height }) => {
  return (
    <BNBChains>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="Layer_1"
        width={width}
        height={height}
        data-name="Layer 1"
        viewBox="0 0 152 152"
      >
        <defs>
          <style
            dangerouslySetInnerHTML={{
              __html:
                ".cls-1{fill:#ffbf2a;stroke:#fff;stroke-miterlimit:10;stroke-width:2px;}.cls-2{fill:#fff;}",
            }}
          />
        </defs>
        <g id="_ÎÓÈ_1" data-name="—ÎÓÈ_1">
          <circle className="cls-1" cx={76} cy={76} r={75} />
          <rect
            className="cls-2"
            x="36.36"
            y="68.12"
            width="15.76"
            height="15.76"
            transform="translate(-40.78 53.54) rotate(-45)"
          />
          <rect
            className="cls-2"
            x="99.88"
            y="68.12"
            width="15.76"
            height="15.76"
            transform="translate(-22.18 98.46) rotate(-45)"
          />
          <rect
            className="cls-2"
            x="68.97"
            y="68.97"
            width="14.07"
            height="14.07"
            transform="translate(-31.48 76) rotate(-45)"
          />
          <polygon
            className="cls-2"
            points="76 55.38 91.28 70.67 102.43 59.52 76 33.09 49.57 59.52 60.72 70.67 76 55.38"
          />
          <polygon
            className="cls-2"
            points="76 96.62 60.72 81.33 49.57 92.48 76 118.91 102.43 92.48 91.28 81.33 76 96.62"
          />
        </g>
      </svg>
    </BNBChains>
  );
};

const BNBChains = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
`;

export default React.memo(BNBChain);
