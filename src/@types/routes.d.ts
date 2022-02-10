type RouteItem = {
  path?: string;
  component?: any;
  name?: string;
  children?: RouteItem[];
  icon?: any;
  key: string;
  hideInMenu?: boolean;
};
