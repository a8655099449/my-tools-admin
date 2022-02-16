import React, { FC, ReactElement } from "react";
import { useParams } from "react-router-dom";

interface IProps {}
const ListDetail: FC<IProps> = (): ReactElement => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>list - details</h1>

      <p>id is {id}</p>
    </div>
  );
};

export default ListDetail;
