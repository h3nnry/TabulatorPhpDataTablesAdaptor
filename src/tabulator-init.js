import { TabulatorFull as Tabulator } from 'tabulator-tables';
import TabulatorConfig from './tabulator-config';

export default function TabulatorInit(columnDefinition, selector) {
  const table = document.querySelector(selector);
  const url = table.getAttribute('data-url');
  let paginationSize = 3;
  if (table.hasAttribute('data-page-length')) {
    paginationSize = table.getAttribute('data-page-length');
  }
  const tabulatorConfig = TabulatorConfig(url);
  tabulatorConfig.columns = columnDefinition;
  tabulatorConfig.paginationSize = paginationSize;

  if (table.hasAttribute('data-order')) {
    const order = table.getAttribute('data-order');
    let orderColumns = [];
    let initialSort = [];
    try {
      orderColumns = JSON.parse(order);
    } catch (e) {
      console.log(e.toString());
    }
    orderColumns.forEach((orderColumn) => {
      if (orderColumn instanceof Array && orderColumn.length == 2 && columnDefinition[orderColumn[0]] !== 'undefined') {
        initialSort.push({ column: columnDefinition[orderColumn[0]]['field'], dir: orderColumn[1] });
      }
    });

    tabulatorConfig.initialSort = initialSort;
  }

  return new Tabulator(selector, tabulatorConfig);
}
