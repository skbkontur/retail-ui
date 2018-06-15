

export const tryParseDateString = (value: string) => {
  const DMYre = /([\d\_]{1,2}).([\d\_]{1,2}).([\d\_]{4})/;
  const execDMY = DMYre.exec(value);
  if (execDMY) {
    const [date, month, year] = execDMY.slice(1).map(x => x.padStart(2, '0'));
    return { date, month, year };
  }

  const YMDre = /([\d\_]{4}).([\d\_]{1,2}).([\d\_]{1,2})/;
  let execYMD = YMDre.exec(value);
  if (execYMD) {
    const [year, month, date] = execYMD.slice(1).map(x => x.padStart(2, '0'));
    return { date, month, year };
  }

  return null;
};
