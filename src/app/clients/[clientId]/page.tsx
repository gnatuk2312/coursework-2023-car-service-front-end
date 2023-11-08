"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import {
  ClientSection,
  ClientVehiclesSection,
  HeaderSection,
  UpdateClientDialog,
} from "./components";
import Protected from "@/components/HOC/Protected";
import useDialogState from "@/hooks/useDialogState";
import { getClientByIdRequest } from "@/common/services/api/client/client.api";
import { getVehiclesByOwnerIdRequest } from "@/common/services/api/vehicle/vehicle.api";
import { ClientInterface } from "@/common/types/entities.types";
import { GetVehiclesByOwnerIdResponseType } from "@/common/services/api/vehicle/vehicle.types";

type Props = {
  params: {
    clientId: string;
  };
};

const ClientId: FC<Props> = (props) => {
  const { clientId } = props.params;

  const {
    state: { isDialogOpen },
    handlers: { handleOpenDialog, handleCloseDialog },
  } = useDialogState();

  const [isPending, setIsPending] = useState<boolean>(true);
  const [client, setClient] = useState<ClientInterface | null>(null);
  const [vehicles, setVehicles] = useState<GetVehiclesByOwnerIdResponseType>(
    []
  );

  const getClientById = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getClientByIdRequest({ params: { id: clientId } });
      setClient(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    } finally {
      setIsPending(false);
    }
  }, [clientId]);

  const getVehiclesByOwnerId = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getVehiclesByOwnerIdRequest({
        params: { ownerId: clientId },
      });
      setVehicles(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    } finally {
      setIsPending(false);
    }
  }, [clientId]);

  useEffect(() => {
    getClientById();
    getVehiclesByOwnerId();
  }, [getClientById, getVehiclesByOwnerId]);

  const handleSuccessSubmit = (client: ClientInterface): void => {
    handleCloseDialog();
    setClient(client);
  };

  return (
    <>
      <HeaderSection />
      <Container>
        <Button size="large" variant="contained" onClick={handleOpenDialog}>
          Редагувати
          <EditIcon sx={{ ml: 1 }} />
        </Button>
      </Container>
      <ClientSection client={client} isPending={isPending} />
      <ClientVehiclesSection vehicles={vehicles} isPending={isPending} />
      {client !== null && (
        <UpdateClientDialog
          client={client}
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSuccessSubmit={handleSuccessSubmit}
        />
      )}
    </>
  );
};

export default Protected(ClientId);
