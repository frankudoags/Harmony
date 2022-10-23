import React from "react";
import { Box } from "grommet";
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from "../Responive/breakpoints";

const sizes = {
  minWidth: "243px",
  maxWidth: "1280px",
};

export const BaseContainer = (props: any) => {
  const { style } = props;
  const isLessTablet = useMediaQuery({ maxDeviceWidth: breakpoints.tablet });

  return (
    <div className="flex items-center mx-auto">
      <Box
        pad={{ horizontal: isLessTablet ? "12px" : '20px' }}
        {...props}
        style={{ ...sizes, margin:"0 auto", padding:"16px", width: "100%", flex: "1 1 auto", ...style }}
      />
    </div>
  );
};

export const BasePage = (props: any) => {
  const { style } = props;

  return (
    <Box
      pad="medium"
      background="background"
      border={{ size: "xsmall", color: "border" }}
      {...props}
      style={{
        borderRadius: "8px",
        overflow: 'hidden',
        ...style,
      }}
    />
  );
};
