import objectSerializer from '../objectSerializer';

describe('objectSerializer', () => {
  test('test empty object serialization', () => {
    expect(objectSerializer({})).toBe('');
  });

  test('test multidimensional object serialization', () => {
    expect(objectSerializer({ key1: { value1: [1, 2, 3] }, key2: '?a=b&c=d' })).toBe(
      'key1%5Bvalue1%5D%5B%5D=1&key1%5Bvalue1%5D%5B%5D=2&key1%5Bvalue1%5D%5B%5D=3&key2=%3Fa%3Db%26c%3Dd'
    );
  });
});
