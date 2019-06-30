import { startFindIndex } from './list-find';

/**
 * @params { Array } arr 待查找的数组
 * @params { Any | Function } val 待查找的值或自定义查找的方法
 * @params { Any } walVait 修改的值
 * 
 * @return { Number }   
 */
export default function update (arr, val, valWait) {
    // 先找到该元素的位置，如果不存在，则直接return，如果存在则直接将该位置的值替换成valWait
    const idxFinded = startFindIndex(arr, val),
        listCopyed = [ ...arr ];

    if (idxFinded < 0) {
        return;
    }

    listCopyed.splice(idxFinded, 1, valWait);

    return [ ...listCopyed ];
}   