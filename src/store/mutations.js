
export default {
  add(state){
    state.num++
  },
  reduce(state){
    if (state.num < 2) {
      return;
    } else {
      state.num--;
    }
  }
}
