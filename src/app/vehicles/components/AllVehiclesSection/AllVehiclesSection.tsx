import { FC } from "react";
import Link from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { VehicleInterface } from "@/common/types/entities.types";
import { PaginatedDataInterface } from "@/common/types/common.types";
import { Card } from "./AllVehiclesSection.styles";

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
      {vehicles.data.map((vehicle) => {
        const { id, brand, model, year, licensePlate } = vehicle;

        return (
          <Card key={id}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <AirportShuttleIcon color="primary" />
                  <Typography variant="h6" component="p">
                    {brand} {model}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="flex-end" spacing={1}>
                  <CalendarMonthIcon color="primary" />
                  <Typography>{year} рік</Typography>
                  <NumbersIcon color="primary" />
                  <Typography>{licensePlate}</Typography>
                </Stack>
              </Box>
              <Button
                LinkComponent={Link}
                variant="outlined"
                color="primary"
                href={`/vehicles/${id}`}
              >
                Детально
                <ArrowForwardIosIcon sx={{ ml: 1 }} />
              </Button>
            </Box>
          </Card>
        );
      })}
    </Container>
  );
};

export default AllVehiclesSection;
