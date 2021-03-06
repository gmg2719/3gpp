/**
 * A collection of a given RAN3 AP (e.g. S1-C, X2-C, NG-C, Xn-C, E1, F1-C)
 */
export interface IDefinitions {
  /**
   * - If a key indicates a section number, then a value indicates an actual definition
   * - If a key indicates a message or IE name, the a value indicates a section number
   */
  [sectionNumberOrTitle: string]: IMsgIeDefinition | string;
}

/**
 * Definition of a message or IE
 */
export interface IMsgIeDefinition {
  /**
   * Section number in a spec document
   */
  section: string;
  name: string;
  description: string;
  /**
   * Message direction. `null` if it is not a message, but an IE
   */
  direction: string;
  /**
   * Actual definition. A collection of sub IEs
   */
  ies: IIe[];
  /**
   * Collection of range bounds. `null` if no range bound is present
   */
  range: IRangeDefinitionElem[];
  /**
   * Collection of conditions. `null` if no condition is present
   */
  condition: IConditionDefinitionElem[];
}

/**
 * Definition of a sub IE
 */
export interface IIe {
  'ie/group name': string;
  'presence': string;
  'range': string;
  'ie type and reference': string;
  'semantics description': string;
  'criticality'?: string;
  'assigned criticiality'?: string;
  /**
   * Depth of a sub IE. Corresponds to the number of `>` in a spec table, e.g. `>>> PDCP Count` indicates depth of 3
   */
  'depth': number;
}

/**
 * Definition of a single range bound
 */
export interface IRangeDefinitionElem {
  /**
   * Name of range bound
   */
  'range bound': string;
  'explanation': string;
}

/**
 * Definition of a single condition
 */
export interface IConditionDefinitionElem {
  /**
   * Name of condition
   */
  condition: string;
  explanation: string;
}

/**
 * Regular expression for section number and title. Support formats as supported by [[reReference]].
 *
 * *This is defined to determine whther section number and title are not contained in heading tag (`h1`-`h6`)*
 */
export const reSection = /^\b[1-9A-Z]\d*(\.[1-9]\d*)*\.[1-9]\d*\w*\b\s+?.+$/;

/**
 * Regular expression for reference represented by section number. Support following formats:
 * - 9.1.2.3
 * - 9.1.2.3a
 * - A.1.2.3
 * - A.1.2.3a
 */
export const reReference = /\b[1-9A-Z]\d*(\.[1-9]\d*)*\.[1-9]\d*\w*\b/;
