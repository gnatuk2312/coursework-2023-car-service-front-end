import { FC } from "react";
import {
  Avatar,
  Box,
  Container,
  Stack,
  Typography,
  Link as MuiLink,
} from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { ClientInterface } from "@/common/types/entities.types";

type Props = {
  client: ClientInterface | null;
  isPending: boolean;
};

const ClientSection: FC<Props> = (props) => {
  const { client, isPending } = props;

  if (isPending) return <PendingIndicator />;
  if (client === null) return <NoData />;

  const { firstName, lastName, about, email, phone } = client;

  return (
    <Container component="section" sx={{ my: 4 }}>
      <Stack
        spacing={2}
        sx={{ padding: 4, border: `2px solid grey`, borderRadius: 4 }}
      >
        <Avatar sx={{ alignSelf: "center", width: 136, height: 136 }} />
        <Typography variant="h4" component="p" alignSelf="center">
          {firstName} {lastName}
        </Typography>
        {Boolean(about) && (
          <Box>
            <Stack direction="row" spacing={1}>
              <TextSnippetIcon color="info" />
              <Typography variant="subtitle1" component="p">
                Про клієнта
              </Typography>
            </Stack>
            <Typography variant="h6" component="p">
              {about}
            </Typography>
          </Box>
        )}
        {Boolean(email) && (
          <Box>
            <Stack direction="row" spacing={1}>
              <EmailIcon color="info" />
              <Typography variant="subtitle1" component="p">
                Email
              </Typography>
            </Stack>
            <Typography variant="h6" component="p">
              <MuiLink
                href={`mailto:${email}`}
                underline="hover"
                color="inherit"
              >
                {email}
              </MuiLink>
            </Typography>
          </Box>
        )}
        {Boolean(phone) && (
          <Box>
            <Stack direction="row" spacing={1}>
              <PhoneIcon color="info" />
              <Typography variant="subtitle1" component="p">
                Номер телефону
              </Typography>
            </Stack>
            <Typography variant="h6" component="p">
              <MuiLink href={`tel:${phone}`} underline="hover" color="inherit">
                {phone}
              </MuiLink>
            </Typography>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default ClientSection;
