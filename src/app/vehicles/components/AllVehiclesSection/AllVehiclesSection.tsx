import { FC } from "react";
import { Container } from "@mui/material";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import VehicleCard from "@/components/VehicleCard";
import { VehicleInterface } from "@/common/types/entities.types";
import { PaginatedDataInterface } from "@/common/types/common.types";

type Props = {
  vehicles: PaginatedDataInterface<VehicleInterface>;
  isPending: boolean;
};

const AllVehiclesSection: FC<Props> = (props) => {
  const { vehicles, isPending } = props;

  if (isPending) return <PendingIndicator />;
  if (vehicles.totalFiltered === 0) return <NoData />;

  return (
    <Container component="section" sx={{ my: 4 }}>
      {vehicles.data.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </Container>
  );
};

export default AllVehiclesSection;
