import { autorun, observable } from 'mobx';

class UserStore {
  @observable balance = 0;
  @observable username = '';
  @observable password = '';
  @observable notes_owed = [];
  @observable notes_received = [];
  @observable notes_pending = [];
}

var store = window.store = new UserStore();

export default store;

autorun(() => {
  console.log(store.balance);
})
