<template><h3 id="函数式编程" tabindex="-1"><a class="header-anchor" href="#函数式编程" aria-hidden="true">#</a> 函数式编程</h3>
<div class="custom-container tip"><p class="custom-container-title">TIP</p>
<p>函数式编程</p>
</div>
<h2 id="一、什么是函数式编程" tabindex="-1"><a class="header-anchor" href="#一、什么是函数式编程" aria-hidden="true">#</a> 一、什么是函数式编程</h2>
<p>函数式编程(Functional Programming, FP)，FP 是编程范式之一，我们常听说的编程范式还有面向过程编程、面向对象编程。
：</p>
<ul>
<li>面向对象编程的思维方式：把现实世界中的事物抽象成程序世界中的类和对象，通过封装、继承和
多态来演示事物事件的联系</li>
<li>函数式编程的思维方式：把现实世界的事物和事物之间的联系抽象到程序世界（对运算过程进行抽
象）
<ul>
<li>程序的本质：根据输入通过某种运算获得相应的输出，程序开发过程中会涉及很多有输入和输出的函数 x -&gt; f(联系、映射) -&gt; y，y=f(x)</li>
<li>函数式编程中的函数指的不是程序中的函数(方法)，而是数学中的函数即映射关系，例如：y = sin(x)，x和y的关系相同的 输入始终要得到相同的输出(纯函数)</li>
<li>函数式编程用来描述数据(函数)之间的映射</li>
</ul>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 非函数式</span>
<span class="token keyword">let</span> num1 <span class="token operator">=</span> <span class="token number">2</span>
<span class="token keyword">let</span> num2 <span class="token operator">=</span> <span class="token number">3</span>
<span class="token keyword">let</span> sum <span class="token operator">=</span> num1 <span class="token operator">+</span> num2
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span>
<span class="token comment">// 函数式</span>
<span class="token keyword">function</span> <span class="token function">add</span> <span class="token punctuation">(</span><span class="token parameter">n1<span class="token punctuation">,</span> n2</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">return</span> n1 <span class="token operator">+</span> n2
<span class="token punctuation">}</span>
<span class="token keyword">let</span> sum <span class="token operator">=</span> <span class="token function">add</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>sum<span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h2 id="二、高阶函数" tabindex="-1"><a class="header-anchor" href="#二、高阶函数" aria-hidden="true">#</a> 二、高阶函数</h2>
<h3 id="使用高阶函数的意义" tabindex="-1"><a class="header-anchor" href="#使用高阶函数的意义" aria-hidden="true">#</a> 使用高阶函数的意义:</h3>
<ul>
<li>抽象可以帮我们屏蔽细节，只需要关注与我们的目标</li>
<li>高阶函数是用来抽象通用的问题</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// 面向过程的方式</span>
  <span class="token keyword">let</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">let</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> array<span class="token punctuation">.</span>length<span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>array<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// 高阶高阶函数</span>
  <span class="token keyword">let</span> array <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span>
  <span class="token function">forEach</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token function">filter</span><span class="token punctuation">(</span>array<span class="token punctuation">,</span> <span class="token parameter">item</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> item <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">===</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div><ul>
<li>
<p>函数作为参数</p>
<div class="language-Js ext-Js line-numbers-mode"><pre v-pre class="language-Js"><code>// forEach
function forEach (array, fn) {
for (let i = 0; i &lt; array.length; i++) {
fn(array[i])
}
}
// filter
function filter (array, fn) {
let results = []
for (let i = 0; i &lt; array.length; i++) {
if (fn(array[i])) {
  results.push(array[i])
  }
  }
return results
}
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div></li>
<li>
<p>函数作为返回值</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">makeFn</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">let</span> msg <span class="token operator">=</span> <span class="token string">'Hello function'</span>
      <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
      <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token function">makeFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div></li>
