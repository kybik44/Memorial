import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, List, SxProps, Theme } from "@mui/material";
import { FC, memo, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CatalogMenuItem } from "./CatalogMenu";
import ListLink from "./ListLink";

export interface MenuLinkProps {
  link: CatalogMenuItem;
  handleClick: () => void;
  selected: boolean;
  sx?: SxProps<Theme>;
}

const MenuLink: FC<MenuLinkProps> = memo(
  ({ link, handleClick, selected, sx }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { links, title, section } = link;

    const handleOpen = () => {
      setOpen((prevOpen) => !prevOpen);
    };

    const handleClickInternal = useMemo(
      () => (name?: string) => {
        if (section && name) {
          navigate(`/catalog/${section}/${name}`);
        }
        handleClick();
      },
      [navigate, section, handleClick]
    );

    const icon = useMemo(
      () => (links?.length ? open ? <ExpandLess /> : <ExpandMore /> : null),
      [links, open]
    );

    return (
      <>
        <ListLink
          title={title}
          icon={icon}
          sx={Array.isArray(sx) ? sx : [sx]}
          onClick={handleOpen}
        />
        {links && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List disablePadding>
              {links.map((link) =>
                link.to ? (
                  <ListLink
                    key={link.to}
                    sx={{
                      backgroundColor: selected ? "#605E5E" : "#838383",
                    }}
                    color="text.secondary"
                    onClick={() => handleClickInternal(link.to)}
                    title={link.title}
                  />
                ) : null
              )}
            </List>
          </Collapse>
        )}
      </>
    );
  }
);

export default MenuLink;
