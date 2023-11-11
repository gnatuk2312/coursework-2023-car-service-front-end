import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Currency } from "@/common/enums/common.enums";
import { createPerformedWorkRequest } from "@/common/services/api/performed-work/performed-work.api";
import {
  PerformedWorkInterface,
  SparePartInterface,
} from "@/common/types/entities.types";
import { GetAllSparePartsResponseType } from "@/common/services/api/spare-part/spare-part.types";
import { getAllSparePartsRequest } from "@/common/services/api/spare-part/spare-part.api";

type Props = {
  vehicleId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (performedWork: PerformedWorkInterface) => void;
};

const CreatePerformedWorkDialog: FC<Props> = (props) => {
  const { vehicleId, isOpen, onClose, onSuccessSubmit } = props;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [currency, setCurrency] = useState<Currency>(Currency.UAH);
  const [sparePartIds, setSparePartIds] = useState<string[]>([]);
  const [sparePartSearch, setSparePartSearch] = useState<string>("");
  const [spareParts, setSpareParts] = useState<GetAllSparePartsResponseType>({
    data: [],
    totalFiltered: 0,
    total: 0,
  });

  const getAllSpareParts = useCallback(async () => {
    if (sparePartSearch === "") return;

    try {
      const response = await getAllSparePartsRequest({
        query: { take: 5, search: sparePartSearch },
      });
      setSpareParts(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    }
  }, [sparePartSearch]);

  useEffect(() => {
    getAllSpareParts();
  }, [getAllSpareParts]);

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescription(event.target.value);
  };
  const handlePriceChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPrice(event.target.value);
  };
  const handleCurrencyChange = (event: SelectChangeEvent<Currency>): void => {
    setCurrency(event.target.value as Currency);
  };
  const handleSparePartSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSparePartSearch(event.target.value);
  };

  const handleSparePartClick = (id: string): void => {
    if (sparePartIds.includes(id)) {
      setSparePartIds((prev) =>
        prev.filter((sparePartId) => sparePartId !== id)
      );
    } else {
      setSparePartIds((prev) => [...prev, id]);
    }
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const body = {
      title,
      description,
      price: Number(price),
      currency,
      sparePartIds,
      vehicleId,
    };

    await createPerformedWorkRequest({ body }).then((response) => {
      if (!!onSuccessSubmit) onSuccessSubmit(response);
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="p">
          Додати запис про Виконані роботи
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          id="create-performed-work-dialog-form"
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
            value={description}
            onChange={handleDescriptionChange}
            multiline
            minRows={2}
            label="Короткий опис"
          />
          <TextField
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
            label="Ціна"
          />
          <Select
            value={currency}
            label="Валюта"
            onChange={handleCurrencyChange}
          >
            <MenuItem value={Currency.UAH}>{Currency.UAH}</MenuItem>
            <MenuItem value={Currency.USD}>{Currency.USD}</MenuItem>
          </Select>
          <Box>
            <TextField
              value={sparePartSearch}
              onChange={handleSparePartSearchChange}
              fullWidth
              label="Пошук запчастин"
              helperText={`Вибрано ${sparePartIds.length} запчастин`}
            />
            <List>
              {spareParts.data.map((sparePart) => {
                const { id, title, brand, price, currency } = sparePart;

                const selected = sparePartIds.includes(id);

                return (
                  <ListItem
                    key={id}
                    divider
                    onClick={() => handleSparePartClick(id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <ListItemIcon>
                      {selected ? (
                        <CheckCircleIcon color="success" />
                      ) : (
                        <SettingsSuggestIcon />
                      )}
                    </ListItemIcon>
                    <ListItemText primary={title} secondary={brand} />
                    <Typography>
                      {price} {currency}
                    </Typography>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="create-performed-work-dialog-form"
          variant="outlined"
        >
          Створити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePerformedWorkDialog;
