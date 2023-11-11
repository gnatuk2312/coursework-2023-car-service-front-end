import { FC } from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { PerformedWorkInterface } from "@/common/types/entities.types";
import { Card } from "./VehiclePerformedWorksSection.styles";
import Link from "next/link";

type Props = {
  performedWorks: PerformedWorkInterface[];
  vehicleId: string;
  isPending: boolean;
};

const VehiclePerformedWorksSection: FC<Props> = (props) => {
  const { performedWorks, vehicleId, isPending } = props;

  if (isPending) return <PendingIndicator />;
  if (performedWorks.length === 0) {
    return <NoData text="Цей транспорт не має записів про виконані роботи" />;
  }

  return (
    <Container component="section" sx={{ my: 4 }}>
      <Typography variant="h5" component="h2">
        Виконані роботи
      </Typography>
      {performedWorks.map((performedWork) => {
        const { id, title, price, currency } = performedWork;

        return (
          <Card key={id}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Stack spacing={1}>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="subtitle2">
                  {price} {currency}
                </Typography>
              </Stack>
              <Button
                component={Link}
                href={`/vehicles/${vehicleId}/performed-works/${id}`}
                variant="outlined"
              >
                <ArrowForwardIosIcon />
              </Button>
            </Box>
          </Card>
        );
      })}
    </Container>
  );
};

export default VehiclePerformedWorksSection;
