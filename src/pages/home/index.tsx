import lazyload from '@/components/lazyload';
import React, { FC, ReactElement } from 'react';

interface IProps {}
const index: FC<IProps> = (): ReactElement => {

   // const List =  lazyload(`./pages/list/index.tsx`)

   return <div>
      {
         Array(1000).fill('').map((_,i)=><li key={i}>{i}</li>)

      }
   </div>;
};

export default index;