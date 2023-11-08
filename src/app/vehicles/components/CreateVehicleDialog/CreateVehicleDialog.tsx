import { ChangeEvent, FC, FormEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchForClient from "@/components/SearchForClient";
import { createVehicleRequest } from "@/common/services/api/vehicle/vehicle.api";
import { removeNullKeys } from "@/common/utils/common.utils";
import {
  ClientInterface,
  VehicleInterface,
} from "@/common/types/entities.types";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (vehicle: VehicleInterface) => void;
};

const CreateVehicleDialog: FC<Props> = (props) => {
  const { isOpen, onClose, onSuccessSubmit } = props;

  const [brand, setBrand] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [licensePlate, setLicensePlate] = useState<string>("");
  const [engine, setEngine] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [ownerId, setOwnerId] = useState<string | null>(null);

  const handleBrandChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setBrand(event.target.value);
  };
  const handleModelChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setModel(event.target.value);
  };
  const handleYearChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setYear(event.target.value);
  };
  const handleLicensePlateChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setLicensePlate(event.target.value);
  };
  const handleEngineChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEngine(event.target.value);
  };
  const handleAdditionalInfoChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setAdditionalInfo(event.target.value);
  };

  const handleSearchClientClick = (client: ClientInterface): void => {
    setOwnerId(client.id);
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (ownerId === null) {
      return alert("Для створення транспорту потрібно вказати його власника");
    }

    const body = removeNullKeys({
      brand,
      model,
      year,
      licensePlate,
      engine,
      additionalInfo,
      ownerId,
    });

    await createVehicleRequest({ body }).then((response) => {
      if (!!onSuccessSubmit) onSuccessSubmit(response);
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="p">
          Додати Транспорт
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          id="create-vehicle-dialog-form"
          component="form"
          spacing={2}
          py={2}
          onSubmit={handleSubmit}
        >
          <TextField
            value={brand}
            onChange={handleBrandChange}
            required
            label="Марка"
          />
          <TextField
            value={model}
            onChange={handleModelChange}
            required
            label="Модель"
          />
          <TextField
            type="number"
            value={year}
            onChange={handleYearChange}
            required
            label="Рік випуску"
          />
          <TextField
            value={licensePlate}
            onChange={handleLicensePlateChange}
            required
            label="Номерний знак"
          />
          <TextField
            value={engine}
            onChange={handleEngineChange}
            required
            label="Двигун"
          />
          <TextField
            value={additionalInfo}
            onChange={handleAdditionalInfoChange}
            label="Додаткова інформація"
            multiline
            minRows={2}
          />
          <SearchForClient
            onClick={handleSearchClientClick}
            selectedClientId={ownerId}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="create-vehicle-dialog-form"
          variant="outlined"
        >
          Створити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateVehicleDialog;
