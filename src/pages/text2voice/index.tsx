import { useRequest } from "ahooks";
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Slider,
} from "@arco-design/web-react";
import axios from "axios";
import React, { FC, ReactElement, useRef, useState } from "react";

import { postTextToVoice, voiceOptions } from "./api";
import { IconList } from "@arco-design/web-react/icon";
import useForm from "@arco-design/web-react/es/Form/useForm";

interface IProps {}
const TextToVoice: FC<IProps> = (): ReactElement => {
  const [text, setText] = useState("");
  const [src, setSrc] = useState("");
  const [visible, setVisible] = useState(false);
  const audioInstance = useRef<HTMLAudioElement>();
  const { data: token } = useRequest(async () => {
    const client_id = `OG73hGbMO7QQW6ec2q8HgSvV`;
    const client_secret = `7P6oWaePCdis4QYUT1otetG4c2bwpmfy`;
    const res = await axios.get(`/baidu_token`, {
      params: { grant_type: `client_credentials`, client_id, client_secret },
    });

    return res?.data.access_token;
  });
  const [form] = useForm();

  return (
    <div>
      <div
        style={{
          marginBottom: 10,
        }}
      >
        <Input
          placeholder="输入语音内容"
          value={text}
          onChange={(e) => setText(e)}
          style={{
            width: 300,
          }}
          className="mr-10"
        />
        <Button
          type="primary"
          onClick={async (e) => {
            const params = await form.validate();

            const res = await postTextToVoice({
              tok: token,
              tex: text,
              ...params,
            });
            setSrc(URL.createObjectURL(res.data));
            audioInstance.current.play();
          }}
          className="mr-10"
        >
          合成
        </Button>
        <Button icon={<IconList />} onClick={() => setVisible(true)}>
          参数调整
        </Button>
      </div>
      <Drawer
        visible={visible}
        title="参数调整"
        width={600}
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
      >
        <Form
          title="参数"
          style={{ marginTop: 30 }}
          initialValues={{
            spd: 5,
            vol: 5,
            pit: 5,
            per: 0,
          }}
          form={form}
        >
          <Form.Item label="语速" field={`spd`}>
            <Slider max={15} />
          </Form.Item>
          <Form.Item label="音量" field={`vol`}>
            <Slider max={15} />
          </Form.Item>
          <Form.Item label="音调" field={`pit`}>
            <Slider max={15} />
          </Form.Item>
          <Form.Item label="语音库" field={`per`}>
            <Select options={voiceOptions} />
          </Form.Item>
        </Form>
      </Drawer>
      <div>
        <audio src={src} controls ref={audioInstance}></audio>
      </div>
    </div>
  );
};

export default TextToVoice;
