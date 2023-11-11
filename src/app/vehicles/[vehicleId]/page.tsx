"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { Button, Container, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";

import {
  CreatePerformedWorkDialog,
  HeaderSection,
  UpdateVehicleDialog,
  VehiclePerformedWorksSection,
  VehicleSection,
} from "./components";
import useDialogState from "@/hooks/useDialogState";
import { getPerformedWorksByVehicleIdRequest } from "@/common/services/api/performed-work/performed-work.api";
import { getVehicleByIdRequest } from "@/common/services/api/vehicle/vehicle.api";
import { GetPerformedWorksByVehicleIdResponseType } from "@/common/services/api/performed-work/performed-work.types";
import {
  PerformedWorkInterface,
  VehicleInterface,
} from "@/common/types/entities.types";

type Props = {
  params: {
    vehicleId: string;
  };
};

const VehicleId: FC<Props> = (props) => {
  const { vehicleId } = props.params;

  const {
    state: { isDialogOpen: isUpdateVehicleDialogOpen },
    handlers: {
      handleOpenDialog: handleOpenUpdateVehicleDialog,
      handleCloseDialog: handleCloseUpdateVehicleDialog,
    },
  } = useDialogState();

  const {
    state: { isDialogOpen: isCreatePerformedWorkDialogOpen },
    handlers: {
      handleOpenDialog: handleOpenCreatePerformedWorkDialog,
      handleCloseDialog: handleCloseCreatePerformedWorkDialog,
    },
  } = useDialogState();

  const [isPending, setIsPending] = useState<boolean>(true);
  const [vehicle, setVehicle] = useState<VehicleInterface | null>(null);
  const [performedWorks, setPerformedWorks] =
    useState<GetPerformedWorksByVehicleIdResponseType>([]);

  const getVehicleById = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getVehicleByIdRequest({
        params: { id: vehicleId },
      });
      setVehicle(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    } finally {
      setIsPending(false);
    }
  }, [vehicleId]);

  const getPerformedWorksByVehicleId = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getPerformedWorksByVehicleIdRequest({
        params: { vehicleId },
      });
      setPerformedWorks(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    } finally {
      setIsPending(false);
    }
  }, [vehicleId]);

  useEffect(() => {
    getVehicleById();
    getPerformedWorksByVehicleId();
  }, [getVehicleById, getPerformedWorksByVehicleId]);

  const handleSuccessUpdateVehicleSubmit = (
    vehicle: VehicleInterface
  ): void => {
    handleCloseUpdateVehicleDialog();
    setVehicle(vehicle);
  };

  const handleSuccessCreatePerformedWorkSubmit = (
    performedWork: PerformedWorkInterface
  ): void => {
    handleCloseCreatePerformedWorkDialog();
    setPerformedWorks((prev) => [performedWork, ...prev]);
  };

  return (
    <>
      <HeaderSection />
      <Container>
        <Stack direction="row" spacing={1}>
          <Button
            size="large"
            variant="contained"
            onClick={handleOpenUpdateVehicleDialog}
          >
            Редагувати
            <EditIcon sx={{ ml: 1 }} />
          </Button>
          <Button
            size="large"
            variant="outlined"
            onClick={handleOpenCreatePerformedWorkDialog}
          >
            Додати виконану роботу
            <AddIcon sx={{ ml: 1 }} />
          </Button>
        </Stack>
      </Container>
      <VehicleSection vehicle={vehicle} isPending={isPending} />
      {vehicle !== null && (
        <>
          <VehiclePerformedWorksSection
            performedWorks={performedWorks}
            vehicleId={vehicle.id}
            isPending={isPending}
          />
          <UpdateVehicleDialog
            vehicle={vehicle}
            isOpen={isUpdateVehicleDialogOpen}
            onClose={handleCloseUpdateVehicleDialog}
            onSuccessSubmit={handleSuccessUpdateVehicleSubmit}
          />
          <CreatePerformedWorkDialog
            vehicleId={vehicle.id}
            isOpen={isCreatePerformedWorkDialogOpen}
            onClose={handleCloseCreatePerformedWorkDialog}
            onSuccessSubmit={handleSuccessCreatePerformedWorkSubmit}
          />
        </>
      )}
    </>
  );
};

export default VehicleId;
