"use client";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Box, Button, Container, Pagination, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  AllClientsSection,
  CreateClientDialog,
  HeaderSection,
} from "./components";
import Protected from "@/components/HOC/Protected";
import useDialogState from "@/hooks/useDialogState";
import { TAKE_ALL_CLIENTS } from "@/common/constants/common.constants";
import { getAllClientsRequest } from "@/common/services/api/client/client.api";
import { getSkipForPagination } from "@/common/utils/common.utils";
import { ClientInterface } from "@/common/types/entities.types";
import { GetAllClientsResponseType } from "@/common/services/api/client/client.types";

const Clients: FC = () => {
  const {
    state: { isDialogOpen },
    handlers: { handleOpenDialog, handleCloseDialog },
  } = useDialogState();

  const [isPending, setIsPending] = useState<boolean>(true);
  const [clients, setClients] = useState<GetAllClientsResponseType>({
    data: [],
    totalFiltered: 0,
    total: 0,
  });
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const getAllClients = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getAllClientsRequest({
        query: {
          skip: getSkipForPagination(page, TAKE_ALL_CLIENTS),
          take: TAKE_ALL_CLIENTS,
          search,
        },
      });
      setClients(response);
    } catch (error) {
      alert(error);
    } finally {
      setIsPending(false);
    }
  }, [page, search]);

  useEffect(() => {
    getAllClients();
  }, [getAllClients]);

  const handleSuccessSubmit = (client: ClientInterface): void => {
    handleCloseDialog();
    setClients((prev) => ({ ...prev, data: [client, ...prev.data] }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const handlePaginationChange = (
    _: ChangeEvent<unknown>,
    page: number
  ): void => {
    setPage(page);
  };

  const count = Math.ceil(clients.total / TAKE_ALL_CLIENTS);

  return (
    <>
      <HeaderSection />
      <Container>
        <Button size="large" variant="contained" onClick={handleOpenDialog}>
          Створити
          <AddIcon />
        </Button>
        <TextField
          value={search}
          onChange={handleSearchChange}
          fullWidth
          label="Пошук"
          placeholder="Введіть ім'я та прізвище"
          sx={{ mt: 2 }}
        />
      </Container>
      <AllClientsSection clients={clients} isPending={isPending} />
      {!isPending && (
        <Pagination
          count={count}
          page={page}
          onChange={handlePaginationChange}
          sx={{ display: "flex", justifyContent: "center", my: 2 }}
        />
      )}
      <CreateClientDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccessSubmit={handleSuccessSubmit}
      />
    </>
  );
};

export default Protected(Clients);
