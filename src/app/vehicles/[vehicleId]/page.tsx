"use client";
import { FC } from "react";

type Props = {
  params: {
    vehicleId: string;
  };
};

const VehicleId: FC<Props> = (props) => {
  return <section>Vehicle with id {props.params.vehicleId}</section>;
};

export default VehicleId;
