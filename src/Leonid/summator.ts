const isString: (value: any) => value is string
  = (value: any): value is string => typeof value === 'string';

type ns = number | string;
/*
 * А можно реализовать перегрузку для функций-стрелок?
 */
export function summator (...nums: number[]): number;
export function summator (...nums: string[]): number;
export function summator (...nums: ns[]): number {
  return nums.map((value: ns): number => isString(value) ? parseFloat(value) : value)
    .reduce((a: number, b: number): number => a + b, 0/*Чтобы функция не падала в случае пустого массива*/);
}
