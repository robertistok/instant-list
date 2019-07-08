import React, { useState, useRef } from "react";

import { Box, Drop } from "grommet";

const Tooltip = ({ children, label, align = { top: "bottom" } }) => {
  const ref = useRef(null);
  const [over, setOver] = useState(false);

  const onMouseEnter = () => setOver(true);
  const onMouseLeave = () => setOver(false);

  return (
    <>
      {children({ ref, onMouseEnter, onMouseLeave })}
      {ref.current && over && (
        <Drop align={align} target={ref.current} plain>
          <Box margin="xsmall" pad="small" background={label ? "dark-3" : "inherit"}>
            {label}
          </Box>
        </Drop>
      )}
    </>
  );
};

export default Tooltip;
