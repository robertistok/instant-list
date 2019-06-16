import React from "react";
import styled from "styled-components";

import {
  Box,
  Button,
  FormField,
  Grid,
  Heading,
  ResponsiveContext,
  Select,
  TextInput
} from "grommet";
import { Add, Trash } from "grommet-icons";

const MEASUREMENT_UNITS = ["grams", "kilograms", "liters", "mililiters"];

const IngredientCard = ({ index, ingredient, handleChange }) => {
  const ingredientNumber = 1;
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMedium = ["medium", "small"].includes(size);

        return (
          <StyledGrid
            a11yTitle={`Ingredient number ${ingredientNumber}`}
            gap={isMedium ? "xsmall" : "medium"}
            key={ingredient.id || "new-ingredient"}
          >
            <Heading className="info" level="4" margin="small">
              {isMedium ? `Nr. ${ingredientNumber}` : `${ingredientNumber}.`}
            </Heading>
            <FormField className="name" required>
              <TextInput
                a11yTitle="Enter the name of the ingredient"
                name="name"
                onChange={handleChange}
                placeholder="Name"
                value={ingredient.name}
              />
            </FormField>
            <FormField className="quantity" required>
              <TextInput
                a11yTitle="Enter the quantity"
                name="quantity"
                onChange={handleChange}
                placeholder="Quantity"
                type="number"
                value={ingredient.quantity}
              />
            </FormField>
            <FormField className="measurement" required>
              <Select
                a11yTitle="Select the measurement unit for this ingredient"
                name="measurementUnit"
                onChange={handleChange}
                options={MEASUREMENT_UNITS}
                placeholder="Measure"
                value={ingredient.measurementUnit}
              />
            </FormField>

            <Box
              align="center"
              className="action-buttons"
              direction="row"
              justify={isMedium ? "start" : "end"}
              gap="small"
            >
              <Button label="New" icon={<Add />} />
              <Button label="Delete" icon={<Trash />} />
            </Box>
          </StyledGrid>
        );
      }}
    </ResponsiveContext.Consumer>
  );
};

const StyledGrid = styled(Grid)`
  grid-template-columns: 2% 26% 13% 17% auto;

  @media screen and (max-width: ${({ theme }) => theme.global.breakpoints.medium.value}px) {
    border: var(--lightBorder);
    padding: 10px;
    grid-template-columns: [start] 1fr [middle] 1fr [end];
    grid-template-rows: [start] 1fr [first-row] 1fr [second-row] 1fr [third-row] 1fr [end];

    .info {
      grid-column-start: start;
      grid-column-end: end;
      grid-row-start: start;
    }

    .name {
      grid-column-start: start;
      grid-column-end: end;
      grid-row-start: first-row;
    }

    .quantity {
      grid-column-start: start;
      grid-column-end: middle;
      grid-row-start: second-row;
    }

    .measurement {
      grid-column-start: middle;
      grid-column-end: end;
      grid-row-start: second-row;
    }

    .action-buttons {
      grid-column-start: start;
      grid-column-end: end;
      grid-row-start: third-row;
    }
  }
`;

export default IngredientCard;
