import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface BreadcrumbsLinkProps {
  to: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const BreadcrumbsLink: FC<BreadcrumbsLinkProps> = ({
  to,
  children,
  sx,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <RouterLink
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
      onClick={handleClick}
    >
      <Box sx={sx}>{children}</Box>
    </RouterLink>
  );
};

export default BreadcrumbsLink;
