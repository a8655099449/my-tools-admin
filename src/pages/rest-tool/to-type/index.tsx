import { copy2Clipboard, parseObjectType } from "@/utils";
import { isJson } from "@/utils/is";
import { Button, Card, Input } from "@arco-design/web-react";
import React, { FC, ReactElement, useMemo, useState } from "react";
import highlight from "highlight.js";
import { IconCopy, IconCopyright } from "@arco-design/web-react/icon";

interface IProps {}

const ToType: FC<IProps> = (): ReactElement => {
  const [inputValue, setInputValue] = useState(
    `{
  "id": 647,
  name:"55555",
  array:[],
  obj:{}
}`
  );
  const output = useMemo(() => {
    let _inputValue = inputValue.trim().replace(/;/g, ",").replace(/'/g, '"');

    try {
      const object: object = window.eval(`
      new Object(${_inputValue})
    `);
      return parseObjectType(object);
      console.log("👴parseObjectType>>>");
    } catch (error) {
      return ``;
    }
  }, [inputValue]);

  const html = highlight.highlight(`type T = ${output}`, {
    language: "ts",
  }).value;
  return (
    <div>
      <h2>请输入value</h2>
      <Input.TextArea
        style={{
          height: 300,
        }}
        value={inputValue}
        onChange={(e) => setInputValue(e)}
      />

      <h2>
        type
        <Button
          onClick={() => {
            copy2Clipboard(`type T = ${output}`);
          }}
          type="primary"
          style={{
            marginLeft: 10,
          }}
          icon={<IconCopy/>}
        >
          复制
        </Button>
      </h2>
      <Card>
        <div
          dangerouslySetInnerHTML={{
            __html: html,
          }}
          style={{
            whiteSpace: "pre-wrap",
          }}
        />
      </Card>
    </div>
  );
};

export default ToType;
