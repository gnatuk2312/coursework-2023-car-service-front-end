import { FC } from "react";
import { format } from "date-fns";
import { Box, Container, Link, Stack, Typography } from "@mui/material";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

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
        const { id, date, time, description, phone } = visit;

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
              {Boolean(phone) && (
                <Box flex={1} display="flex" justifyContent="flex-end">
                  <LocalPhoneIcon color="primary" />
                  <Link ml={1} href={`tel:${phone}`} underline="hover">
                    {phone}
                  </Link>
                </Box>
              )}
            </Stack>
          </Card>
        );
      })}
    </Container>
  );
};

export default AllVisitsSection;
