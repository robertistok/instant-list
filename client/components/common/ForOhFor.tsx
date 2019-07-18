import React from "react";

interface ForOfForProps {
  message: string;
}

const ForOhFor: React.FunctionComponent<ForOfForProps> = ({ message = "Not found..." }) => {
  return <span>{message}</span>;
};

export default ForOhFor;
