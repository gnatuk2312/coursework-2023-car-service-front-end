"use client";
import { FC, useCallback, useEffect, useState } from "react";

import { VehiclePerformedWorksSection } from "../components";
import Protected from "@/components/HOC/Protected";
import { getPerformedWorksByVehicleIdRequest } from "@/common/services/api/performed-work/performed-work.api";
import { GetPerformedWorksByVehicleIdResponseType } from "@/common/services/api/performed-work/performed-work.types";

type Props = {
  params: {
    vehicleId: string;
  };
};

const PerformedWorks: FC<Props> = (props) => {
  const { vehicleId } = props.params;

  const [isPending, setIsPending] = useState<boolean>(true);
  const [performedWorks, setPerformedWorks] =
    useState<GetPerformedWorksByVehicleIdResponseType>([]);

  const getPerformedWorksByVehicleId = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getPerformedWorksByVehicleIdRequest({
        params: { vehicleId },
      });
      setPerformedWorks(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    } finally {
      setIsPending(false);
    }
  }, [vehicleId]);

  useEffect(() => {
    getPerformedWorksByVehicleId();
  }, [getPerformedWorksByVehicleId]);

  return (
    <VehiclePerformedWorksSection
      performedWorks={performedWorks}
      vehicleId={vehicleId}
      isPending={isPending}
    />
  );
};

export default Protected(PerformedWorks);
