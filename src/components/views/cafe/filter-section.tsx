import { Form } from "react-final-form";
import CustomTextField from "../../custom-text-field/custome-text-field";
import { IconButton, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export interface FilterProps {
  location: string;
}
interface FilterSectionProps {
  onSubmit: (e: FilterProps) => void;
}

const FilterSection = (props: FilterSectionProps) => {
  const filter = (e: FilterProps) => {
    props.onSubmit(e);
  };

  const clearFilter = () => {
    props.onSubmit({
      location: "",
    });
  };

  return (
    <Form
      onSubmit={filter}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={1}>
            <CustomTextField name="location" label="Location" />
            <IconButton color="primary" type="submit" aria-label="filter">
              <SearchIcon />
            </IconButton>
            <IconButton
              color="warning"
              type="button"
              aria-label="clear"
              onClick={clearFilter}
            >
              <ClearIcon />
            </IconButton>
          </Stack>
        </form>
      )}
    />
  );
};

export default FilterSection;
