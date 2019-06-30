/**
 * 由于使用React新Api，Hook、createContext来代替Redux和React-Redux
 */

// 将数组转成对象
function arrToObj (arr) {
    const res = {};

    for (let i = 0, len = arr.length, value; i < len, value = arr[ i ]; i++) {
        let [ key, val ] = value;

        res[ key ] = val;
    }

    return res;
}

export default function combineReducer (reducerObj) {
    const reducers = Object.keys(reducerObj).filter(key => {
        // reducer是纯函数，所以在filter中过滤掉非函数类型的key
        return typeof reducerObj[ key ] === 'function';
    }).map(key => {
        // map成转成对象的特殊数组格式
        // [ key, value ]
        return [ key, reducerObj[ key ] ];
    });
    const reducerObjParsed = arrToObj(reducers);

    return (state, action) => {
        let newState = {}, prevStateForKey, currStateForKey, reducer, isUpdated;

        for (let key in reducerObjParsed) {
            prevStateForKey = state[ key ];
            reducer = reducerObjParsed[ key ];
            currStateForKey = reducer(prevStateForKey, action);

            // 不能返回undefined
            if (currStateForKey === void 0) {
                throw new Error('reducer返回值不能为undefined');
            }

            // 返回的新的state不能和上一个state为同一个引用，不能违背纯函数的不会产生副作用
            if (currStateForKey === prevStateForKey) {
                throw new Error('reducer返回的state不能和上一个state为同一个引用，不能违背纯函数的不会产生副作用');
            }

            newState[ key ] = currStateForKey;

            // 如果其中的某个reducer返回的结果改变了，就立即停止赋值操作，节省性能
            isUpdated || (isUpdated = currStateForKey !== prevStateForKey);
        }

        return isUpdated ? newState : state;
    };
}