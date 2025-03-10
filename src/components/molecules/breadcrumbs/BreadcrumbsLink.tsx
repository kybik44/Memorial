import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";

interface BreadcrumbsLinkProps {
  to: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  onClick?: (e: React.MouseEvent) => void;
}

const BreadcrumbsLink: FC<BreadcrumbsLinkProps> = ({
  to,
  children,
  sx,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) {
      onClick(e);
    } else if (to && to !== '#') {
      // Обновляем URL без перезагрузки страницы и без добавления в историю
      window.history.replaceState({ path: to }, '', to);
      
      // Вручную запускаем обновление содержимого
      const event = new CustomEvent('urlChanged', { detail: { path: to } });
      window.dispatchEvent(event);
    }
  };

  return (
    <Box
      component="a"
      href={to}
      sx={{
        ...sx,
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      {children}
    </Box>
  );
};

export default BreadcrumbsLink;
