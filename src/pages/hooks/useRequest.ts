import { useMount } from "ahooks";
import { useState } from "react";

export type useRequestServer<TData> = () => Promise<TData>;

export type useRequestOptions<TData> = {
  manual?: boolean; // 是否开启手动模式
  initData?: TData;
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
  const run = async () => {
    setState({ ...state, loading: true });

    const data = await server().finally(() => {
      state.loading == true && setState({ ...state, loading: false });
    });
    setState({
      ...state,
      data,
      loading: false,
    });

    return data;
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
