import { FC } from "react";
import { Container, Typography } from "@mui/material";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import VehicleCard from "@/components/VehicleCard";
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
      <Typography variant="h5" component="h2">
        Транспорт
      </Typography>
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </Container>
  );
};

export default ClientVehiclesSection;
