import React from "react";

type Props = {
  width: string;
  height: string;
  className?: string;
};

const TrophyIcon = ({ width, height, className }: Props) => (
  <svg
    height={height}
    width={width}
    className={className}
    viewBox="0 0 464 464"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m96 224c-35.347656 0-64-28.652344-64-64v-96h160v-32h-192v128c0 53.019531 42.980469 96 96 96h96v-32zm0 0"
      fill="#ffa754"
    />
    <path
      d="m368 224c35.347656 0 64-28.652344 64-64v-96h-160v-32h192v128c0 53.019531-42.980469 96-96 96h-96v-32zm0 0"
      fill="#ffa754"
    />
    <path d="m88 0h288v160c0 79.527344-64.472656 144-144 144s-144-64.472656-144-144zm0 0" fill="#fdd020" />
    <path d="m136 432h192c17.671875 0 32 14.328125 32 32h-256c0-17.671875 14.328125-32 32-32zm0 0" fill="#fdd020" />
    <path d="m208 336h48v96h-48zm0 0" fill="#ffa754" />
    <path
      d="m200 304h64c8.835938 0 16 7.164062 16 16s-7.164062 16-16 16h-64c-8.835938 0-16-7.164062-16-16s7.164062-16 16-16zm0 0"
      fill="#cf7642"
    />
  </svg>
);

export default TrophyIcon;
