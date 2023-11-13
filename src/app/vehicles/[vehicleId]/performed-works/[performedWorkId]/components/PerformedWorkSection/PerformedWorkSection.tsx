import { FC } from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { PerformedWorkInterface } from "@/common/types/entities.types";
import SparePartCard from "@/components/SparePartCard";

type Props = {
  isPending: boolean;
  performedWork: PerformedWorkInterface | null;
};

const PerformedWorkSection: FC<Props> = (props) => {
  const { isPending, performedWork } = props;

  if (isPending) return <PendingIndicator />;
  if (performedWork === null) return <NoData />;

  const { title, description, price, currency, vehicle, spareParts } =
    performedWork;

  return (
    <Container component="section" sx={{ my: 4 }}>
      <Stack
        spacing={2}
        sx={{ padding: 4, border: `2px solid grey`, borderRadius: 4 }}
      >
        <SettingsSuggestIcon
          sx={{ alignSelf: "center", width: 136, height: 136 }}
        />
        <Typography variant="h4" component="p" alignSelf="center">
          {title}
        </Typography>
        <Box>
          <Stack direction="row" spacing={1}>
            <TextSnippetIcon color="info" />
            <Typography variant="subtitle1" component="p">
              Основна інформація
            </Typography>
          </Stack>
          <Typography variant="h6" component="p" mt={1}>
            транспорт:{" "}
            <MuiLink
              component={Link}
              href={`/vehicles/${vehicle.id}`}
              underline="hover"
            >
              {vehicle.brand} {vehicle.model} {vehicle.year}{" "}
              {vehicle.licensePlate}
            </MuiLink>
          </Typography>
          <Typography variant="h6" component="p" mt={1}>
            короткий опис: {description}
          </Typography>
          <Typography variant="h6" component="p" mt={1}>
            ціна: {price} {currency}
          </Typography>
        </Box>
        <Box>
          <Stack direction="row" spacing={1} mt={2}>
            <TextSnippetIcon color="info" />
            <Typography variant="subtitle1" component="p">
              Запчастини
            </Typography>
          </Stack>
          {spareParts.length === 0 ? (
            <NoData text="Жодних запчастин не було використано" />
          ) : (
            <Stack spacing={2} mt={2}>
              {spareParts.map((sparePart) => (
                <SparePartCard key={sparePart.id} sparePart={sparePart} />
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default PerformedWorkSection;
