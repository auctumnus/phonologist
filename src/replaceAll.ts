/**
 * Ponyfill for String.prototype.replaceAll.
 * @param str The string to search in.
 * @param find The string to search for.
 * @param rep The string to replace all instances of `find` with.
 */
export const replaceAll =
  // @ts-ignore
  /* c8 ignore next 5 */
  ''.replaceAll
    ? (str: string, find: string | RegExp, rep: string) =>
        str.replaceAll(find, rep)
    : (str: string, find: string | RegExp, rep: string) =>
        str.split(find).join(rep)
