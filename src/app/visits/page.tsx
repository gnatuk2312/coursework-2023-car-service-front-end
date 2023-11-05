"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { Button, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import {
  AllVisitsSection,
  CreateVisitDialog,
  HeaderSection,
} from "./components";
import Protected from "@/components/HOC/Protected";
import useDialogState from "@/hooks/useDialogState";
import { getAllVisitsRequest } from "@/common/services/api/visit/visit.api";
import { VisitInterface } from "@/common/types/entities.types";
import { GetAllVisitsResponseType } from "@/common/services/api/visit/visit.types";

const Visits: FC = () => {
  const {
    state: { isDialogOpen },
    handlers: { handleOpenDialog, handleCloseDialog },
  } = useDialogState();

  const [isPending, setIsPending] = useState<boolean>(true);
  const [visits, setVisits] = useState<GetAllVisitsResponseType>([]);

  const getAllVisits = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getAllVisitsRequest();
      setVisits(response);
    } catch (error) {
      alert(error);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    getAllVisits();
  }, [getAllVisits]);

  const handleSuccessSubmit = (visit: VisitInterface): void => {
    handleCloseDialog();
    setVisits((prev) => [visit, ...prev]);
  };

  return (
    <>
      <HeaderSection />
      <Container>
        <Button size="large" variant="contained" onClick={handleOpenDialog}>
          Створити
          <AddIcon />
        </Button>
      </Container>
      <AllVisitsSection visits={visits} isPending={isPending} />
      <CreateVisitDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccessSubmit={handleSuccessSubmit}
      />
    </>
  );
};

export default Protected(Visits);
