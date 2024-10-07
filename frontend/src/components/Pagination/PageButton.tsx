// src/components/Pagination/PageButton.tsx
import React from "react";
import { Button } from "@chakra-ui/react";

interface PageButtonProps {
  number: number;
  isCurrent: boolean;
  onClick: () => void;
}

const PageButton: React.FC<PageButtonProps> = ({
  number,
  isCurrent,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant={isCurrent ? "solid" : "outline"}
      colorScheme={isCurrent ? "teal" : "gray"}
      aria-current={isCurrent ? "page" : undefined}
      aria-label={`ページ ${number}`}
    >
      {number}
    </Button>
  );
};

export default PageButton;
