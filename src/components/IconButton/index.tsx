import { Button } from "@arco-design/web-react";
import { BaseButtonProps } from "@arco-design/web-react/es/Button/interface";
import React, { FC, ReactElement } from "react";

interface IProps {}
const IconButton: FC<IProps & BaseButtonProps> = (props): ReactElement => {
  return <Button shape="circle" {...props}></Button>;
};

export default IconButton;
