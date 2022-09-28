import objectSerializer from './objectSerializer';

export default function TabulatorConfig(url) {
  return {
    layout: 'fitColumns',
    responsiveLayout: true,
    sortMode: 'remote',
    ajaxURL: url,
    ajaxConfig: 'get',
    pagination: true,
    paginationSize: 3,
    paginationMode: 'remote',
    locale: 'de-de',
    langs: {
      'de-de': {
        columns: {
          name: 'Name',
        },
        ajax: {
          loading: 'Bitte warten',
          error: 'Es gab einen Fehler. Bitte versuche es nochmal.',
        },
        data: {
          loading: 'Bitte warten',
          error: 'Es gab einen Fehler. Bitte versuche es nochmal.',
        },
        pagination: {
          first: 'Anfang',
          first_title: 'zum Anfang',
          last: 'Ende',
          last_title: 'zum Ende',
          prev: 'Zurück',
          prev_title: 'Seite zurück',
          next: 'Weiter',
          next_title: 'Seite vorwärts',
          page_title: 'zur Seite',
        },
      },
    },
    ajaxURLGenerator: function (url, config, params) {
      let datatableFormatColumns = [];
      const columnDefinitions = this.getColumnDefinitions();
      columnDefinitions.forEach(function (column, key) {
        datatableFormatColumns[key] = {
          data: column.field,
          name: column.field,
        };
      });
      let orderColumns = [];
      if (params.sort.length > 0) {
        let arrayColumnFields = {};
        columnDefinitions.forEach((column, key) => {
          arrayColumnFields[column.field] = key;
        });

        params.sort.forEach((sort, key) => {
          if (typeof arrayColumnFields[sort.field] !== undefined) {
            orderColumns[key] = { column: arrayColumnFields[sort.field], dir: sort.dir };
          }
        });
      }

      const start = (params.page - 1) * params.size;
      const requestParams = {
        draw: 1,
        start,
        search: { value: null, regex: false },
        length: params.size,
        columns: datatableFormatColumns,
        order: orderColumns,
      };

      if (url.indexOf('?') === -1) {
        url += '?';
      } else {
        url += '&';
      }

      return url + objectSerializer(requestParams);
    },
    ajaxResponse: function (url, params, response) {
      let last_page = 1;
      if (response.recordsFiltered !== undefined) {
        last_page = Math.ceil(parseInt(response.recordsFiltered) / params.size);
      }
      return {
        data: response.data,
        last_page,
      };
    },
  };
}
