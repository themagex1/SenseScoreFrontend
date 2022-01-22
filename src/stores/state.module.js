export const state = () => ({
    isRefreshing: false,
});

// mutation to update the state
export const mutations = {
    SET_IS_REFRESHING(state, isRefreshing) {
        state.isRefreshing = isRefreshing;
    },
};

// action to call the mutation with a false or true payload
export const actions = {
    setIsRefreshing({ commit }, isRefreshing) {
        commit('SET_IS_REFRESHING', isRefreshing);
    },
};