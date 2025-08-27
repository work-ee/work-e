"use client";

import { cn } from "@/lib/utils";

export const SvgPuzzleSpinner = ({ ...props }) => {
  return (
    <div className={cn("h-[26rem] w-[26rem] overflow-visible p-4", props.className)}>
      <style jsx>{`
        @keyframes floatPiece1 {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          15% {
            transform: translate(-8px, -12px) rotate(8deg) scale(1.05);
          }
          30% {
            transform: translate(-4px, -18px) rotate(15deg) scale(1.02);
          }
          45% {
            transform: translate(6px, -15px) rotate(8deg) scale(0.98);
          }
          60% {
            transform: translate(10px, -10px) rotate(-5deg) scale(1.03);
          }
          75% {
            transform: translate(8px, -6px) rotate(-12deg) scale(0.97);
          }
          90% {
            transform: translate(-2px, -8px) rotate(-8deg) scale(1.01);
          }
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes floatPiece2 {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          12% {
            transform: translate(12px, -8px) rotate(-10deg) scale(0.95);
          }
          25% {
            transform: translate(15px, -15px) rotate(-18deg) scale(1.06);
          }
          40% {
            transform: translate(6px, -20px) rotate(-12deg) scale(1.01);
          }
          55% {
            transform: translate(-4px, -18px) rotate(5deg) scale(0.99);
          }
          70% {
            transform: translate(-10px, -12px) rotate(15deg) scale(1.04);
          }
          85% {
            transform: translate(-6px, -6px) rotate(10deg) scale(0.96);
          }
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes floatPiece3 {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
          18% {
            transform: translate(-8px, -10px) rotate(12deg) scale(1.03);
          }
          35% {
            transform: translate(-15px, -6px) rotate(20deg) scale(0.97);
          }
          50% {
            transform: translate(-18px, -15px) rotate(12deg) scale(1.05);
          }
          65% {
            transform: translate(-10px, -20px) rotate(-8deg) scale(1.02);
          }
          80% {
            transform: translate(4px, -18px) rotate(-16deg) scale(0.98);
          }
          95% {
            transform: translate(2px, -8px) rotate(-5deg) scale(1.01);
          }
          100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .puzzle-piece-1 {
          animation:
            floatPiece1 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite,
            pulse 2s ease-in-out infinite;
          transform-origin: center;
        }

        .puzzle-piece-2 {
          animation:
            floatPiece2 5s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.2s,
            pulse 2.3s ease-in-out infinite 0.5s;
          transform-origin: center;
        }

        .puzzle-piece-3 {
          animation:
            floatPiece3 4.2s cubic-bezier(0.4, 0, 0.2, 1) infinite 2.1s,
            pulse 2.7s ease-in-out infinite 1s;
          transform-origin: center;
        }
      `}</style>

      <svg viewBox="-30 -30 484 505" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
        <g>
          <path
            className="puzzle-piece-1"
            d="M75.5299 175.624L11.2549 177.868C10.4158 161.362 8.63032 125.277 8.20101 112.983C7.7717 100.689 13.366 100.423 16.2168 101.827C23.2599 107.948 52.7815 110.896 53.887 89.9005C54.9925 68.9052 31.7302 64.6773 19.9675 73.8421C10.5574 81.174 7.17221 73.4931 6.65588 68.7362L4.50009 7.00257L68.7751 4.75804C74.3719 4.56259 83.9659 6.50892 77.5681 15.8578C69.5708 27.5438 72.3029 54.6587 94.8111 50.8024C116.222 47.1341 111.556 26.343 106.164 14.8592C101.851 5.67216 107.425 3.31995 110.751 3.29222L173.452 1.10265L175.496 59.6569C175.839 69.4601 182.592 74.7949 187.138 69.5959C191.685 64.3969 221.784 53.7959 222.24 81.8991C222.605 104.382 204.26 103.572 195.042 100.357C181.869 90.206 177.485 96.5489 176.94 100.989L179.419 171.996L121.178 174.03C105.437 174.579 102.066 170.807 102.348 168.851C112.627 147.271 108.09 130.186 89.9047 128.434C71.7195 126.681 67.5768 150.966 74.984 159.992C80.9098 167.212 77.817 173.422 75.5299 175.624Z"
            fill="#2D52B3"
            stroke="#0B266E"
            strokeWidth="2"
          />
          <path
            className="puzzle-piece-2"
            d="M232.5 134.799V70.7839C249.025 70.5226 285.151 70 297.452 70C309.754 70 309.824 75.5741 308.322 78.3612C301.959 85.1546 297.983 114.419 318.926 116.248C339.87 118.077 344.908 95.0835 336.159 83.0643C329.16 73.449 336.954 70.3484 341.726 70H403.497V134.015C403.497 139.589 401.217 149.065 392.098 142.376C380.698 134.015 353.504 135.791 356.572 158.315C359.491 179.74 380.433 175.821 392.098 170.856C401.43 166.885 403.586 172.511 403.497 175.821V238.268H344.908C335.098 238.268 329.531 244.8 334.568 249.504C339.605 254.207 349.149 284.516 321.048 283.993C298.566 283.575 300.015 265.355 303.55 256.297C314.155 243.546 307.969 238.965 303.55 238.268H232.5V180.263C232.5 164.586 236.388 161.363 238.332 161.711C259.541 172.685 276.774 168.766 279.16 150.737C281.546 132.709 257.421 127.744 248.142 134.799C240.718 140.443 234.621 137.151 232.5 134.799Z"
            fill="#FF812E"
            stroke="#FF6600"
            strokeWidth="2"
          />
          <path
            className="puzzle-piece-3"
            d="M240.597 351.193L251.765 414.531C235.537 417.659 200.051 424.449 187.937 426.585C175.822 428.721 174.78 423.218 175.773 420.2C180.854 412.374 179.665 382.729 158.72 384.556C137.776 386.383 136.826 410.008 147.539 420.38C156.109 428.679 148.974 433.1 144.335 434.273L83.5025 445L72.3345 381.662C71.362 376.147 71.9542 366.376 82.1025 371.41C94.7878 377.703 121.259 371.224 114.307 349.472C107.695 328.78 87.7555 336.294 77.1338 343.232C68.6365 348.782 65.5314 343.589 65.0411 340.299L54.1465 278.513L111.846 268.339C121.506 266.636 125.85 259.206 120.068 255.428C114.287 251.649 99.6005 223.318 127.367 218.955C149.58 215.465 151.331 233.744 149.43 243.32C141.211 257.777 148.103 261.236 152.575 261.158L222.546 248.82L232.666 306.211C235.401 321.722 232.134 325.586 230.158 325.579C207.357 318.404 191.07 325.274 191.866 343.526C192.661 361.778 217.286 362.501 225.193 353.91C231.519 347.037 238.098 349.235 240.597 351.193Z"
            fill="#78AAE3"
            stroke="#5095C0"
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};
