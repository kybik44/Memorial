export interface Catalog {
  id: number;
  children: Record<string, any>;
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
  materials?: ItemMaterial[];
  main_description?: ItemDescription[];
  title: string;
  description?: string;
  category?: number;
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
  id?: number;
  title: string;
  description: string;
  image?: string;
}

export interface PaginatedItemList {
  count: number;
  next?: string;
  previous?: string;
  results: Item[];
}

export interface MaterialsList extends PaginatedItemList {
  results: Material[];
}

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
}

export interface MainPage {
  catalogs: MainCatalogPart[];
  our_works: OurWorks[];
}

export interface Application {
  name: string;
  phone: string;
}
