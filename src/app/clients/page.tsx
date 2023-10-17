"use client";
import { FC, useCallback, useEffect, useState } from "react";

import { getUsersRequest } from "@/common/services/api/auth/auth.api";
import { GetUsersResponseType } from "@/common/services/api/auth/auth.types";

const Clients: FC = () => {
  const [users, setUsers] = useState<GetUsersResponseType | null>(null);

  const getUsers = useCallback(async () => {
    setUsers(await getUsersRequest());
  }, []);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <section>
      Clients
      {users !== null &&
        users.data.map((user: any) => <p key={user.id}>{user.name}</p>)}
    </section>
  );
};

export default Clients;