</ul>
<h2 id="三-、闭包" tabindex="-1"><a class="header-anchor" href="#三-、闭包" aria-hidden="true">#</a> 三 、闭包</h2>
<ul>
<li>闭包 (Closure)：函数和其周围的状态(词法环境)的引用捆绑在一起形成闭</li>
<li>闭包的本质：函数在执行的时候会放到一个执行栈上当函数执行完毕之后会从执行栈上移除，但是
堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数的成员</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token comment">// 函数作为返回值</span>
  <span class="token keyword">function</span> <span class="token function">makeFn</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> msg <span class="token operator">=</span> <span class="token string">'Hello function'</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>msg<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">const</span> fn <span class="token operator">=</span> <span class="token function">makeFn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><ul>
<li>
<p>闭包案例</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token comment">// 第一个数是基本工资，第二个数是绩效工资</span>
  <span class="token keyword">function</span> <span class="token function">makeSalary</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">return</span> x <span class="token operator">+</span> y
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">let</span> salaryLevel1 <span class="token operator">=</span> <span class="token function">makeSalary</span><span class="token punctuation">(</span><span class="token number">1500</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> salaryLevel2 <span class="token operator">=</span> <span class="token function">makeSalary</span><span class="token punctuation">(</span><span class="token number">2500</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">salaryLevel1</span><span class="token punctuation">(</span><span class="token number">2000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">salaryLevel1</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div></li>
</ul>
<h2 id="四、纯函数" tabindex="-1"><a class="header-anchor" href="#四、纯函数" aria-hidden="true">#</a> 四、纯函数</h2>
<p>相同的输入永远会得到相同的输出，而且没有任何可观察的副作用</p>
<ul>
<li>数组的 slice 和 splice 分别是：纯函数和不纯的函数</li>
<li>可缓存
<ul>
<li>slice 返回数组中的指定部分，不会改变原数组</li>
<li>splice 对数组进行操作返回该数组，会改变原数组</li>
</ul>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> 
<span class="token keyword">let</span> numbers <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">]</span>
<span class="token comment">// 纯函数</span>
numbers<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// => [1, 2, 3]</span>
numbers<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// => [1, 2, 3]</span>
numbers<span class="token punctuation">.</span><span class="token function">slice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// => [1, 2, 3]</span>
<span class="token comment">// 不纯的函数</span>
numbers<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// => [1, 2, 3]</span>
numbers<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// => [4, 5]</span>
numbers<span class="token punctuation">.</span><span class="token function">splice</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token comment">// => []</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br></div></div><h2 id="五-、柯里化" tabindex="-1"><a class="header-anchor" href="#五-、柯里化" aria-hidden="true">#</a> 五 、柯里化</h2>
<ul>
<li>柯里化可以让我们给一个函数传递较少的参数得到一个已经记住了某些固定参数的新函数</li>
<li>这是一种对函数参数的'缓存'</li>
<li>让函数变的更灵活，让函数的粒度更小</li>
<li>可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能</li>
<li>当一个函数有多个参数的时候先传递一部分参数调用它（这部分参数以后永远不变）, 然后返回一个新的函数接收剩余的参数，返回结果</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code>  <span class="token keyword">function</span> <span class="token function">checkAge</span> <span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">let</span> min <span class="token operator">=</span> <span class="token number">18</span>
    <span class="token keyword">return</span> age <span class="token operator">>=</span> min
  <span class="token punctuation">}</span>
  <span class="token comment">// 普通纯函数</span>
  <span class="token keyword">function</span> <span class="token function">checkAge</span> <span class="token punctuation">(</span><span class="token parameter">min<span class="token punctuation">,</span> age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> age <span class="token operator">>=</span> min
  <span class="token punctuation">}</span>
  <span class="token function">checkAge</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">24</span><span class="token punctuation">)</span>
  <span class="token function">checkAge</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">,</span> <span class="token number">20</span><span class="token punctuation">)</span>
  <span class="token function">checkAge</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">,</span> <span class="token number">30</span><span class="token punctuation">)</span>
  <span class="token comment">// 柯里化</span>
  <span class="token keyword">function</span> <span class="token function">checkAge</span> <span class="token punctuation">(</span><span class="token parameter">min</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">age</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> age <span class="token operator">>=</span> min
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
  <span class="token comment">// ES6 写法 可以把多元函数转换成一元函数，可以组合使用函数产生强大的功能</span>
  <span class="token keyword">let</span> <span class="token function-variable function">checkAge</span> <span class="token operator">=</span> <span class="token parameter">min</span> <span class="token operator">=></span> <span class="token punctuation">(</span><span class="token parameter">age</span> <span class="token operator">=></span> age <span class="token operator">>=</span> min<span class="token punctuation">)</span>
  <span class="token keyword">let</span> checkAge18 <span class="token operator">=</span> <span class="token function">checkAge</span><span class="token punctuation">(</span><span class="token number">18</span><span class="token punctuation">)</span>
  <span class="token keyword">let</span> checkAge20 <span class="token operator">=</span> <span class="token function">checkAge</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>
  <span class="token function">checkAge18</span><span class="token punctuation">(</span><span class="token number">24</span><span class="token punctuation">)</span>
  <span class="token function">checkAge18</span><span class="token punctuation">(</span><span class="token number">20</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="手写-lodash-中的柯里化函数" tabindex="-1"><a class="header-anchor" href="#手写-lodash-中的柯里化函数" aria-hidden="true">#</a> 手写 lodash 中的柯里化函数</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">function</span> <span class="token function">getSum</span> <span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b<span class="token punctuation">,</span> c</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> a <span class="token operator">+</span> b <span class="token operator">+</span> c
<span class="token punctuation">}</span>

<span class="token keyword">const</span> curried <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span>getSum<span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">curried</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">curried</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">curried</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">)</span>


