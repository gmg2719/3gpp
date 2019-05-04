import { isEmpty } from 'lodash';

import { log } from '../../utils/logging';

import { Base } from './base';

export class NamedType extends Base {
  public name: string;
  public type: any;

  constructor(name: string, type: any) {
    super();

    this.name = name;
    this.type = type;
  }

  public setConstraint(constraint: any): NamedType {
    if (!isEmpty(constraint)) {
      log.warn(`NamedType could not handle constraint ${JSON.stringify(constraint)}`);
    }
    return this;
  }

  public expand(): NamedType {
    // TODO
    return this;
  }

  public toString(depth: number = 0): string {
    return `${this.name} ${this.type}`;
  }
}