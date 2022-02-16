import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface IProps {}
const List: FC<IProps> = (): ReactElement => {
   return <div>
     我是列表页面
    <Link to={`/list/listDetail/556`} >
      动态路由的详情页面
    </Link>
   </div>;
};

export default List;