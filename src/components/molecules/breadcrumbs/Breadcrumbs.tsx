import { Box } from "@mui/material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbsLink from "./BreadcrumbsLink";
import styles from "./styles";
import Text from "/components/atoms/text/Text";
import { useCatalogContext } from "/contexts/CatalogContext";

interface BreadcrumbItem {
  title: string;
  to: string;
}

const Breadcrumbs = () => {
  const { getCurrentCategoryPath, catalogStructure, fetchItems } =
    useCatalogContext();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { title: "Главная", to: "/" },
    { title: "Каталог", to: "/catalog" },
  ]);

  const handleCatalogClick = (e: React.MouseEvent) => {
    // Обновляем URL без перезагрузки страницы и без добавления в историю
    window.history.replaceState({ path: '/catalog' }, '', '/catalog');
    fetchItems({ page: 1 });
    
    // Вручную запускаем обновление содержимого
    const event = new CustomEvent('urlChanged', { detail: { path: '/catalog' } });
    window.dispatchEvent(event);
  };

  // Функция для обновления хлебных крошек на основе текущего URL
  const updateBreadcrumbs = useCallback(async () => {
    const newBreadcrumbs = [
      { title: "Главная", to: "/" },
      { title: "Каталог", to: "/catalog" },
    ];

    // Получаем текущий путь из URL
    const path = window.location.pathname;
    const pathParts = path.split('/').filter(Boolean);
    
    // Если мы находимся в каталоге
    if (pathParts[0] === 'catalog') {
      const section = pathParts[1];
      const subsectionOrId = pathParts[2];
      const productId = pathParts[3];

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

        // Если это товар
        if (productId || (subsectionOrId && !isNaN(Number(subsectionOrId)))) {
          newBreadcrumbs.push({
            title: "Товар",
            to: "#",
          });
        }
      }
    }

    setBreadcrumbs(newBreadcrumbs);
  }, [getCurrentCategoryPath, catalogStructure]);

  // Обновляем хлебные крошки при изменении URL
  useEffect(() => {
    updateBreadcrumbs();
    
    // Обработчик для нашего кастомного события
    const handleUrlChanged = () => {
      updateBreadcrumbs();
    };
    
    // Обработчик для popstate (навигация назад/вперед)
    const handlePopState = () => {
      updateBreadcrumbs();
    };
    
    // Добавляем слушатель события click для обновления хлебных крошек при клике на ссылки
    const handleDocumentClick = () => {
      // Используем setTimeout, чтобы дать время для обновления URL
      setTimeout(() => {
        updateBreadcrumbs();
      }, 0);
    };
    
    window.addEventListener('urlChanged', handleUrlChanged as EventListener);
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleDocumentClick);
    
    return () => {
      window.removeEventListener('urlChanged', handleUrlChanged as EventListener);
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [updateBreadcrumbs]);

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
