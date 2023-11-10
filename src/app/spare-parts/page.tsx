"use client";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { Button, Container, Pagination, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  AllSparePartsSection,
  CreateSparePartDialog,
  HeaderSection,
} from "./components";
import Protected from "@/components/HOC/Protected";
import useDialogState from "@/hooks/useDialogState";
import { SparePartInterface } from "@/common/types/entities.types";
import { GetAllSparePartsResponseType } from "@/common/services/api/spare-part/spare-part.types";
import { getAllSparePartsRequest } from "@/common/services/api/spare-part/spare-part.api";
import { getSkipForPagination } from "@/common/utils/common.utils";
import { TAKE_ALL_SPARE_PARTS } from "@/common/constants/common.constants";

const SpareParts: FC = () => {
  const {
    state: { isDialogOpen },
    handlers: { handleOpenDialog, handleCloseDialog },
  } = useDialogState();

  const [isPending, setIsPending] = useState<boolean>(true);
  const [spareParts, setSpareParts] = useState<GetAllSparePartsResponseType>({
    data: [],
    totalFiltered: 0,
    total: 0,
  });
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const getAllSpareParts = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getAllSparePartsRequest({
        query: {
          skip: getSkipForPagination(page, TAKE_ALL_SPARE_PARTS),
          take: TAKE_ALL_SPARE_PARTS,
          search,
        },
      });
      setSpareParts(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    } finally {
      setIsPending(false);
    }
  }, [page, search]);

  useEffect(() => {
    getAllSpareParts();
  }, [getAllSpareParts]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };

  const handleSuccessSubmit = (sparePart: SparePartInterface): void => {
    handleCloseDialog();
    setSpareParts((prev) => ({
      data: [sparePart, ...prev.data],
      totalFiltered: ++prev.totalFiltered,
      total: ++prev.total,
    }));
  };

  const handlePaginationChange = (
    _: ChangeEvent<unknown>,
    page: number
  ): void => {
    setPage(page);
  };

  const count = Math.ceil(spareParts.total / TAKE_ALL_SPARE_PARTS);

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
          placeholder="Введіть назву та бренд"
          sx={{ mt: 2 }}
        />
      </Container>
      <AllSparePartsSection spareParts={spareParts} isPending={isPending} />
      {!isPending && (
        <Pagination
          count={count}
          page={page}
          onChange={handlePaginationChange}
          sx={{ display: "flex", justifyContent: "center", my: 2 }}
        />
      )}
      <CreateSparePartDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccessSubmit={handleSuccessSubmit}
      />
    </>
  );
};

export default Protected(SpareParts);
