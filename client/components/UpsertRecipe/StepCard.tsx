import React, { useEffect, useState, ChangeEvent } from "react";
import nanoid from "nanoid";
import styled from "styled-components";
import { Box, Button, FormField, Grid, Heading, ResponsiveContext, TextArea } from "grommet";
import { Add, Trash } from "grommet-icons";

import { usePrevious } from "../../hooks/utils";

interface Props {
  addStep: any;
  deleteStep: any;
  description: string;
  handleInputChange(event: ChangeEvent<HTMLInputElement>): void;
  isFirstStep: boolean;
  isLastStep: boolean;
  stepNumber: number;
  totalSteps: number;
}

// TODO formfield resize investigation -- // resize="vertical"
const StepCard: React.FunctionComponent<Props> = React.memo(
  ({
    addStep,
    deleteStep,
    description,
    handleInputChange,
    isFirstStep,
    isLastStep,
    stepNumber,
    totalSteps
  }) => {
    const [stepId, setStepId] = useState();
    const prevTotalSteps: any = usePrevious(totalSteps || 0);
    useEffect(() => setStepId(nanoid()), [prevTotalSteps > totalSteps]);

    // investigate, looks like a hack..
    if (!stepId) {
      return null;
    }

    return (
      <ResponsiveContext.Consumer>
        {size => {
          const isMedium = ["medium", "small"].includes(size);

          return (
            <StyledGrid a11yTitle={`Step number ${stepNumber}`} gap="small">
              <Heading className="info" level="4" margin="small">
                {`${stepNumber}.`}
              </Heading>

              <FormField
                component={TextArea}
                name={`step-${stepId}`}
                onChange={handleInputChange}
                placeholder={`Write step ${stepNumber}`}
                required
                value={description}
              />

              <Box
                a11yTitle="Delete/add new ingedient button"
                align="center"
                className="action-buttons"
                direction="row"
                justify="end"
                gap="small"
              >
                {isLastStep && (
                  <Button
                    a11yTitle="Add new step button"
                    hoverIndicator
                    icon={<Add />}
                    label={isMedium ? "" : "Next"}
                    onClick={addStep}
                  />
                )}

                {!isFirstStep && (
                  <Button
                    a11yTitle={`Delete step ${stepNumber} button`}
                    hoverIndicator
                    icon={<Trash />}
                    label={isMedium ? "" : "Delete"}
                    onClick={deleteStep}
                  />
                )}
              </Box>
            </StyledGrid>
          );
        }}
      </ResponsiveContext.Consumer>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.totalSteps === nextProps.totalSteps &&
      prevProps.description === nextProps.description
    );
  }
);

const StyledGrid = styled(Grid)`
  grid-template-columns: 2% 59% auto;

  @media screen and (max-width: ${({ theme }) => theme.global.breakpoints.medium.value}px) {
    grid-template-columns: 7% 60% auto;
  }
`;

export default StepCard;
