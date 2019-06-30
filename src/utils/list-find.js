// 二分查找法，数组元素必须是number、boolean、numberString这种类型的
// 所以这使用普通查找

/**
 * @params { Number } dire 方向
 *
 * @return { Function }
 */
function findIndex (dire) {
    /**
     * @params { Array } arr 待查找的数组
     * @params { Any | Function } val 待查找的值或自定义查找的方法
     *
     * @return { Number }   
     */
    return (arr, val) => {
        // 先定义遍历的起始位置和结束位置
        let start = dire > 0 ? 0 : arr.length - 1,
            end = dire > 0 ? arr.length - 1 : 0,
            diff = typeof val !== 'function' 
                ? item => item === val 
                : (item, idx, arr) => val(item, idx, arr);

        // 遍历条件同时设置针对顺序和倒序的
        // 如果是顺序的，那么start肯定永远 >= 0
        // 如果是倒序的，那么start肯定永远 <= arr.length
        for (; start <= end && start >= 0; start += index) {

            if (diff(arr[ start ], start, arr) === true) {
                return start;
            }
        }        

        return -1;
    };
}

const startFindIndex = findIndex(1),
    endFindIndex = findIndex(-1);


export { startFindIndex, endFindIndex };
