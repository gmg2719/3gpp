import { readFile } from 'fs';
import { parse as parsePath } from 'path';

import * as xl from 'excel4node';

import { IConditionDefinitionElem, IIe, IMsgIeDefinition, IRangeDefinitionElem } from './common';
import { expand } from './expand';
import { parse } from './parse';

type fieldType = 'ie/group name' | 'presence' | 'range' | 'ie type and reference' | 'semantics description' |
                'criticality' | 'assigned criticality';

/**
 * Configuration structure for formatting
 */
export interface IFormatConfig {
  order: fieldType[];
  /**
   * Whether to show collection of range bounds
   */
  showRange: boolean;
  /**
   * Whether to show collection of conditions
   */
  showCondition: boolean;
  /**
   * Whether to group parent-child IEs
   */
  grouping: boolean;
  /**
   * Whether to freeze header of each message or IE
   */
  freezeHeader: boolean;
  /**
   * Custom styling. See [excel4node](https://www.npmjs.com/package/excel4node)
   */
  style: {
    title: any,
    header: any,
    /**
     * Column width for indentation
     */
    indentWidth: number,
  };
}

/**
 * Default configuration for formatting
 */
export const formatConfigDefault: IFormatConfig = {
  order: ['ie/group name', 'presence', 'range', 'ie type and reference', 'semantics description',
          'criticality', 'assigned criticality'],
  showRange: true,
  showCondition: true,
  grouping: true,
  freezeHeader: false,
  style: {
    title: {
      font: {
        size: 18,
        bold: true,
      },
    },
    header: {
      font: {
        bold: true,
      },
    },
    indentWidth: 3,
  },
};

const styleBorderLeft = {
  border: {
    left: {
      style: 'thin',
    },
  },
};

const styleBorderTop = {
  border: {
    top: {
      style: 'thin',
    },
  },
};

const headerDefinition: IIe = {
  'ie/group name': 'IE/Group Name',
  'presence': 'Presence',
  'range': 'Range',
  'ie type and reference': 'IE Type and Reference',
  'semantics description': 'Semantics Description',
  'criticality': 'Criticality',
  'assigned criticiality': 'Assigned Criticality',
  'depth': 0,
};

const headerRange: IRangeDefinitionElem = {
  'range bound': 'Range bound',
  'explanation': 'Explanation',
};

const headerCondition: IConditionDefinitionElem = {
  condition: 'Condition',
  explanation: 'Explanation',
};

/**
 * Generate an Excel workbook containing message(s) and/or IE(s) in a tabular form
 * @param msgIeDefinitions Definitions of message(s) and/or IE(s)
 * @param formatConfig Formatting configuration. TBA
 * @returns excel4node [`Workbook`](https://www.npmjs.com/package/excel4node) object.
 * One worksheet is included for one definition
 */
export function format(msgIeDefinitions: IMsgIeDefinition[], formatConfig: IFormatConfig = formatConfigDefault): any {
  const wb = new xl.Workbook({
    author: '3GPP Utility https://github.com/gsongsong/3gpp',
  });
  msgIeDefinitions.forEach((msgIeDefinition) => {
    const wsName = sheetname(msgIeDefinition);
    const ws = wb.addWorksheet(wsName, {
      outline: {
        summaryBelow: false,
      },
    });
    const depthMax = msgIeDefinition.ies.reduce((prevDepth: number, currElem) => {
      return Math.max(prevDepth, currElem.depth);
    }, 0);

    let [row, col] = [1, 1];
    ws.cell(row++, col).string(msgIeDefinition.name).style(formatConfig.style.title);
    if (msgIeDefinition.description) {
      ws.cell(row++, col).string(msgIeDefinition.description);
    }
    if (msgIeDefinition.direction) {
      ws.cell(row++, col).string(`Direction: ${msgIeDefinition.direction}`);
    }

    row++;
    [row, col] = fillDefinition(msgIeDefinition.ies, ws, row, col, depthMax, formatConfig);

    if (msgIeDefinition.range && formatConfig.showRange) {
      row++;
      [row, col] = fillRange(msgIeDefinition.range, ws, row, col, depthMax, formatConfig);
    }

    if (msgIeDefinition.condition && formatConfig.showCondition) {
      row++;
      [row, col] = fillCondition(msgIeDefinition.condition, ws, row, col, depthMax, formatConfig);
    }
  });
  return wb;
}

function sheetname(msgIeDefinition: IMsgIeDefinition): string {
  return `${msgIeDefinition.section} ${msgIeDefinition.name}`.substr(0, 31);
}