<span class="token keyword">function</span> <span class="token function">curry</span> <span class="token punctuation">(</span><span class="token parameter">func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
 <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token function">curriedFn</span><span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>args</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 判断实参和形参的个数</span>
   <span class="token keyword">if</span> <span class="token punctuation">(</span>args<span class="token punctuation">.</span>length <span class="token operator">&lt;</span> func<span class="token punctuation">.</span>length<span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">...</span>args<span class="token punctuation">)</span>
       <span class="token keyword">return</span> <span class="token function">curriedFn</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">.</span><span class="token function">concat</span><span class="token punctuation">(</span>Array<span class="token punctuation">.</span><span class="token function">from</span><span class="token punctuation">(</span>arguments<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
     <span class="token punctuation">}</span>
   <span class="token punctuation">}</span>
   console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">,</span> <span class="token string">'...args'</span><span class="token punctuation">)</span>
   <span class="token keyword">return</span> <span class="token function">func</span><span class="token punctuation">(</span><span class="token operator">...</span>args<span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h2 id="六、函数组合" tabindex="-1"><a class="header-anchor" href="#六、函数组合" aria-hidden="true">#</a> 六、函数组合</h2>
<p>下面这张图表示程序中使用函数处理数据的过程，给 fn 函数输入参数 a，返回结果 b。可以想想 a 数据
通过一个管道得到了 b 数据。</p>
<p><img src="/images/compose1.png" alt=""></p>
<p>当 fn 函数比较复杂的时候，我们可以把函数 fn 拆分成多个小函数，此时多了中间运算过程产生的 m 和
n。
下面这张图中可以想象成把 fn 这个管道拆分成了3个管道 f1, f2, f3，数据 a 通过管道 f3 得到结果 m，m
再通过管道 f2 得到结果 n，n 通过管道 f1 得到最终结果 b
<img src="/images/compose2.png" alt=""></p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> fn <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span>f1<span class="token punctuation">,</span> f2<span class="token punctuation">,</span> f3<span class="token punctuation">)</span>
 b <span class="token operator">=</span> <span class="token function">fn</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><ul>
