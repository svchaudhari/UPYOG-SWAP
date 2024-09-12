
import PropTypes from "prop-types";
import React from "react";
import { WeightBold4 } from "./../icons/WeightBold4";
import { WeightDuotone4 } from "./../icons/WeightDuotone4";
import { WeightFill4 } from "./../icons/WeightFill4";
import { WeightLight4 } from "./../icons/WeightLight4";
import { WeightRegular4 } from "./../icons/WeightRegular4";
import { WeightThin4 } from "./../icons/WeightThin4";
import "./style.css";

export const Stairs = ({ weight }) => {
  return (
    <>
      {weight === "regular" && <WeightRegular4 className="instance-node" />}

      {weight === "thin" && <WeightThin4 className="instance-node" />}

      {weight === "light" && <WeightLight4 className="instance-node" />}

      {weight === "bold" && <WeightBold4 className="instance-node" />}

      {weight === "fill" && <WeightFill4 className="instance-node" />}

      {weight === "duotone" && <WeightDuotone4 className="instance-node" />}
    </>
  );
};

Stairs.propTypes = {
  weight: PropTypes.oneOf(["duotone", "regular", "thin", "bold", "fill", "light"]),
};
