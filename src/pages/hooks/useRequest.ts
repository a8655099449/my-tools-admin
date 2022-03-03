import { useMount } from "ahooks";
import { useState } from "react";

export type useRequestServer<TData> = (...params: unknown[]) => Promise<TData>;

export type useRequestOptions<TData> = {
  manual?: boolean; // 是否开启手动模式
  initData?: TData;
  defaultParams?: "";
};

export type RequestResponse<TData> = {
  data: TData;
  loading: boolean;
  run: useRequestServer<TData>;
};

const useRequest = <TData = any>(
  server: useRequestServer<TData>,
  options: useRequestOptions<TData> = {}
): RequestResponse<TData> => {
  const { manual = false, initData = undefined } = options;
  const run: useRequestServer<TData> = async (...params) => {
    setState({ ...state, loading: true });
    try {
      const data = await server(...params).finally(() => {
        setState({ ...state, loading: false });
      });

      setState({
        ...state,
        

      });
      return data;
    } catch (error) {
      state.loading == true && setState({ ...state, loading: false });
      throw error;
    }
  };

  const [state, setState] = useState<RequestResponse<TData>>({
    loading: false,
    data: initData,
    run,
  });

  useMount(() => {
    if (!manual) {
      state.run();
    }
  });

  return state;
};

export default useRequest;
