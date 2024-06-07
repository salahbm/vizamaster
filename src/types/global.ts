export type Params = {
  params: {
    locale: string;
  };
};

export type Menu = {
  id: number;
  title: string;
  path?: string;
  newTab: boolean;
  submenu?: Menu[];
};
