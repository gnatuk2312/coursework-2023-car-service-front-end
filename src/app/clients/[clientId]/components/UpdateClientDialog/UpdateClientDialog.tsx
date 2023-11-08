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

import { ClientInterface } from "@/common/types/entities.types";
import { updateClientRequest } from "@/common/services/api/client/client.api";

type Props = {
  client: ClientInterface;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSubmit?: (client: ClientInterface) => void;
};

const UpdateClientDialog: FC<Props> = (props) => {
  const { client, isOpen, onClose, onSuccessSubmit } = props;

  const [firstName, setFirstName] = useState<string>(client.firstName);
  const [lastName, setLastName] = useState<string>(client.lastName);
  const [about, setAbout] = useState<string>(client.about ?? "");
  const [email, setEmail] = useState<string>(client.email ?? "");
  const [phone, setPhone] = useState<string>(client.phone ?? "");

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

    await updateClientRequest({ body, params: { id: client.id } }).then(
      (response) => {
        if (!!onSuccessSubmit) onSuccessSubmit(response);
      }
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth>
      <DialogTitle>
        <Typography variant="h5" component="p">
          Оновити Клієнта
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          id="update-client-dialog-form"
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
          form="update-client-dialog-form"
          variant="outlined"
        >
          Оновити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateClientDialog;
