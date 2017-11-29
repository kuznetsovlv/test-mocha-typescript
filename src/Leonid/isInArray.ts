type primitive = number | string | boolean;

export const isInArray: (arr: primitive[], ...rest: primitive[]) => boolean
  = (arr: primitive[], ...rest: primitive[]): boolean =>
    rest.every((elem: primitive): boolean => !!~arr.indexOf(elem));
