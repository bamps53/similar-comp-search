// src/components/Pagination.tsx

import React from "react";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <ButtonGroup mt={4} spacing={2}>
      <IconButton
        aria-label="前へ"
        icon={<ArrowLeftIcon />}
        onClick={() => handlePageChange(currentPage - 1)}
        isDisabled={currentPage === 1}
      />
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => handlePageChange(number)}
          variant={number === currentPage ? "solid" : "outline"}
          colorScheme={number === currentPage ? "teal" : "gray"}
          aria-current={number === currentPage ? "page" : undefined} // ここを追加
        >
          {number}
        </Button>
      ))}
      <IconButton
        aria-label="次へ"
        icon={<ArrowRightIcon />}
        onClick={() => handlePageChange(currentPage + 1)}
        isDisabled={currentPage === totalPages}
      />
    </ButtonGroup>
  );
};

export default Pagination;
