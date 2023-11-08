import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonIcon from "@mui/icons-material/Person";

import { getAllClientsRequest } from "@/common/services/api/client/client.api";
import { GetAllClientsResponseType } from "@/common/services/api/client/client.types";
import { ClientInterface } from "@/common/types/entities.types";

type Props = {
  onClick: (client: ClientInterface) => void;
  selectedClientId?: string | null;
};

const SearchForClient: FC<Props> = (props) => {
  const { onClick, selectedClientId } = props;

  const [clients, setClients] = useState<GetAllClientsResponseType>({
    data: [],
    totalFiltered: 0,
    total: 0,
  });
  const [search, setSearch] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const getClientsBySearch = useCallback(async () => {
    if (search === "") return;

    try {
      const response = await getAllClientsRequest({
        query: { search, take: 5 },
      });
      setClients(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    }
  }, [search]);

  useEffect(() => {
    getClientsBySearch();
  }, [getClientsBySearch]);

  return (
    <Box>
      <TextField
        value={search}
        onChange={handleSearchChange}
        label="Введіть ім'я та прізвище"
        fullWidth
      />
      {clients.totalFiltered !== 0 && (
        <List>
          {clients.data.map((client) => {
            const { id, firstName, lastName } = client;

            const selected = selectedClientId === id;

            return (
              <ListItem
                key={id}
                onClick={() => onClick(client)}
                divider
                sx={{ cursor: "pointer" }}
              >
                <ListItemIcon>
                  {selected ? (
                    <CheckCircleIcon color="success" />
                  ) : (
                    <PersonIcon color="primary" />
                  )}
                </ListItemIcon>
                <ListItemText>
                  {firstName} {lastName}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      )}
      {clients.totalFiltered === 0 && search !== "" && (
        <Typography p={1}>
          По даному пошуковому запиту клієнтів не знайдено
        </Typography>
      )}
    </Box>
  );
};

export default SearchForClient;
