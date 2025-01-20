import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { LinkProps } from "@mui/material/Link";

interface BreadcrumbsLinkProps extends LinkProps {
  to: string;
  replace?: boolean;
}

const BreadcrumbsLink = styled(RouterLink)<BreadcrumbsLinkProps>(
  ({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  })
);

export default BreadcrumbsLink;
