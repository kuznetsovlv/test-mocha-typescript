/**
 * Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
 * Возвращает true, если все аргументы, кроме первого входят в первый.
 * Первым всегда должен быть массив.
 */
interface A {
    sun(): void
}
export type a = string | number | boolean;
export function isInArray<T extends a>(arr: T[], ...elements: T[]): boolean {
    let inArr = true;
    for (let el of elements) {
        if (arr.indexOf(el) === -1) {
            inArr = false;
            break;
        }
    }
    return inArr;
}
// console.log(isInArray<number>([1, 4, 5, 6], 3, 5, 6, 7));
// console.log(isInArray<boolean | number>([true, false, 1], 2, true));

/**
 * Написать функцию summator(), которая сумирует переданые ей аргументы.
 * Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
 */
export function summator(...elements: number[]): number;
export function summator(...elements: string[]): number;
export function summator(...elements: any[]): number {
    let sum = 0;
    for (let el of elements) {
        let parseEl = parseFloat(el);
        if (isNaN(parseEl)) {
            sum += 0;
            continue;
        }
        sum += parseEl;
    }
    return sum;
}

// console.log(summator(1, 4, 5.5));
// console.log(summator('1.2', 'asdasd', '2.2'));

// /**
//  * Написать функцию parseQueryString(), которая парсит строку типа a=1&b=hellow.
//  * Аргумент может быть только строковой
//  */

// /* tslint:disable */
// // export function parseQueryString(queryString = ''): any {
// //     /* tslint:enable */
// //     let resObj = {};
// //     let str = queryString.split('&');
// //     if (str.length === 1) {
// //         return resObj;
// //     }
// //     for (let s of str) {
// //         let keyVal = s.split('=');
// //         if (keyVal.length === 1) {
// //             continue;
// //         }
// //         resObj[keyVal[0]] = keyVal[1];
// //     }
// //     return resObj;
// // }

// // console.log(parseQueryString());

// // console.log(parseQueryString());

// // console.log(parseQueryString('asadsasdasda'));

// // console.log(parseQueryString('a=1&b=2&c=3'));


// /**
//  * Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
//  * и возвращает массив уникальных элементов. Аргумент не должен изменяться.
//  * Порядок элементов результирующего массива должен совпадать с порядком,
//  * в котором они встречаются в оригинальной структуре.
//  * Специально обрабатывать значение NaN не обязательно.
//  */

// type snb = string | number | boolean
// export function getUnique<T>(...args: T[]): T[] {
//     let uniqArr: T[] = [];
//     for (let arg of args) {
//         if (uniqArr.indexOf(arg) !== -1) {
//             continue;
//         }
//         uniqArr.push(arg);
//     }
//     return uniqArr;
// }

// console.log(getUnique<snb>(1, 'a', 1, 2, 'a', 'b', true, true, 2));
