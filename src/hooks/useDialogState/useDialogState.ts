import { useState } from "react";

interface UseDialogStateReturnInterface {
  state: {
    isDialogOpen: boolean;
  };
  handlers: {
    handleOpenDialog: () => void;
    handleCloseDialog: () => void;
  };
}

const useDialogState = (
  initialState: boolean = false
): UseDialogStateReturnInterface => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(initialState);

  const handleOpenDialog = (): void => setIsDialogOpen(true);
  const handleCloseDialog = (): void => setIsDialogOpen(false);

  return {
    state: {
      isDialogOpen,
    },
    handlers: {
      handleOpenDialog,
      handleCloseDialog,
    },
  };
};

export default useDialogState;
