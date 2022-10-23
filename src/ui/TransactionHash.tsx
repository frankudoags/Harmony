import React from "react";

import { AnchorLink } from "./AnchorLink";

// @ts-ignore
export const TransactionHash = ({ hash, link = 'tx' }) => {
  const url = `/`;
  return <AnchorLink to={url} label={hash} />;
};
