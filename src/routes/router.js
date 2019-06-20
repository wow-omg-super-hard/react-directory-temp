import React, { createElement } from 'react';
import { Router, Route, IndexRoute, BrowserHistory, Redirect } from 'react-router';

/**
 * 动态生成路由组件
 *
 * @params { Array|Object } routeDes 路由描述对象集合
 * @params { Function } routeDes[ 0 ].klass 类(Route、IndexRoute、Redirect)
 * @params { String } routeDes[ 0 ].path Route的path属性
 * @params { String } routeDes[ 0 ].to Redirect的to属性
 * @params { String } routeDes[ 0 ].component path的component属性
 * @params { Array|Undefined } routeDes[ 0 ].sub 子路由描述对象集合
 */
export default function routerBuilder (routeDes) {
    if (routeDes instanceof Array) {
        return routeDes.map(({ path, to, component, klass, sub }) => 
            createElement(klass, { path, to, component, exact: true }, routerBuilder(sub))
        );        
    } else if (routeDes instanceof Object) {
        return createElement(routeDes.klass, { 
            path: routeDes.path,  
            component: routeDes.component,
            to: routeDes.to
        }, routerBuilder(routeDes.sub))
    }
}