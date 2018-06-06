import { autorun, observable } from 'mobx';

class UserStore {
  @observable balance = 0;
  @observable username = '';
  @observable password = '';
  @observable email = '';
  @observable name = '';
  @observable notes_owed = [];
  @observable notes_received = [];
  @observable notes_pending = [];
  @observable notes_waiting = [];
}

var store = window.store = new UserStore();

export default store;

autorun(() => {
  console.log(store.balance);
})
