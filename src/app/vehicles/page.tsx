"use client";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Button, Container, Pagination, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  AllVehiclesSection,
  CreateVehicleDialog,
  HeaderSection,
} from "./components";
import Protected from "@/components/HOC/Protected";
import useDialogState from "@/hooks/useDialogState";
import { TAKE_ALL_VEHICLES } from "@/common/constants/common.constants";
import { getSkipForPagination } from "@/common/utils/common.utils";
import { getAllVehiclesRequest } from "@/common/services/api/vehicle/vehicle.api";
import { VehicleInterface } from "@/common/types/entities.types";
import { GetAllVehiclesResponseType } from "@/common/services/api/vehicle/vehicle.types";

const Vehicles: FC = () => {
  const {
    state: { isDialogOpen },
    handlers: { handleOpenDialog, handleCloseDialog },
  } = useDialogState();

  const [isPending, setIsPending] = useState<boolean>(true);
  const [vehicles, setVehicles] = useState<GetAllVehiclesResponseType>({
    data: [],
    totalFiltered: 0,
    total: 0,
  });
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const getAllVehicles = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getAllVehiclesRequest({
        query: {
          skip: getSkipForPagination(page, TAKE_ALL_VEHICLES),
          take: TAKE_ALL_VEHICLES,
          search,
        },
      });
      setVehicles(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    } finally {
      setIsPending(false);
    }
  }, [page, search]);

  useEffect(() => {
    getAllVehicles();
  }, [getAllVehicles]);

  const handleSuccessSubmit = (vehicle: VehicleInterface): void => {
    handleCloseDialog();
    setVehicles((prev) => ({ ...prev, data: [vehicle, ...prev.data] }));
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

  const count = Math.ceil(vehicles.total / TAKE_ALL_VEHICLES);

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
          placeholder="Введіть марку, модель та рік випуску ТЗ"
          sx={{ mt: 2 }}
        />
      </Container>
      <AllVehiclesSection vehicles={vehicles} isPending={isPending} />
      {!isPending && (
        <Pagination
          count={count}
          page={page}
          onChange={handlePaginationChange}
          sx={{ display: "flex", justifyContent: "center", my: 2 }}
        />
      )}
      <CreateVehicleDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccessSubmit={handleSuccessSubmit}
      />
    </>
  );
};

export default Protected(Vehicles);
