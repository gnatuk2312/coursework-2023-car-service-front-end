import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Currency } from "@/common/enums/common.enums";
import { createSparePartRequest } from "@/common/services/api/spare-part/spare-part.api";
import { SparePartInterface } from "@/common/types/entities.types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (sparePart: SparePartInterface) => void;
};

const CreateSparePartDialog: FC<Props> = (props) => {
  const { isOpen, onClose, onSuccessSubmit } = props;

  const [title, setTitle] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>(Currency.UAH);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };
  const handleBrandChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setBrand(event.target.value);
  };
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPrice(event.target.value);
  };
  const handleCurrencyChange = (event: SelectChangeEvent<Currency>): void => {
    setCurrency(event.target.value as Currency);
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    await createSparePartRequest({
      body: { title, brand, price: Number(price), currency },
    }).then((response) => {
      if (!!onSuccessSubmit) onSuccessSubmit(response);
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="p">
          Додати запчастину
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          id="create-spare-part-dialog-form"
          component="form"
          spacing={2}
          py={2}
          onSubmit={handleSubmit}
        >
          <TextField
            value={title}
            onChange={handleTitleChange}
            required
            label="Назва"
          />
          <TextField
            value={brand}
            onChange={handleBrandChange}
            required
            label="Бренд"
          />
          <TextField
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
            label="Ціна"
          />
          <Select value={currency} onChange={handleCurrencyChange}>
            <MenuItem value={Currency.UAH}>{Currency.UAH}</MenuItem>
            <MenuItem value={Currency.USD}>{Currency.USD}</MenuItem>
          </Select>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="create-spare-part-dialog-form"
          variant="outlined"
        >
          Створити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSparePartDialog;
