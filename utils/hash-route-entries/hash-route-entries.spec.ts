import { hashRouteEntries } from './hash-route-entries';

describe('hashRouteEntries', () => {
  it('should return empty object with empty string', () => {
    expect(hashRouteEntries('')).toEqual({});
  });

  it('returns a single valid entry', () => {
    expect(hashRouteEntries('#key=value')).toEqual({ key: 'value' });
  });

  it('returns correctly for a pair of entries', () => {
    expect(hashRouteEntries('#key=value&key2=value2')).toEqual({ key: 'value', key2: 'value2' });
  });

  it('returns empty object if only key present', () => {
    expect(hashRouteEntries('#key')).toEqual({});
  });
});