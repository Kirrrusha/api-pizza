import { Logger } from '@nestjs/common';

const delimiter = Array.apply(null, { length: 90 })
  .map(() => '_')
  .join('');
export const lineDelimiter = () => Logger.log(delimiter);
