import styled from "styled-components";
import { Button } from "grommet";

import Tooltip from "./Tooltip";

const NavButton = ({ as, className, onClick, label, icon, tooltipLabel, ...rest }) => {
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
};

const StyledButton = styled(Button)`
  padding: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

export default NavButton;
