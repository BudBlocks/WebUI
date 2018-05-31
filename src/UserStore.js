import { autorun, observable } from 'mobx';

class UserStore {
  @observable balance = 0;
  @observable username = '';
  @observable password = '';
}

var store = window.store = new UserStore();

export default store;

autorun(() => {
  console.log(store.balance);
})
