import { styled } from "@mui/material/styles";
import { Pagination } from "@mui/material";
import { useMediaQuery, Theme } from "@mui/material";

const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
  "& .MuiPagination-ul": {
    gap: theme.spacing(1),
  },
  "& .MuiPaginationItem-root": {
    color: theme.palette.text.primary,
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    },
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    "& .MuiPaginationItem-root": {
      minWidth: "32px",
      height: "32px",
      fontSize: "14px",
    },
  },
}));

interface CustomPaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}: CustomPaginationProps) => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleChange = (_: React.ChangeEvent<unknown>, page: number) => {
    onPageChange(page);
  };

  if (totalPages <= 1) return null;

  return (
    <StyledPagination
      count={totalPages}
      page={currentPage}
      onChange={handleChange}
      color="primary"
      size={isMobile ? "small" : "medium"}
      showFirstButton
      showLastButton
      siblingCount={isMobile ? 0 : 1}
      boundaryCount={isMobile ? 1 : 2}
    />
  );
};

export default CustomPagination; 