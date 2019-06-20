// 创建中间件，其实就是基于函数式编程的科里化操作，接收中间件数组和初始状态，内部定义函数用来调用下一个中间件和判断所有中间件是否调用完成
export default function createMiddleware (middlewares, initState) {
    function next (state) {
        if (!middlewares.length) {
            return;
        }

        var middleware = middlewares.shift();
        middleware(state, next);
    };

    return next(initState);
}