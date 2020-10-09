import { isUrl, getRouteAuthority } from './utils';

describe('isUrl tests', () => {
  it('should return false for invalid and corner case inputs', () => {
    expect(isUrl([])).toBeFalsy();
    expect(isUrl({})).toBeFalsy();
    expect(isUrl(false)).toBeFalsy();
    expect(isUrl(true)).toBeFalsy();
    expect(isUrl(NaN)).toBeFalsy();
    expect(isUrl(null)).toBeFalsy();
    expect(isUrl(undefined)).toBeFalsy();
    expect(isUrl('')).toBeFalsy();
  });
  it('should return false for invalid URLs', () => {
    expect(isUrl('foo')).toBeFalsy();
    expect(isUrl('bar')).toBeFalsy();
    expect(isUrl('bar/test')).toBeFalsy();
    expect(isUrl('http:/example.com/')).toBeFalsy();
    expect(isUrl('ttp://example.com/')).toBeFalsy();
  });
  it('should return true for valid URLs', () => {
    expect(isUrl('http://example.com/')).toBeTruthy();
    expect(isUrl('https://example.com/')).toBeTruthy();
    expect(isUrl('http://example.com/test/123')).toBeTruthy();
    expect(isUrl('https://example.com/test/123')).toBeTruthy();
    expect(isUrl('http://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('http://www.example.com/')).toBeTruthy();
    expect(isUrl('https://www.example.com/')).toBeTruthy();
    expect(isUrl('http://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123')).toBeTruthy();
    expect(isUrl('http://www.example.com/test/123?foo=bar')).toBeTruthy();
    expect(isUrl('https://www.example.com/test/123?foo=bar')).toBeTruthy();
  });
});
describe('getRouteAuthority tests', () => {
  it('should return authority for each route', () => {
    const routes = [
      {
        path: '/user',
        name: 'user',
        authority: ['user'],
        exact: true,
      },
      {
        path: '/admin',
        name: 'admin',
        authority: ['admin'],
        exact: true,
      },
    ];
    expect(getRouteAuthority('/user', routes)).toEqual(['user']);
    expect(getRouteAuthority('/admin', routes)).toEqual(['admin']);
  });
  it('should return inherited authority for unconfigured route', () => {
    const routes = [
      {
        path: '/nested',
        authority: ['admin', 'user'],
        exact: true,
      },
      {
        path: '/nested/user',
        name: 'user',
        exact: true,
      },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['admin', 'user']);
  });
  it('should return authority for configured route', () => {
    const routes = [
      {
        path: '/nested',
        authority: ['admin', 'user'],
        exact: true,
      },
      {
        path: '/nested/user',
        name: 'user',
        authority: ['user'],
        exact: true,
      },
      {
        path: '/nested/admin',
        name: 'admin',
        authority: ['admin'],
        exact: true,
      },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['user']);
    expect(getRouteAuthority('/nested/admin', routes)).toEqual(['admin']);
  });
  it('should return authority for substring route', () => {
    const routes = [
      {
        path: '/nested',
        authority: ['user', 'users'],
        exact: true,
      },
      {
        path: '/nested/users',
        name: 'users',
        authority: ['users'],
        exact: true,
      },
      {
        path: '/nested/user',
        name: 'user',
        authority: ['user'],
        exact: true,
      },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['user']);
    expect(getRouteAuthority('/nested/users', routes)).toEqual(['users']);
  });
});
