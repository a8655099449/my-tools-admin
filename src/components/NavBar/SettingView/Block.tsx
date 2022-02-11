import React, { FC, ReactElement } from "react";

interface IProps {
  title: string;
}
const Block: FC<IProps> = ({ title, children }): ReactElement => {
  return (
    <div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          margin:'10px 0'
        }}
      >
        {title}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Block;
