function uniq (arr) {
    const diffs = {};
    let key;

    return arr.filter(val => {
        // 判断由val组成的key是否存在diffs中，如果存在则表示该元素已经存在于数组中
        // 组成key的规则是typeof val + JSON.stringify(val)
        // typeof val是解决Boolean类型或Number类型当做key的时候隐式转成String，然后被判定为存在diffs
        // JSON.stringify是解决如果val是Object类型，那么就转化成属性值字符串
        key = typeof val + JSON.stringify(val);

        return diffs.hasOwnProperty(key) ? false : (diffs[ key ] = true);
    });
}

export default function create (arr = [], val) {
    const args;

    arr instanceof Array || (arr = [ arr ]);
    // 如果除第一个参数后其他参数是多个数组，则合并
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    return uniq([ ...arr, ...args ]);
}