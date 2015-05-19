export default function(n, one, few, many) {
  if (n % 10 == 1 && n % 100 != 11) {
    return one;
  } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
    return few;
  } else {
    return many;
  }
};