<li>函数组合 (compose)：如果一个函数要经过多个函数W处理才能得到最终值，这个时候可以把中间
过程的函数合并成一个函数</li>
<li>函数就像是数据的管道，函数组合就是把这些管道连接起来，让数据穿过多个管道形成最终
结果</li>
<li><strong>函数组合默认是从右到左执行</strong></li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token comment">// 组合函数</span>
 <span class="token keyword">function</span> <span class="token function">compose</span> <span class="token punctuation">(</span><span class="token parameter">f<span class="token punctuation">,</span> g</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">f</span><span class="token punctuation">(</span><span class="token function">g</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">function</span> <span class="token function">first</span> <span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> arr<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
 <span class="token punctuation">}</span>
 <span class="token keyword">function</span> <span class="token function">reverse</span> <span class="token punctuation">(</span><span class="token parameter">arr</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> arr<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// 从右到左运行</span>
 <span class="token keyword">let</span> last <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span>first<span class="token punctuation">,</span> reverse<span class="token punctuation">)</span>
 console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">last</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h3 id="模拟实现-lodash-的-flowright-方法" tabindex="-1"><a class="header-anchor" href="#模拟实现-lodash-的-flowright-方法" aria-hidden="true">#</a> 模拟实现 lodash 的 flowRight 方法</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code> <span class="token comment">// 多函数组合</span>
 <span class="token keyword">function</span> <span class="token function">compose</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token keyword">return</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">return</span> fns<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token function">fn</span><span class="token punctuation">(</span>acc<span class="token punctuation">)</span>
     <span class="token punctuation">}</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
 <span class="token punctuation">}</span>
 <span class="token comment">// ES6</span>
 <span class="token keyword">const</span> <span class="token function-variable function">compose</span> <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token parameter"><span class="token operator">...</span>fns</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token parameter">value</span> <span class="token operator">=></span> fns<span class="token punctuation">.</span><span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">reduce</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">acc<span class="token punctuation">,</span> fn</span><span class="token punctuation">)</span> <span class="token operator">=></span>
 <span class="token function">fn</span><span class="token punctuation">(</span>acc<span class="token punctuation">)</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h2 id="七、函子" tabindex="-1"><a class="header-anchor" href="#七、函子" aria-hidden="true">#</a> 七、函子</h2>
<h3 id="什么是么是-functor" tabindex="-1"><a class="header-anchor" href="#什么是么是-functor" aria-hidden="true">#</a> 什么是么是 Functor</h3>
<ul>
<li>容器：包含值和值的变形关系(这个变形关系就是函数)</li>
<li>函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有 map 方法，map 方法可以运
行一个函数对值进行处理(变形关系)</li>
</ul>
<h3 id="functor-函子" tabindex="-1"><a class="header-anchor" href="#functor-函子" aria-hidden="true">#</a> Functor 函子</h3>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// 一个容器，包裹一个值</span>
<span class="token keyword">class</span> <span class="token class-name">Container</span> <span class="token punctuation">{</span>
  <span class="token comment">// of 静态方法，可以省略 new 关键字创建对象</span>
  <span class="token keyword">static</span> <span class="token keyword">of</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Container</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> value
  <span class="token punctuation">}</span>
  <span class="token comment">// map 方法，传入变形关系，将容器里的每一个值映射到另一个容器</span>
  <span class="token function">map</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Container<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">// 测试</span>
Container<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">+</span> <span class="token number">2</span><span class="token punctuation">)</span>
<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x <span class="token operator">*</span> x<span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><p>总结</p>
<ul>
<li>函数式编程的运算不直接操作值，而是由函子完成</li>
<li>函子就是一个实现了 map 契约的对象</li>
<li>我们可以把函子想象成一个盒子，这个盒子里封装了一个值
想要处理盒子中的值，我们需要给盒子的 map 方法传递一个处理值的函数（纯函数），由这
个函数来对值进行处理
最终 map 方法返回一个包含新值的盒子（函子）</li>
</ul>
<h3 id="maybe-函子" tabindex="-1"><a class="header-anchor" href="#maybe-函子" aria-hidden="true">#</a> MayBe 函子</h3>
<ul>
<li>我们在编程的过程中可能会遇到很多错误，需要对这些错误做相应的处理</li>
<li>MayBe 函子的作用就是可以对外部的空值情况做处理（控制副作用在允许的范围）</li>
<li>MayBe 函子 可以处理异常 我们很难确认是哪一步产生的空值问题</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// MayBe 函子</span>
<span class="token keyword">class</span> <span class="token class-name">MayBe</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">of</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">MayBe</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> value
  <span class="token punctuation">}</span>

  <span class="token function">map</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">isNothing</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> MayBe<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">:</span> MayBe<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">isNothing</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">===</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">===</span> <span class="token keyword">undefined</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>


