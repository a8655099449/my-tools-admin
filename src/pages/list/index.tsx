import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface IProps {}
const List: FC<IProps> = (): ReactElement => {
   return <div>
     我是列表页面
    <Link to={`/list/listDetail/556`} >
      去列表详情页
    </Link>
   </div>;
};

export default List;