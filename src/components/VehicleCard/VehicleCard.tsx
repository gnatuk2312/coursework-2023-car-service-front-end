import { FC } from "react";
import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NumbersIcon from "@mui/icons-material/Numbers";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { VehicleInterface } from "@/common/types/entities.types";
import { Card } from "./VehicleCard.styles";

type Props = {
  vehicle: VehicleInterface;
};

const VehicleCard: FC<Props> = (props) => {
  const { vehicle } = props;

  const { id, brand, model, year, licensePlate } = vehicle;

  return (
    <Card>
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
};

export default VehicleCard;
