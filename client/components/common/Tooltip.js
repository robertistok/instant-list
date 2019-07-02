import React, { useState } from "react";

import { Box, Drop } from "grommet";

const Tooltip = ({ children, label, align = { top: "bottom" } }) => {
  const [ref] = useState(React.createRef());
  const [over, setOver] = useState(false);

  const onMouseEnter = () => setOver(true);
  const onMouseLeave = () => setOver(false);

  return (
    <>
      {children({ ref, onMouseEnter, onMouseLeave })}
      {ref.current && over && (
        <Drop align={align} target={ref.current} plain>
          <Box margin="xsmall" pad="small">
            {label}
          </Box>
        </Drop>
      )}
    </>
  );
};

export default Tooltip;
