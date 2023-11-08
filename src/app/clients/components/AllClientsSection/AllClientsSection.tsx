import { FC } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Link as MuiLink,
  Stack,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { ClientInterface } from "@/common/types/entities.types";
import { PaginatedDataInterface } from "@/common/types/common.types";
import { Card } from "./AllClientsSection.styles";

type Props = {
  clients: PaginatedDataInterface<ClientInterface>;
  isPending: boolean;
};

const AllClientsSection: FC<Props> = (props) => {
  const { clients, isPending } = props;

  if (isPending) return <PendingIndicator />;
  if (clients.totalFiltered === 0) return <NoData />;

  return (
    <Container component="section" sx={{ my: 4 }}>
      {clients.data.map((client) => {
        const { id, firstName, lastName, email, phone } = client;

        return (
          <Card key={id}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                  <PersonIcon color="primary" />
                  <Typography variant="h6" component="p">
                    {firstName} {lastName}
                  </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1}>
                  {Boolean(phone) && (
                    <>
                      <PhoneIcon color="primary" />
                      <MuiLink href={`tel:${phone}`} underline="hover">
                        {phone}
                      </MuiLink>
                    </>
                  )}
                  {Boolean(email) && (
                    <>
                      <EmailIcon color="primary" />
                      <MuiLink href={`mailto:${email}`} underline="hover">
                        {email}
                      </MuiLink>
                    </>
                  )}
                </Stack>
              </Box>
              <Button
                LinkComponent={Link}
                variant="outlined"
                color="primary"
                href={`/clients/${id}`}
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

export default AllClientsSection;
