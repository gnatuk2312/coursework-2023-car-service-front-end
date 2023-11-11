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

import { removeNullKeys } from "@/common/utils/common.utils";
import { updateVehicleRequest } from "@/common/services/api/vehicle/vehicle.api";
import { VehicleInterface } from "@/common/types/entities.types";

type Props = {
  vehicle: VehicleInterface;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (vehicle: VehicleInterface) => void;
};

const UpdateVehicleDialog: FC<Props> = (props) => {
  const { vehicle, isOpen, onClose, onSuccessSubmit } = props;

  const [brand, setBrand] = useState<string>(vehicle.brand);
  const [model, setModel] = useState<string>(vehicle.model);
  const [year, setYear] = useState<string>(String(vehicle.year));
  const [licensePlate, setLicensePlate] = useState<string>(
    vehicle.licensePlate
  );
  const [engine, setEngine] = useState<string>(vehicle.engine);
  const [additionalInfo, setAdditionalInfo] = useState<string | null>(
    vehicle.additionalInfo
  );

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

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const body = removeNullKeys({
      brand,
      model,
      year: Number(year),
      licensePlate,
      engine,
      additionalInfo,
      ownerId: vehicle.owner.id,
    });

    await updateVehicleRequest({ body, params: { id: vehicle.id } }).then(
      (response) => {
        if (!!onSuccessSubmit) onSuccessSubmit(response);
      }
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="p">
          Оновити Транспорт
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          id="update-vehicle-dialog-form"
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
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="update-vehicle-dialog-form"
          variant="outlined"
        >
          Оновити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateVehicleDialog;
