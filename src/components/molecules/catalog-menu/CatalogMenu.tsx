import Box from "@mui/material/Box";
import List from "@mui/material/List";
import MenuLink from "./MenuLink";
import styles from "./styles";

export interface CatalogMenuItem {
  title: string;
  to?: string;
  subLinks?: Array<CatalogMenuItem>;
}

const CatalogMenu = () => {
  const handleClick = () => {};

  const linksList: Array<CatalogMenuItem> = [
    {
      title: "Памятники",
      to: "/catalog/memorials",
      subLinks: [
        {
          title: "Одиночные памятники",
          to: "/catalog/memorials",
        },
        {
          title: "Памятники со стеклом",
          to: "/catalog/memorials",
        },
      ],
    },
    {
      title: "Благоустройство",
      to: "/catalog/decor",
    },
    {
      title: "Ограды",
      to: "/catalog/fences",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={styles.menu} component="nav" aria-label="mailbox folders">
        <List>
          {linksList.map((link) => (
            <MenuLink link={link} handleClick={handleClick} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default CatalogMenu;
