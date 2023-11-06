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

import { createVisitRequest } from "@/common/services/api/visit/visit.api";
import { ClientInterface } from "@/common/types/entities.types";
import { createClientRequest } from "@/common/services/api/client/client.api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (client: ClientInterface) => void;
};

const CreateClientDialog: FC<Props> = (props) => {
  const { isOpen, onClose, onSuccessSubmit } = props;

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [about, setAbout] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const handleFirstNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFirstName(event.target.value);
  };
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLastName(event.target.value);
  };
  const handleAboutChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setAbout(event.target.value);
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value);
  };
  const handlePhoneChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    const body = { firstName, lastName, about, email, phone };

    await createClientRequest({ body }).then((response) => {
      if (!!onSuccessSubmit) onSuccessSubmit(response);
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="p">
          Створити Клієнта
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          id="create-client-dialog-form"
          component="form"
          spacing={2}
          py={2}
          onSubmit={handleSubmit}
        >
          <TextField
            value={firstName}
            onChange={handleFirstNameChange}
            required
            label="Ім'я"
          />
          <TextField
            value={lastName}
            onChange={handleLastNameChange}
            required
            label="Прізвище"
          />
          <TextField
            value={about}
            onChange={handleAboutChange}
            label="Короткий опис"
            multiline
            minRows={2}
          />
          <TextField value={email} onChange={handleEmailChange} label="Email" />
          <TextField
            value={phone}
            onChange={handlePhoneChange}
            label="Номер телефону"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          type="submit"
          form="create-client-dialog-form"
          variant="outlined"
        >
          Створити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClientDialog;
