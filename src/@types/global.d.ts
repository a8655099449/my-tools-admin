type Lang = "zh-CN" | "en-US";

type Locale = {
  [k in Lang]: {
    [key in string]: string;
  };
};

type UserInfo = {
  acc?: string;
  pwd?: string;
  auth?: string[];
  remember?: boolean;
  name?: string;
};
type SettingOptions = {
  themeColor: string;
  lang: Lang;
  theme: "dark" | "light";
  collapsed: boolean;
};
