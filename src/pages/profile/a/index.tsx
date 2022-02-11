import { DatePicker } from '@arco-design/web-react';
import React, { FC, ReactElement } from 'react';

interface IProps {}
const index: FC<IProps> = (): ReactElement => {
   return <div>
     <DatePicker />
   </div>;
};

export default index;