import { FC } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Box,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import PersonIcon from "@mui/icons-material/Person";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { VisitInterface } from "@/common/types/entities.types";
import { Card } from "./AllVisitsSection.styles";

type Props = {
  visits: VisitInterface[];
  isPending: boolean;
};

const AllVisitsSection: FC<Props> = (props) => {
  const { visits, isPending } = props;

  if (isPending) return <PendingIndicator />;
  if (visits.length === 0) return <NoData />;

  return (
    <Container component="section" sx={{ my: 4 }}>
      {visits.map((visit) => {
        const { id, date, time, description, phone, client } = visit;

        return (
          <Card key={id}>
            <Typography variant="subtitle1" mb={1}>
              {description || "Немає опису"}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <InsertInvitationIcon color="primary" />
              <Typography>{format(new Date(date), "dd MMMM yyyy")}</Typography>
              <AccessTimeIcon color="primary" />
              <Typography>{format(new Date(time), "hh:mm")}</Typography>
              <Box flex={1} display="flex" justifyContent="flex-end">
                {client !== null && (
                  <>
                    <PersonIcon color="primary" />
                    <MuiLink
                      component={Link}
                      href={`/clients/${client.id}`}
                      ml={1}
                      underline="hover"
                    >
                      {client.firstName} {client.lastName}
                    </MuiLink>
                  </>
                )}
                {Boolean(phone) && (
                  <>
                    <LocalPhoneIcon color="primary" sx={{ ml: 2 }} />
                    <MuiLink ml={1} href={`tel:${phone}`} underline="hover">
                      {phone}
                    </MuiLink>
                  </>
                )}
              </Box>
            </Stack>
          </Card>
        );
      })}
    </Container>
  );
};

export default AllVisitsSection;
