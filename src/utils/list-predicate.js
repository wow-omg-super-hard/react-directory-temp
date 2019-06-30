// 数组处理，包括删除和修改
import { startFindIndex } from './list-find';

/**
 * @params { Array } arr 待查找的数组
 * @params { Any | Function } val 待查找的值或自定义查找的方法
 * @params { Any } walVait 修改的值
 * 
 * @return { Number }   
 */
function predicate (arr, val, waitUpdate) {
    // 先找到该元素的位置，如果不存在，则直接return
    // 如果是删除操作，则直接删除该位置的元素
    // 如果是修改操作，用waitUpdate替换该位置的值
    const idxFinded = startFindIndex(arr, val),
        listCopyed = [ ...arr ];

    if (idxFinded < 0) {
        return;
    }

    if (waitUpdate === undefined) {
        listCopyed.splice(idxFinded, 1);    
    } else {
        listCopyed.splice(idxFinded, 1, waitUpdate);
    }

    return [ ...listCopyed ];
}