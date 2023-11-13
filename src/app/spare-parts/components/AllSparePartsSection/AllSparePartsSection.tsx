import { FC } from "react";
import { Container } from "@mui/material";

import NoData from "@/components/NoData";
import PendingIndicator from "@/components/PendingIndicator";
import SparePartCard from "@/components/SparePartCard";
import { SparePartInterface } from "@/common/types/entities.types";
import { PaginatedDataInterface } from "@/common/types/common.types";

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
      {spareParts.data.map((sparePart) => (
        <SparePartCard key={sparePart.id} sparePart={sparePart} />
      ))}
    </Container>
  );
};

export default AllSparePartsSection;
