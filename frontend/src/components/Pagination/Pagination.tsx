// src/components/Pagination/Pagination.tsx
import React from "react";
import { ButtonGroup } from "@chakra-ui/react";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import PageButton from "./PageButton";

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
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ButtonGroup mt={4} spacing={2} aria-label="ページネーション">
      <PrevButton
        isDisabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {pageNumbers.map((number) => (
        <PageButton
          key={number}
          number={number}
          isCurrent={number === currentPage}
          onClick={() => onPageChange(number)}
        />
      ))}
      <NextButton
        isDisabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      />
    </ButtonGroup>
  );
};

export default Pagination;
