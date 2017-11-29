export type primitive = number | string | boolean;

export const getUnique: (...arr: primitive[]) => primitive[] = (...arr: primitive[]): primitive[] => {
  return arr.reduce((res: primitive[], ell: primitive): primitive[] => {
    if (!~res.indexOf(ell)) {
      res.push(ell);
    }

    return res;
  }, []);
};
