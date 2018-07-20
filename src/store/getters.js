export default {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  },
  getNum(state){
    return state.num<1?1:state.num
  }
}
