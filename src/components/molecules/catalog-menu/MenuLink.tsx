import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse, List, SxProps, Theme } from "@mui/material";
import { FC, useState } from "react";
import { CatalogMenuItem } from "./CatalogMenu";
import ListLink from "./ListLink";

export interface MenuLinkProps {
  link: CatalogMenuItem;
  handleClick: () => void;
  sx?: SxProps<Theme>;
}

const MenuLink: FC<MenuLinkProps> = ({ link, handleClick, sx }) => {
  const { subLinks, title } = link;
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>();

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClickInternal = (title: string) => {
    setSelected(title);
    handleClick();
  };

  let icon = null;
  if (subLinks?.length) {
    icon = open ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <>
      <ListLink
        title={title}
        icon={icon}
        sx={Array.isArray(sx) ? sx : [sx]}
        onClick={handleOpen}
      />
      {subLinks && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {subLinks.map((sublink, index) => (
              <ListLink
                key={index}
                sx={{
                  backgroundColor:
                    selected === sublink.title ? "#605E5E" : "#838383",
                }}
                color={"text.secondary"}
                onClick={() => handleClickInternal(sublink.title)}
                {...sublink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

export default MenuLink;
