import { FC } from "react";
import { Box, Container } from "@mui/material";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { VehicleInterface } from "@/common/types/entities.types";

type Props = {
  vehicles: VehicleInterface[];
  isPending: boolean;
};

const ClientVehiclesSection: FC<Props> = (props) => {
  const { vehicles, isPending } = props;

  if (isPending) return <PendingIndicator />;
  if (vehicles.length === 0) {
    return <NoData text="Цей клієнт не має транспорту" />;
  }

  return (
    <Container component="section" sx={{ my: 4 }}>
      {vehicles.map((vehicle) => {
        const { id } = vehicle;

        //TODO: add reusable vehicle card from vehicles page
        return <Box key={id}>{id}</Box>;
      })}
    </Container>
  );
};

export default ClientVehiclesSection;
