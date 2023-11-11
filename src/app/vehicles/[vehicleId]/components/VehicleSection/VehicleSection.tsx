import { FC } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { VehicleInterface } from "@/common/types/entities.types";

type Props = {
  vehicle: VehicleInterface | null;
  isPending: boolean;
};

const VehicleSection: FC<Props> = (props) => {
  const { vehicle, isPending } = props;

  if (isPending) return <PendingIndicator />;
  if (vehicle === null) return <NoData />;

  const { brand, model, year, additionalInfo, licensePlate, engine, owner } =
    vehicle;

  return (
    <Container component="section" sx={{ my: 4 }}>
      <Stack
        spacing={2}
        sx={{ padding: 4, border: `2px solid grey`, borderRadius: 4 }}
      >
        <DirectionsCarIcon
          sx={{ alignSelf: "center", width: 136, height: 136 }}
        />
        <Typography variant="h4" component="p" alignSelf="center">
          {brand} {model}
        </Typography>
        <Box>
          <Stack direction="row" spacing={1}>
            <TextSnippetIcon color="info" />
            <Typography variant="subtitle1" component="p">
              Основна інформація
            </Typography>
          </Stack>
          <Typography variant="h6" component="p" mt={1}>
            власник:{" "}
            <MuiLink
              component={Link}
              href={`/clients/${owner.id}`}
              underline="hover"
            >
              {owner.firstName} {owner.lastName}
            </MuiLink>
          </Typography>
          <Typography variant="h6" component="p" mt={1}>
            номерний знак: {licensePlate}
          </Typography>
          <Typography variant="h6" component="p" mt={1}>
            рік випуску: {year}
          </Typography>
          <Typography variant="h6" component="p" mt={1}>
            двигун: {engine}
          </Typography>
        </Box>
        <Box>
          <Stack direction="row" spacing={1} mt={2}>
            <TextSnippetIcon color="info" />
            <Typography variant="subtitle1" component="p">
              Додаткова інформація
            </Typography>
          </Stack>
          <Typography variant="h6" component="p">
            {additionalInfo}
          </Typography>
        </Box>
      </Stack>
    </Container>
  );
};

export default VehicleSection;
