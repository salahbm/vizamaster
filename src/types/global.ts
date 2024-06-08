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
