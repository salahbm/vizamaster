export type Params = {
  params: {
    locale: string;
  };
};

export type Menu = {
  id: number;
  name: string;
  path?: string;
  submenu?: Menu[];
};

export type Blog = {
  _id: number;
  title: string;
  slug?: any;
  metadata?: string;
  body?: string;
  mainImage?: any;
  author?: any;
  tags?: string[];
  publishedAt?: string;
};
