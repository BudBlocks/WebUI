import { autorun, observable } from 'mobx';

class UserStore {
  @observable balance = 100;
}

var store = window.store = new UserStore();

export default store;

autorun(() => {
  console.log(store.balance);
})
