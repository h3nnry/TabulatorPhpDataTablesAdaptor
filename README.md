# TabulatorPhpDataTablesAdaptor
Adaptor for Tabulator.js work with php datatables. Use query structure requested by php datatables.

## How it works
```
import TabulatorInit from './tabulator-init';

document.addEventListener('DOMContentLoaded', function () {
  const columnDefinition = [
    { title: 'ID', field: 'id' },
    { title: 'Type', field: 'type' },
    { title: 'Name', field: 'name' },
  ];
  // datatable defined id
  const selector = '#data-table-campaign-list';

  TabulatorInit(columnDefinition, selector);
});
```