<span class="token comment">// let r = MayBe.of('Hello World')</span>
<span class="token comment">//           .map(x => x.toUpperCase())</span>
<span class="token comment">// console.log(r)</span>


<span class="token comment">// let r = MayBe.of(null)</span>
<span class="token comment">//           .map(x => x.toUpperCase())</span>
<span class="token comment">// console.log(r)</span>


<span class="token keyword">let</span> r <span class="token operator">=</span> MayBe<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> <span class="token keyword">null</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br></div></div><h4 id="我们很难确认是哪一步产生的空值问题" tabindex="-1"><a class="header-anchor" href="#我们很难确认是哪一步产生的空值问题" aria-hidden="true">#</a> 我们很难确认是哪一步产生的空值问题</h4>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">let</span> r <span class="token operator">=</span> MayBe<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token string">'hello world'</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> <span class="token keyword">null</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span><span class="token function">split</span><span class="token punctuation">(</span><span class="token string">' '</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="either-函子" tabindex="-1"><a class="header-anchor" href="#either-函子" aria-hidden="true">#</a> Either 函子</h3>
<ul>
<li>Either 两者中的任何一个，类似于 if...else...的处理</li>
<li>异常会让函数变的不纯，Either 函子可以用来做异常处理</li>
<li>Either 用来处理异常</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// Either 函子 2. 异常会让函数变的不纯，Either 函子可以用来做异常处理</span>
<span class="token keyword">class</span> <span class="token class-name">Left</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">of</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Left</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> value
  <span class="token punctuation">}</span>

  <span class="token function">map</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Right</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">of</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Right</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">value</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> value
  <span class="token punctuation">}</span>

  <span class="token function">map</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Right<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token function">fn</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// let r1 = Right.of(12).map(x => x + 2)</span>
<span class="token comment">// let r2 = Left.of(12).map(x => x + 2)</span>

<span class="token comment">// console.log(r1)</span>
<span class="token comment">// console.log(r2)</span>


