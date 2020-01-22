import React from "react";
import LoaderIcon from "./Loader";
import TrophyIcon from "./Trophy";

type Props = {
  name: "loader" | "trophy";
  width: string;
  height: string;
  className?: string;
  data?: any;
};

const Icon: React.FC<Props> = ({ width, height, name, className, data }) => {
  if (name === "loader") {
    return <LoaderIcon width={width} height={height} />;
  }

  if (name === "trophy") {
    return <TrophyIcon className={className} width={width} height={height} />;
  }
  return null;
};

export default Icon;
