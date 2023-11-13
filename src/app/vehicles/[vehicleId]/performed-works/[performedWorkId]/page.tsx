"use client";
import { FC, useCallback, useEffect, useState } from "react";

import { HeaderSection, PerformedWorkSection } from "./components";
import Protected from "@/components/HOC/Protected";
import { getPerformedWorkByIdRequest } from "@/common/services/api/performed-work/performed-work.api";
import { PerformedWorkInterface } from "@/common/types/entities.types";

type Props = {
  params: {
    performedWorkId: string;
  };
};

const PerformedWorkId: FC<Props> = (props) => {
  const { performedWorkId } = props.params;

  const [isPending, setIsPending] = useState<boolean>(true);
  const [performedWork, setPerformedWork] =
    useState<PerformedWorkInterface | null>(null);

  const getPerformedWork = useCallback(async () => {
    setIsPending(true);

    try {
      const response = await getPerformedWorkByIdRequest({
        params: { id: performedWorkId },
      });
      setPerformedWork(response);
    } catch (error) {
      const { message } = error as Error;
      alert(message);
    } finally {
      setIsPending(false);
    }
  }, [performedWorkId]);

  useEffect(() => {
    getPerformedWork();
  }, [getPerformedWork]);

  return (
    <>
      <HeaderSection />
      <PerformedWorkSection
        isPending={isPending}
        performedWork={performedWork}
      />
    </>
  );
};

export default Protected(PerformedWorkId);
