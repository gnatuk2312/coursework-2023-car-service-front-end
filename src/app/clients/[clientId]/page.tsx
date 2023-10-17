"use client";
import { FC } from "react";

type Props = {
  params: {
    clientId: string;
  };
};

const ClientId: FC<Props> = (props) => {
  return <section>Client with id {props.params.clientId}</section>;
};

export default ClientId;
