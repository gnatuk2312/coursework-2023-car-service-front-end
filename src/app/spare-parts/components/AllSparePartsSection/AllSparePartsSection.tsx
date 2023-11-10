import { FC } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import { SparePartInterface } from "@/common/types/entities.types";
import { PaginatedDataInterface } from "@/common/types/common.types";
import { Card } from "./AllSparePartsSection.styles";

type Props = {
  spareParts: PaginatedDataInterface<SparePartInterface>;
  isPending: boolean;
};

const AllSparePartsSection: FC<Props> = (props) => {
  const { spareParts, isPending } = props;

  if (isPending) return <PendingIndicator />;
  if (spareParts.totalFiltered === 0) return <NoData />;

  return (
    <Container component="section" sx={{ my: 4 }}>
      {spareParts.data.map((sparePart) => {
        const { id, title, brand, price, currency } = sparePart;

        return (
          <Card key={id}>
            <Box display="flex" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1}>
                <TextSnippetIcon color="primary" />
                <Typography variant="h6" component="p">
                  {title}
                </Typography>
              </Stack>
              <Typography variant="subtitle1" component="p">
                {price} {currency}
              </Typography>
            </Box>
            <Typography variant="subtitle1" component="p" color="info" mt={1}>
              {brand}
            </Typography>
          </Card>
        );
      })}
    </Container>
  );
};

export default AllSparePartsSection;
