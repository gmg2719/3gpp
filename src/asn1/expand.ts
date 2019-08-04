import { cloneDeep } from 'lodash';

import { IMsgIe } from './format/common';

export function expand(msgIe: IMsgIe, asn1Pool: any /* TODO */): any {
  const msgIeClone = cloneDeep(msgIe);
  const expandQueue = [[msgIeClone.definition, asn1Pool, undefined, (msgIeClone.definition as any).parameterList]];
  while (expandQueue.length) {
    const item = expandQueue.shift();
    item[0].expand(...item.slice(1), expandQueue);
  }
  return msgIeClone;
}
