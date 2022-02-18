// import { Dayjs } from "dayjs";

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

type Option = {
  value: any;
  label: string;
};

type WorkReportItem = {
  week: string | Dayjs;
  date: string | Dayjs;
  content: string;
  project: string;
  workTime: number;
  id: string;
  projectName?: string;
};

type ModalHandleType = "add" | "edit";
