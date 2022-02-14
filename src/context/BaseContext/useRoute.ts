import routes from "@/config/routes";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export type TUseRoutes = {
  currentRoute: RouteItem | null;
};

export const useRoutes = (): TUseRoutes => {
  const { pathname } = useLocation();

  const findRouteByKey = (pathname: string, routes: RouteItem[]): RouteItem => {
    const findRoute = (pathname: string, routes: RouteItem[]): RouteItem => {
      let current: RouteItem;
      pathname = pathname.replace(/^\//, "");

      routes.forEach((item) => {
        if (current) return;
        if (item.key === pathname) {
          return (current = item);
        }

        if (item.children && item.children.length > 0) {
          current = findRoute(pathname, item.children);
        }
      });
      // @ts-ignore
      return current;
    };

    return findRoute(pathname, routes);
  };

  const _currentRoute = useMemo(() => {
    return findRouteByKey(pathname, routes);
  }, [pathname]);


  return { currentRoute:_currentRoute };
};
