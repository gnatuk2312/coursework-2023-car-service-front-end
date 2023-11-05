import { FC } from "react";
import Image from "next/image";
import { Typography } from "@mui/material";

import NoDataImage from "public/no-data.png";
import { Container } from "./NoData.styles";

type Props = {
  text?: string;
};

const NoData: FC<Props> = (props) => {
  const { text = "Даних не знайдено" } = props;

  return (
    <Container component="section">
      <Typography variant="h4" component="p">
        {text}
      </Typography>
      <Image
        src={NoDataImage.src}
        alt={text}
        width={NoDataImage.width}
        height={NoDataImage.height}
      />
    </Container>
  );
};

export default NoData;
