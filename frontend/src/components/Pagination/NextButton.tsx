// src/components/Pagination/NextButton.tsx
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

interface NextButtonProps {
  isDisabled: boolean;
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ isDisabled, onClick }) => {
  return (
    <IconButton
      aria-label="次のページへ"
      icon={<ArrowRightIcon />}
      onClick={onClick}
      isDisabled={isDisabled}
    />
  );
};

export default NextButton;
