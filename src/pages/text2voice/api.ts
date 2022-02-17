import axios from "axios";
// 文档地址 https://cloud.baidu.com/doc/SPEECH/s/Qk38y8lrl
export const postTextToVoice = ({ tex, tok, ...rest }) => {
  const params = {
    spd: 5, // 语速，取值0-15，默认为5中语速
    pit: 5, // 音调，取值0-15，默认为5中语调
    vol: 15,
    per: 5118,
    tok,
    tex,
    lan: "zh",
    aue: 3,
    ctp: 1,
    cuid: tok,
    ...rest,
  };
  // console.log( );
  const fd = [];
  Object.keys(params).forEach((k) => {
    fd.push(`${k}=${encodeURIComponent(params[k])}`);
  });
  console.log(fd.join("&"));

  return axios.post(`http://tsn.baidu.com/text2audio`, fd.join("&"), {
    responseType: "blob",
  });
};

export const voiceOptions = [
  {
    value: 1,
    label: "度小宇（男声）",
  },
  {
    value: 0,
    label: "度小美（标准女声）",
  },
  {
    value: 3,
    label: "度逍遥（标准男声）",
  },
  {
    value: 4,
    label: "度丫丫(可爱女声)",
  },
  {
    value: 5118,
    label: "小鹿（女声）",
  },
  {
    value: 5,
    label: "度小娇",
  },
];
