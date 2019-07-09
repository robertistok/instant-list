import React from "react";
import styled from "styled-components";
import { Button } from "grommet";

import Tooltip from "./Tooltip";

// if it is not wrapped in a forwardRef, it complains that it cannot accept refs
// however, if I pass down the ref got from the funtion, the tooltip does not work
// weird...
const NavButton = React.forwardRef(
  // eslint-disable-next-line no-unused-vars
  ({ as, className, onClick, label, icon, tooltipLabel, ...rest }, ref) => {
    return (
      <Tooltip label={tooltipLabel}>
        {tooltipProps => (
          <StyledButton
            as={as}
            className={className}
            color="white"
            icon={icon}
            label={label}
            margin="xsmall"
            onClick={onClick}
            pad="medium"
            plain
            reverse
            {...rest}
            {...tooltipProps}
          />
        )}
      </Tooltip>
    );
  }
);

const StyledButton = styled(Button)`
  padding: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

export default NavButton;
