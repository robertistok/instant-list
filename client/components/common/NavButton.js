import styled from "styled-components";
import { Button } from "grommet";

const NavButton = ({ as, className, handleSignOut, label, icon, ...rest }) => {
  return (
    <StyledButton
      as={as}
      className={className}
      color="white"
      icon={icon}
      label={label}
      margin="xsmall"
      onClick={handleSignOut}
      pad="medium"
      plain
      reverse
      {...rest}
    />
  );
};

const StyledButton = styled(Button)`
  padding: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

export default NavButton;