function fillDefinition(ies: IIe[], ws: any, row: number, col: number, depthMax: number,
                        formatConfig: IFormatConfig): number[] {
  if (formatConfig.freezeHeader) {
    ws.row(row).freeze();
  }
  ws.cell(row, col, row, col + depthMax + formatConfig.order.length - 1).style(formatConfig.style.header);
  [headerDefinition, ...ies].forEach((ie) => {
    formatConfig.order.forEach((field, index): void => {
      if (index === 0) {
        ws.cell(row, col).style(styleBorderLeft);
      }
      switch (field) {
        case 'ie/group name': {
          for (let i = 0; i < ie.depth; i++) {
            ws.column(col).setWidth(formatConfig.style.indentWidth);
            ws.cell(row, col++).style(styleBorderLeft);
          }
          ws.cell(row, col).string(ie['ie/group name']).style(styleBorderLeft).style(styleBorderTop);
          ws.column(col++).setWidth(formatConfig.style.indentWidth);
          for (let i = ie.depth; i < depthMax; i++) {
            ws.column(col).setWidth(formatConfig.style.indentWidth);
            ws.cell(row, col++).style(styleBorderTop);
          }
          ws.column(col - 1).setWidth(30);
          break;
        }
        case 'presence': {
          ws.cell(row, col++).string(ie.presence).style(styleBorderTop);
          break;
        }
        case 'range': {
          ws.cell(row, col++).string(ie.range).style(styleBorderTop);
          break;
        }
        case 'ie type and reference': {
          ws.cell(row, col++).string(ie['ie type and reference']).style(styleBorderTop);
          break;
        }
        case 'semantics description': {
          ws.cell(row, col++).string(ie['semantics description']).style(styleBorderTop);
          break;
        }
        case 'criticality': {
          const criticality = ie.criticality || '';
          ws.cell(row, col++).string(criticality).style(styleBorderTop);
          break;
        }
        case 'assigned criticality': {
          const assignedCriticality = ie['assigned criticiality'] || '';
          ws.cell(row, col++).string(assignedCriticality).style(styleBorderTop);
          break;
        }
      }
      if (index === formatConfig.order.length - 1) {
        ws.cell(row, col).style(styleBorderLeft);
      }
      if (formatConfig.grouping && ie.depth > 0) {
        ws.row(row).group(Math.min(ie.depth, 7));
      }
    });
    row++;
    col = 1;
  });
  ws.cell(row, col, row, col + depthMax + formatConfig.order.length - 1).style(styleBorderTop);
  return [row, col];
}

function fillRange(range: IRangeDefinitionElem[], ws: any, row: number, col: number, depthMax: number,
                   formatConfig: IFormatConfig): number[] {
  ws.cell(row, col, row, col + depthMax + 1).style(formatConfig.style.header);
  [headerRange, ...range].forEach((rangeElem) => {
    ws.cell(row, col, row, col + depthMax + formatConfig.order.length - 1).style(styleBorderTop);
    ws.cell(row, col + depthMax + formatConfig.order.length).style(styleBorderLeft);
    ws.cell(row, col).string(rangeElem['range bound']).style(styleBorderLeft);
    ws.cell(row++, col + depthMax + 1).string(rangeElem.explanation);
  });
  ws.cell(row, col, row, col + depthMax + formatConfig.order.length - 1).style(styleBorderTop);
  return [row, col];
}

function fillCondition(condition: IConditionDefinitionElem[], ws: any, row: number, col: number,
                       depthMax: number, formatConfig: IFormatConfig): number[] {
  ws.cell(row, col, row, col + depthMax + 1).style(formatConfig.style.header);
  [headerCondition, ...condition].forEach((conditionElem) => {
    ws.cell(row, col, row, col + depthMax + formatConfig.order.length - 1).style(styleBorderTop);
    ws.cell(row, col + depthMax + formatConfig.order.length).style(styleBorderLeft);
    ws.cell(row, col).string(conditionElem.condition).style(styleBorderLeft);
    ws.cell(row++, col + depthMax + 1).string(conditionElem.explanation);
  });
  ws.cell(row, col, row, col + depthMax + formatConfig.order.length - 1).style(styleBorderTop);
  return [row, col];
}

if (require.main === module) {
  const [filePath, msgIeName, needExpansion] = process.argv.slice(2);
  if (!filePath || !msgIeName) {
    throw Error('Requires 2 or 3 arguments, filePath, msgIeName and expand');
  }
  readFile(filePath, 'utf8', (err: Error, html: string) => {
    if (err) {
      throw err;
    }
    const fileName = parsePath(filePath);
    const definitions = parse(html);
    let msgIeDefinitions: IMsgIeDefinition[] = null;
    let wb = null;
    let outFileName: string = fileName.name;
    if (msgIeName === 'all') {
      msgIeDefinitions = Object.keys(definitions).filter((key) => {
        return typeof definitions[key] !== 'string';
      }).map((sectionNumber) => {
        return definitions[sectionNumber] as IMsgIeDefinition;
      });
    } else {
      if (!(msgIeName in definitions)) {
        throw Error(`Definition for a given name ${msgIeName} is not found`);
      }
      const sectionNumber  = definitions[msgIeName] as string;
      msgIeDefinitions = [definitions[sectionNumber] as IMsgIeDefinition];
      outFileName += ` ${msgIeName}`;
    }
    if (needExpansion === 'expand') {
      let definitionsExpanded = {};
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < msgIeDefinitions.length; i++) {
        ({msgIeDefinition: msgIeDefinitions[i], definitionsExpanded} =
          expand(msgIeDefinitions[i], definitions, definitionsExpanded));
      }
      outFileName += ` (expanded)`;
    }
    wb = format(msgIeDefinitions);
    wb.write(`${outFileName}.xlsx`);
  });
}
