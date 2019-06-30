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

const MEASUREMENT_UNITS = ["Gram", "Kilogram", "Liter", "Mililiter", "Teaspoon", "Tablespoon"];

const IngredientCard = ({
  addIngredient,
  deleteIngredient,
  ingredientNumber,
  isFirstIngredient,
  isLastIngredient,
  handleInputChange,
  measurementUnit = "",
  name,
  quantity = "",
  id
}) => {
  return (
    <ResponsiveContext.Consumer>
      {size => {
        const isMedium = ["medium", "small"].includes(size);

        return (
          <StyledGrid
            a11yTitle={`Ingredient number ${ingredientNumber}`}
            gap={isMedium ? "xsmall" : "medium"}
          >
            <Heading className="info" level="4" margin="small">
              {isMedium ? `Nr. ${ingredientNumber}` : `${ingredientNumber}.`}
            </Heading>

            <FormField
              a11yTitle="Description for your new recipe"
              className="name"
              component={TextInput}
              name={`name-${id}`}
              onChange={handleInputChange}
              placeholder="Name"
              required
              value={name}
            />

            <FormField
              a11yTitle="Enter the quantity"
              className="quantity"
              component={TextInput}
              name={`quantity-${id}`}
              onChange={handleInputChange}
              placeholder="Quantity"
              type="number"
              value={quantity}
            />

            <FormField
              a11yTitle="Select the measurement unit for this ingredient"
              className="measurement-unit"
              component={Select}
              name={`measurementUnit-${id}`}
              onChange={handleInputChange}
              options={MEASUREMENT_UNITS}
              placeholder="Measure"
              value={measurementUnit}
            />

            <Box
              a11yTitle="Delete/add new ingedient button"
              align="center"
              className="action-buttons"
              direction="row"
              justify={isMedium ? "end" : "end"}
              gap="small"
            >
              {isLastIngredient && (
                <Button
                  a11yTitle="Add new ingedient button"
                  label="New"
                  icon={<Add />}
                  onClick={addIngredient}
                />
              )}
              {!isFirstIngredient && (
                <Button
                  a11yTitle={`Delete ingedient ${ingredientNumber} button`}
                  label="Delete"
                  icon={<Trash />}
                  onClick={deleteIngredient}
                />
              )}
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

    .measurement-unit {
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