<span class="token keyword">function</span> <span class="token function">parseJSON</span> <span class="token punctuation">(</span><span class="token parameter">str</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">try</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Right<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span>str<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> Left<span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">error</span><span class="token operator">:</span> e<span class="token punctuation">.</span>message <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// let r = parseJSON('{ name: zs }')</span>
<span class="token comment">// console.log(r)</span>
<span class="token comment">//3. Either 用来处理异常</span>
<span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token function">parseJSON</span><span class="token punctuation">(</span><span class="token string">'{ "name": "zs" }'</span><span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">x</span> <span class="token operator">=></span> x<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token function">toUpperCase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br></div></div><h3 id="io-函子" tabindex="-1"><a class="header-anchor" href="#io-函子" aria-hidden="true">#</a> IO 函子</h3>
<ul>
<li>IO 函子中的 _value 是一个函数，这里是把函数作为值来处理</li>
<li>IO 函子可以把不纯的动作存储到 _value 中，延迟执行这个不纯的操作(惰性执行)，包装当前的操</li>
<li>作纯
把不纯的操作交给调用者来处理</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// IO 函子</span>
<span class="token keyword">const</span> fp <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'lodash/fp'</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">IO</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">of</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IO</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> value
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> fn
  <span class="token punctuation">}</span>

  <span class="token function">map</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IO</span><span class="token punctuation">(</span>fp<span class="token punctuation">.</span><span class="token function">flowRight</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 调用</span>
<span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token constant">IO</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>process<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span><span class="token parameter">p</span> <span class="token operator">=></span> p<span class="token punctuation">.</span>execPath<span class="token punctuation">)</span>
<span class="token comment">// console.log(r)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">.</span><span class="token function">_value</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div><h3 id="task" tabindex="-1"><a class="header-anchor" href="#task" aria-hidden="true">#</a> Task</h3>
<h4 id="task-异步执行" tabindex="-1"><a class="header-anchor" href="#task-异步执行" aria-hidden="true">#</a> Task 异步执行</h4>
<ul>
<li>异步任务的实现过于复杂，我们使用 folktale 中的 Task 来演示</li>
<li>folktale 一个标准的函数式编程库
<ul>
<li>和 lodash、ramda 不同的是，他没有提供很多功能函数</li>
<li>只提供了一些函数式处理的操作，例如：compose、curry 等，一些函子 Task、Either、
MayBe 等</li>
</ul>
</li>
</ul>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> <span class="token punctuation">{</span> compose<span class="token punctuation">,</span> curry <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'folktale/core/lambda'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> <span class="token punctuation">{</span> toUpper<span class="token punctuation">,</span> first <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'lodash/fp'</span><span class="token punctuation">)</span>
<span class="token comment">// 第一个参数是传入函数的参数个数</span>
<span class="token keyword">let</span> f <span class="token operator">=</span> <span class="token function">curry</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">x<span class="token punctuation">,</span> y</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x <span class="token operator">+</span> y<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">)</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token number">3</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token number">4</span><span class="token punctuation">)</span>
<span class="token comment">// 函数组合</span>
<span class="token keyword">let</span> f <span class="token operator">=</span> <span class="token function">compose</span><span class="token punctuation">(</span>toUpper<span class="token punctuation">,</span> first<span class="token punctuation">)</span>
<span class="token function">f</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string">'one'</span><span class="token punctuation">,</span> <span class="token string">'two'</span><span class="token punctuation">]</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><h3 id="pointed-函子" tabindex="-1"><a class="header-anchor" href="#pointed-函子" aria-hidden="true">#</a> Pointed 函子</h3>
<p>Pointed 函子是实现了 of 静态方法的函子
of 方法是为了避免使用 new 来创建对象，更深层的含义是 of 方法用来把值放到上下文
Context（把值放到容器中，使用 map 来处理值）</p>
<h3 id="monad-函子" tabindex="-1"><a class="header-anchor" href="#monad-函子" aria-hidden="true">#</a> Monad 函子</h3>
<p>Monad 函子是可以变扁的 Pointed 函子，IO(IO(x))
一个函子如果具有 join 和 of 两个方法并遵守一些定律就是一个 Monad</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token comment">// IO Monad</span>
<span class="token keyword">const</span> fs <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'fs'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> fp <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'lodash/fp'</span><span class="token punctuation">)</span>

<span class="token keyword">class</span> <span class="token class-name">IO</span> <span class="token punctuation">{</span>
  <span class="token keyword">static</span> <span class="token keyword">of</span> <span class="token punctuation">(</span>value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IO</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> value
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">constructor</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>_value <span class="token operator">=</span> fn
  <span class="token punctuation">}</span>

  <span class="token function">map</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IO</span><span class="token punctuation">(</span>fp<span class="token punctuation">.</span><span class="token function">flowRight</span><span class="token punctuation">(</span>fn<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_value<span class="token punctuation">)</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">join</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_value</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>

  <span class="token function">flatMap</span> <span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>fn<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> <span class="token function-variable function">readFile</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">filename</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IO</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> fs<span class="token punctuation">.</span><span class="token function">readFileSync</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token string">'utf-8'</span><span class="token punctuation">)</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> <span class="token function-variable function">print</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token parameter">x</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">IO</span><span class="token punctuation">(</span><span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
    <span class="token keyword">return</span> x
  <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> r <span class="token operator">=</span> <span class="token function">readFile</span><span class="token punctuation">(</span><span class="token string">'package.json'</span><span class="token punctuation">)</span>
          <span class="token comment">// .map(x => x.toUpperCase())</span>
          <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>fp<span class="token punctuation">.</span>toUpper<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">flatMap</span><span class="token punctuation">(</span>print<span class="token punctuation">)</span>
          <span class="token punctuation">.</span><span class="token function">join</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>r<span class="token punctuation">)</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br></div></div><p>张小伟 | Front End Engineer | 2022.3.4</p>
</template>
