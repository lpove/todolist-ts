import React, { useEffect, useState } from 'react'
import TodoItem from './components/TodoItem'
import AddTodo from './components/AddTodo'
import Spider from './components/Spider'
import { getTodos, addTodo, updateTodo, deleteTodo, testSpider } from './API'

const App: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [spiders, setSpiders] = useState<any[]>([]);
  const [loading, setLoading] = useState<Boolean>(false)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTodos()
    .then(({ data: { todos } }: ITodo[] | any) => setTodos(todos))
    .catch((err: Error) => console.log(err))
  }

 const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
   e.preventDefault()
   addTodo(formData)
   .then(({ status, data }) => {
    if (status !== 201) {
      throw new Error('Error! Todo not saved')
    }
    setTodos(data.todos)
  })
  .catch((err) => console.log(err))
}

  const handleUpdateTodo = (todo: ITodo): void => {
    updateTodo(todo)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not updated')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteTodo = (_id: string): void => {
    deleteTodo(_id)
    .then(({ status, data }) => {
        if (status !== 200) {
          throw new Error('Error! Todo not deleted')
        }
        setTodos(data.todos)
      })
      .catch((err) => console.log(err))
  }

  const handleTestSpider = (time?:string, language?: string): void =>{
    setLoading(true);
    testSpider(time, language)
      .then(({ status, data }) => {
        console.log(data);

        if (status !== 200) {
          throw new Error('Error! spider is bad')
        }
        setLoading(false);
        setSpiders((data as any).values);
      })
      .catch((err) => console.log(err))
  }

  return (
    <main className='App'>
      <h1>My Todos</h1>
      <Spider testSpider={handleTestSpider} spiders={spiders} loading={loading}/>
      <AddTodo saveTodo={handleSaveTodo} />
      {todos.map((todo: ITodo) => (
        <TodoItem
          key={todo._id}
          updateTodo={handleUpdateTodo}
          deleteTodo={handleDeleteTodo}
          todo={todo}
        />
      ))}
    </main>
  )
}

export default App
