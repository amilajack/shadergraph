// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS202: Simplify dynamic range loops
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
export const make = function(x) {
  if ((x == null)) { x = []; }
  if (!(x instanceof Array)) { x = [+x != null ? +x : 0]; }
  return x;
};

export const nest = (a, b) => a.concat(b);

export const compare = function(a, b) {
  const n = Math.min(a.length, b.length);
  for (let i = 0, end = n, asc = 0 <= end; asc ? i < end : i > end; asc ? i++ : i--) {
    const p = a[i];
    const q = b[i];
    if (p > q) {
      return -1;
    }
    if (p < q) {
      return 1;
    }
  }
  a = a.length;
  b = b.length;
  if (a > b) { return -1; } else if (a < b) { return 1; } else { return 0; }
};

export const max = function(a, b) {
  if (compare(a, b) > 0) { return b; } else { return a; }
};
