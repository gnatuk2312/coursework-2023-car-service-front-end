import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

import { SparePartInterface } from "@/common/types/entities.types";
import { Card } from "./SparePartCard.styles";

type Props = {
  sparePart: SparePartInterface;
};

export const SparePartCard: FC<Props> = (props) => {
  const { sparePart } = props;

  const { title, brand, price, currency } = sparePart;

  return (
    <Card>
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
};

export default SparePartCard;
