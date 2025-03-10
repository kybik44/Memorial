import { Box } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadcrumbsLink from "./BreadcrumbsLink";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { useCatalogContext } from "/contexts/CatalogContext";

interface BreadcrumbItem {
  title: string;
  to: string;
}

const Breadcrumbs = () => {
  const { section, subsectionOrId, productId } = useParams();
  const { getCurrentCategoryPath, catalogStructure, catalogs, fetchItems } =
    useCatalogContext();
  const navigate = useNavigate();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { title: "Главная", to: "/" },
    { title: "Каталог", to: "/catalog" },
  ]);

  const handleCatalogClick = () => {
    fetchItems({ page: 1 });
    navigate("/catalog");
  };

  useEffect(() => {
    const updateBreadcrumbs = async () => {
      const newBreadcrumbs = [
        { title: "Главная", to: "/" },
        { title: "Каталог", to: "/catalog" },
      ];

      if (section) {
        const categoryPath = getCurrentCategoryPath(section);

        // Добавляем все категории из пути
        categoryPath.forEach((category) => {
          newBreadcrumbs.push({
            title: category.title,
            to: `/catalog/${category.full_slug}`,
          });
        });

        // Проверяем подраздел
        if (subsectionOrId && isNaN(Number(subsectionOrId))) {
          const fullSlug = `${section}/${subsectionOrId}`;

          const subcategory = catalogStructure[fullSlug];

          if (subcategory) {
            newBreadcrumbs.push({
              title: subcategory.title,
              to: `/catalog/${fullSlug}`,
            });
          }
        }
      }

      if (productId) {
        newBreadcrumbs.push({
          title: "Товар",
          to: "#",
        });
      }

      console.log("Final breadcrumbs:", newBreadcrumbs);
      setBreadcrumbs(newBreadcrumbs);
    };

    updateBreadcrumbs();
  }, [
    section,
    subsectionOrId,
    productId,
    getCurrentCategoryPath,
    catalogStructure,
    catalogs,
    fetchItems,
    navigate,
  ]);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={styles.container}>
        <MuiBreadcrumbs
          separator="›"
          aria-label="breadcrumb"
          sx={{
            "& .MuiBreadcrumbs-separator": {
              color: "text.secondary",
              margin: "0 8px",
              fontSize: "16px",
            },
            "& .MuiBreadcrumbs-ol": {
              flexWrap: "nowrap",
              whiteSpace: "nowrap",
              overflow: "auto",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            },
          }}
        >
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const isCatalog = item.to === "/catalog";

            return (
              <span key={item.to}>
                {isLast ? (
                  <Text
                    variant="body1"
                    customColor="text.primary"
                    sx={{
                      ...styles.link,
                      ...styles.last,
                    }}
                  >
                    {item.title}
                  </Text>
                ) : (
                  <BreadcrumbsLink
                    to={item.to}
                    sx={styles.link}
                    onClick={isCatalog ? handleCatalogClick : undefined}
                  >
                    <Text variant="body1" customColor="text.secondary">
                      {item.title}
                    </Text>
                  </BreadcrumbsLink>
                )}
              </span>
            );
          })}
        </MuiBreadcrumbs>
      </Box>
    </Box>
  );
};

export default Breadcrumbs;
