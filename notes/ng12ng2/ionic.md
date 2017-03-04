# ionic
由于项目基于 ionic，这里需对 ionic 基于 angular2 做的升级进行一些记录

## 细节项
* @Page,升级后不见了。
* $ionicConfigProvider不见了，代替它的为:http://ionicframework.com/docs/v2/api/config/Config/  
  ```javascript
  IonicModule.forRoot(MyApp, {
      backButtonText: 'Go Back',
      iconMode: 'ios',
      modalEnter: 'modal-slide-in',
      modalLeave: 'modal-slide-out',
      tabsPlacement: 'bottom',
      pageTransition: 'ios'
    }, {}
  )],
  ```

## 事件
参考链接：http://ionicframework.com/docs/v2/api/util/Events/    
```javascript
// 引入
import {Events} from 'ionic-angular'
// DI
public events: Events
// 使用
events.publish('user:created', user, Date.now());
events.subscribe('user:created', (user, time) => {
  // user and time are the same arguments passed in `events.publish(user, time)`
  console.log('Welcome', user, 'at', time);
});
```

## 路由
```javascript
// 导入
 imports: [
    IonicModule.forRoot(MyApp, {}, {
      links:ROUTES
    })
  ]
// ROUTES
[ { path: 'home',  component: HomePage }]
// 使用
import { NavController } from 'ionic-angular';
this.navCtrl.push(AboutPage, {});
```

## 组件
* ion-slides,看上去没啥变化
* ionicLoading 变成 [LoadingController](http://ionicframework.com/docs/v2/api/components/loading/LoadingController/)