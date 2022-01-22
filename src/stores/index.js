import {createStore} from 'vuex'
import {auth} from "./auth.module";
import {state} from "./state.module"
import {mutations} from "./state.module";
import {actions} from "./state.module";


const store = createStore({
  modules: {
    auth,
    state
  },
  mutations: mutations,
  actions: actions
});

export default store;
