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
import {
  DatePicker,
  TimePicker,
  renderTimeViewClock,
} from "@mui/x-date-pickers";

import { createVisitRequest } from "@/common/services/api/visit/visit.api";
import { removeNullKeys } from "@/common/utils/common.utils";
import { ClientInterface, VisitInterface } from "@/common/types/entities.types";
import SearchForClient from "@/components/SearchForClient";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (visit: VisitInterface) => void;
};

const CreateVisitDialog: FC<Props> = (props) => {
  const { isOpen, onClose, onSuccessSubmit } = props;

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [clientId, setClientId] = useState<string | null>(null);

  const handleDateChange = (value: Date | null): void => setDate(value);
  const handleTimeChange = (value: string | null): void => setTime(value);
  const handleDescriptionChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setDescription(event.target.value);
  };
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPhone(event.target.value);
  };

  const handleSearchClientClick = (client: ClientInterface): void => {
    setClientId(client.id);
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (date === null || time === null) {
      return alert("Дата і час - обв'язкові поля");
    }

    const body = removeNullKeys({ date, time, description, phone, clientId });

    await createVisitRequest({ body }).then((response) => {
      if (!!onSuccessSubmit) onSuccessSubmit(response);
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="p">
          Створити Запис
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          id="create-visit-dialog-form"
          component="form"
          spacing={2}
          py={2}
          onSubmit={handleSubmit}
        >
          <DatePicker value={date} onChange={handleDateChange} label="Дата" />
          <TimePicker
            value={time}
            onChange={handleTimeChange}
            label="Час"
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
          />
          <TextField
            value={description}
            onChange={handleDescriptionChange}
            label="Короткий опис"
            multiline
            minRows={2}
          />
          <TextField
            value={phone}
            onChange={handlePhoneChange}
            label="Номер телефону"
          />
          <SearchForClient
            onClick={handleSearchClientClick}
            selectedClientId={clientId}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="create-visit-dialog-form"
          variant="outlined"
        >
          Створити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateVisitDialog;
