export default function objectSerializer(objectToSerialize: object) {
  let serializedString: any = [];
  let add = function (key: any, value: any) {
    value = typeof value === 'function' ? value() : value;
    value = value === null ? '' : value === undefined ? '' : value;
    serializedString[serializedString.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
  };
  let buildParams = function (prefix: string, object: any) {
    let i, len, key;

    if (prefix) {
      if (Array.isArray(object)) {
        for (i = 0, len = object.length; i < len; i++) {
          buildParams(prefix + '[' + (typeof object[i] === 'object' && object[i] ? i : '') + ']', object[i]);
        }
      } else if (Object.prototype.toString.call(object) === '[object Object]') {
        for (key in object) {
          buildParams(prefix + '[' + key + ']', object[key]);
        }
      } else {
        add(prefix, object);
      }
    } else if (Array.isArray(object)) {
      for (i = 0, len = object.length; i < len; i++) {
        add(object[i].name, object[i].value);
      }
    } else {
      for (key in object) {
        buildParams(key, object[key]);
      }
    }
    return serializedString;
  };

  return buildParams('', objectToSerialize).join('&');
}
