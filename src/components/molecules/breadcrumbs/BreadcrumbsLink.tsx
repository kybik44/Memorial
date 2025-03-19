import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { FC, ReactNode } from "react";

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
    } else if (to && to !== "#") {
      // If going to catalog root, reset to page 1
      const url = to === "/catalog" 
        ? "/catalog?page=1" 
        : to.includes('?') ? to : `${to}?page=1`;
        
      // Обновляем URL без перезагрузки страницы и без добавления в историю
      window.history.replaceState({ path: url }, "", url);

      // Вручную запускаем обновление содержимого
      const event = new CustomEvent("urlChanged", { detail: { path: url } });
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
