import { Message } from "@arco-design/web-react";

export interface CatchOptions {
  report?: boolean;
  message?: string;
  log?: boolean;
  toast?: boolean;
}

// 这里写到 const.ts更合理
export const DEFAULT_ERROR_CATCH_OPTIONS: CatchOptions = {
  report: true,
  message: "未知异常",
  log: true,
  toast: false,
};

export class CatchError extends Error {
  public __type__ = "__CATCH_ERROR__";
  /**
   * 捕捉到的错误
   * @param message 消息
   * @options 其他参数
   */
  constructor(
    message: string,
    public options: CatchOptions = DEFAULT_ERROR_CATCH_OPTIONS
  ) {
    super(message);
  }
}


const W_TYPES = ["string", "object"];
export function methodCatch(
  options: string | CatchOptions = DEFAULT_ERROR_CATCH_OPTIONS
) {
  const type = typeof options;

  let opt: CatchOptions;

  if (options == null || !W_TYPES.includes(type)) {
    // null 或者 不是字符串或者对象
    opt = DEFAULT_ERROR_CATCH_OPTIONS;
  } else if (typeof options === "string") {
    // 字符串
    opt = {
      ...DEFAULT_ERROR_CATCH_OPTIONS,
      message: options || DEFAULT_ERROR_CATCH_OPTIONS.message,
    };
  } else {
    // 有效的对象
    opt = { ...DEFAULT_ERROR_CATCH_OPTIONS, ...options };
  }

  return function (
    _target: any,
    _name: string,
    descriptor: PropertyDescriptor
  ): any {
    const oldFn = descriptor.value;

    Object.defineProperty(descriptor, "value", {
      get() {
        async function proxy(...args: any[]) {
          try {
            const res = await oldFn.apply(this, args);
            return res;
          } catch (err) {
            // if (err instanceof CatchError) {
            if (err.__type__ == "__CATCH_ERROR__") {
              err = err as CatchError;
              const mOpt = { ...opt, ...(err.options || {}) };

              if (mOpt.log) {
                console.error(
                  "asyncMethodCatch:",
                  mOpt.message || err.message,
                  err
                );
              }

              if (mOpt.report) {
                // TODO::
              }

              if (mOpt.toast) {
                Message.error(mOpt.message);
              }
            } else {
              const message = err.message || opt.message;
              console.error("asyncMethodCatch:", message, err);

              if (opt.toast) {
                Message.error(message);
              }
            }
          }
        }
        proxy._bound = true;
        return proxy;
      },
    });
    return descriptor;
  };
}
