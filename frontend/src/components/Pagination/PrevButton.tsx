// src/components/Pagination/PrevButton.tsx
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";

interface PrevButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

const PrevButton: React.FC<PrevButtonProps> = ({ isDisabled, onClick }) => {
  return (
    <IconButton
      aria-label="前のページへ"
      icon={<ArrowLeftIcon />}
      onClick={onClick}
      isDisabled={isDisabled}
    />
  );
};

export default PrevButton;
