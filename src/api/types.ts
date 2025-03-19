export interface Catalog {
  id: number;
  children: Record<string, Catalog>;
  full_slug: string;
  title: string;
  image?: string;
  use_in_menu: boolean;
  slug: string;
  parent?: number;
}

export interface PaginatedCatalogList {
  count: number;
  next?: string;
  previous?: string;
  results: Catalog[];
}

export interface Item {
  id: number;
  title: string;
  description: string;
  category: number;
  category_slug?: string;
  material: number[];
  main_description: MainDescription[];
  material_item: MaterialItem[];
  images?: { image: string }[];
  use_in?: boolean;
}

export interface ItemDescription {
  name: string;
  value: string;
}

export interface ItemMaterial {
  main_description: ItemMaterialDescription[];
  material: Material;
  description: string;
  price?: number;
  add_info?: string;
}

export interface ItemMaterialDescription {
  name: string;
  value: string;
}

export interface Material {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface PaginatedItemList {
  count: number;
  next?: string;
  previous?: string;
  results: Item[];
}

export interface MaterialsList extends PaginatedResponse<Material> {}

export interface MainCatalogPart {
  id: number;
  catalog: Catalog[];
  created_at: string;
  updated_at: string;
  title: string;
  carousel: boolean;
  position: number;
}

export interface OurWorks {
  id: number;
  created_at: string;
  updated_at: string;
  image: string;
  thumbnail: string;
  cropping: string;
}

export interface OurWorksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: OurWorks[];
}

export interface MainPage {
  catalogs: MainCatalogPart[];
  our_works: OurWorks[];
}

export interface Application {
  name: string;
  phone: string;
}

// Интерфейс для элементов каталога
export interface CatalogListItem {
  id: number;
  title: string;
  description?: string;
  category: number;
  category_slug?: string;
  images?: { image: string; thumbnail?: string }[];

  image?: string;
  price?: string;
}

// Export the interface or remove it if not needed
export interface ICatalogList {
  catalogItems: {
    id: number;
    title: string;
    image?: string;
    description?: string;
    category?: number;
    materials?: {
      price?: string;
    }[];
  }[];
}

export interface ItemsListParams {
  page?: number;
  order?: string;
  ordering?: string;
  price_gte?: number;
  price_lte?: number;
  search?: string;
  slug?: string;
  title?: string;
  category?: number;
}

// Базовый интерфейс для пагинации
export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

// Обновляем существующие интерфейсы
export interface PaginatedItemList extends PaginatedResponse<Item> {}

export interface PaginatedCatalogList extends PaginatedResponse<Catalog> {}

// Исправляем интерфейс Material, делая id обязательным
export interface Material {
  id: number; // убираем опциональность
  title: string;
  description: string;
  images?: string[];
  is_composite: boolean;
  composite: Material[];
  // These fields are not needed in Material but are required to satisfy type checking
  category?: number;
  material?: number[];
  main_description?: MainDescription[];
  material_item?: MaterialItem[];
}

export interface MainDescription {
  name: string;
  value: string;
}

export interface MaterialItem {
  main_description: MainDescription[];
  material: Material;
  description: string;
  price: string;
  add_info?: string;
  images: { image: string }[];
}

// Add new interfaces for detailed item response
export interface ItemDetail extends CatalogListItem {
  main_description: MainDescription[];
  material_item: MaterialItem[];
}
