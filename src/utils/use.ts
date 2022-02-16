import { useLocation ,  } from "react-router-dom";

export const useQuery = (): {
  [key in string]: any;
} => {
  const query = {};
  const search = decodeURI(location.href.split("?")[1]);
  if (search) {
    const qList = search.split("&");
    qList.forEach((str) => {
      if (str && str.includes("=")) {
        // @ts-ignore
        let [key, value]: [string, any] = str.split("=");
        if (!isNaN(+value)) {
          value = +value;
        }
        if (value == "true") value = true;
        if (value == "false") value = false;

        query[key] = value;
      }
    });
  }
  return query;
};
