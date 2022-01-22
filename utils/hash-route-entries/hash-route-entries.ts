export const hashRouteEntries = <T=unknown>(route: string) => {
  const start = route.indexOf('#') + 1;
  return route
    .substring(start, route.length)
    .split('&')
    .reduce((entries, pair) => {
      const [key, value] = pair.split('=');
      entries[key] = value;
      return entries;
    }, {} as T);
}
