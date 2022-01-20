# UrlToolkit Documentation

​		目前urlToolkit/modules下面有commonUrls、comsUrls、somsUrls、oprsUrls等url包，请不要单独在项目中配置url进行使用，需要把使用的url放到以上四个包中统一管理.如果是其他项目，请在建新的包eg:xxxUrls('xxx'是项目名)，请按照统一规范进行管理;

## Using

```js
//1. 在项目入口文件导入该工具 eg:
import UrlToolkit from './urlToolkit';

//2. 实例工具且定义获取指定项目的url eg:new urlToolkit({projectName:'coms'}) 
new UrlToolkit({projectName:'xxxx'});

//3. 如果你使用的vue，建议把实例后的urlToolkit放在vue.prototype上方便调用
Vue.prototype.$urlToolkit = new UrlToolkit({projectName:'xxxx'});

//4. 如果你需要在js中使用，可以先在入口文件中绑定到window
globalThis.$urlToolkit = new UrlToolkit({projectName:'xxxx'});

//5. 如果你不需要在项目中获取指定环境的url，那么可以
//qc beta release
Vue.prototype.$urlToolkit = new UrlToolkit({projectName:'xxxx',environment:'qc'}); 
globalThis.$urlToolkit = new UrlToolkit({projectName:'xxxx',environment:'qc'});
```

## Example

```vue
<!-- vue -->
<div>
  <!-- getUrls('ccUrl').beta/getUrls('ccUrl').release -->
  {{ getUrls('ccUrl').qc }}
  <!-- 由于默认自适应当前协议，如果你不需要可以开启固定模式 -->
  {{ getUrls('ccUrl',true).qc }}
</div>

<script>
 export default {
  computed:{
    getUrls(){
      return function(urlKey,isFixed){
        return this.$urlToolkit.getUrls({urlKey,isFixed});
      }
    }
  }
 }
</script>
```

```js
//js

// 1. 已在window绑定$urlToolkit
function getUrls(urlKey,isFixed){
  return $urlToolkit.getUrls({
    urlKey,
    isFixed
  })
};

// 2. 单独导入 eg:
import UrlToolkit from './urlToolkit';
const $urlToolkit = new UrlToolkit({projectName:'xxxx'});

function getUrls(urlKey,isFixed){
  return $urlToolkit.getUrls({
    urlKey,
    isFixed
  })
};

getUrls('ccUrl').qc;
getUrls('ccUrl').beta;
getUrls('ccUrl').release;
// 由于默认自适应当前协议，如果你不需要可以开启固定模式
getUrls('ccUrl',true).qc;
getUrls('ccUrl',true).beta;
getUrls('ccUrl',true).release;
```

