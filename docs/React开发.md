### 前瞻

基于React构建的前端项目，React其实就是实现MVC模式的V这一层，不仅实现View中基本的`模板引擎解析`、`事件委托绑定`，`响应数据`等基本功能，但利用自身的`virtual dom`、`Pure Component`、`Immutable`等技术提高渲染列表元素的性能

### React和Backbone比较

前端框架都是做分层的，数据层和UI层，都是将dom操作转化成数据层操作，待数据变化后通知UI层做更新，数据层不知道UI层样式、结构如何展示，UI层不知道数据层数据如何获取、处理

**Backbone:** View触发data update操作，Controller接收并调用Model处理，完成后通知View更新，数据流是单向无序的

* Backbone不管是更新节点还是节点列表的时候，还是需要获取到该节点dom，然后处理逻辑，最后将数据渲染到节点dom上
* 需要手动的数据绑定

`Backbone`是直接对`数据层`进行操作

### Redux

`Redux`状态管理库

**为什么使用**

* 共享状态在非父子组件中，如果不用redux，需要找到共同父组件，通过`状态提升`方式层层传递`state`，难以维护

* 将数据层处理放入到reducer，如果同样的功能，可以调用相同的`actionCreator`达到复用

### Redux 状态设计

分析得到项目的所有State，将State比作数据表，然后按照设计数据表的规则扁平化设计State，修改新增都不会造成嵌套，便于扩展

- 所有State的属性不能相同
- State中设置个主键作为各个State的关联
- State中的属性不能存在依赖
- 对于有显示顺序的State，需要另外新建个State按照顺序存储显示的id

