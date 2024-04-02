import React, { useState } from 'react'
import {StyleSheet,View,TextInput,Button,Text,FlatList,ProgressBar} from 'react-native'

import todoData from '../Helpers/todoData'
import TodoItem from './TodoItem'

export default function TodoList () {
  const [todos, setTodos] = useState(todoData)
  const [todosDone,setTodosDone] = useState([])
  const [count, setCount] = useState(todos.filter(item => item.done).length)
  const [newTodoText, setNewTodoText] = useState('')
  const [showDone, setShowDone] = useState(false)
  const [editingItem,setEditingItem] = useState(null)

  const updateCount = offset => {
    setCount(count + offset)
  }

  //Valider la tâche
  const updateItem = id => {
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: (item.id == id) ? ! item.done : item.done}})
    setTodos(newTodos)
    setCount(newTodos.filter(item => item.done).length)
  }

  //Supprimer la tâche
  const deleteTodo = id => {
    const newTodos = todos.filter(item => item.id != id)
    setTodos(newTodos)
    setCount(newTodos.filter(item => item.done).length)
  }
  
  //Ajouter une tâche
  const addNewTodo = () => {
    if (newTodoText == '') return
    setTodos([
      ...todos,
      {
        id: todos.length ? Math.max(...todos.map(item => item.id)) + 1 : 1,
        content: newTodoText,
        done: false,
        image: '../assets/vaisselle.png',
      }
    ])
    setNewTodoText('')
  }

  //Modifier une tâche
  const modifyItem = (id, newContent) => {
    const newTodos = todos.map((item) => {
      return {
        id : item.id,
        content: item.id === id ? newContent : item.content,
        done: item.done,
      }
    })
    setTodos(newTodos);
  }
  
  //Valider toutes les tâches
  const checkAll = () => {
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: true}})
    setTodos(newTodos)
    setCount(todos.length)
  }

  //Dé-valider toutes les tâches
  const unCheckAll = () => {
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: false}})
    setTodos(newTodos)
    setCount(0)
  }

  //N'afficher que les tâches validées
  const showAllDone = () => {
    setShowDone(true)
    const newTodos = todos.filter(item => item.done == true)
    setTodosDone(newTodos)
    setCount(newTodos.filter(item => item.done).length)
  }

  //N'afficher que les tâches non validées 
  const showAllToDo = () => {
    setShowDone(true)
    const newTodos = todos.filter(item => item.done != true)
    setTodosDone(newTodos)
    setCount(newTodos.filter(item => item.done).length)
  }

  const progress = count / todos.length;

  return (
      <View style={{ margin: 10 }}>
        <Text>Nombre d'éléments de la TodoList réalisés : {count}</Text>
        <ProgressBar progress={progress} width={null}/>
        <View style={styles.textInput_group}>
          <View>
            <TextInput
              style={styles.textinput_view}
              onChangeText={setNewTodoText}
              placeholder='Ajouter un nouvel item'
              onSubmitEditing={addNewTodo}
              value={newTodoText}
            />
          </View>
          <View style={styles.buttoninput_view}>
            <Button onPress={addNewTodo} title='Ajouter' />
          </View>
        </View>
        <FlatList
          style={{ paddingLeft: 10 }}
          data={(showDone ? todosDone : todos)}
          renderItem={({ item }) => (
            <TodoItem
              item={item}
              updateItem={updateItem}
              deleteTodo={deleteTodo}
              modifyItem={(newContent) => {
                modifyItem(item.id, newContent);
                setEditingItem(null);
              }}
              isEditing={editingItem === item.id}
              startEditing={() => setEditingItem(item.id)}
              cancelEditing={() => setEditingItem(null)}
            />
          )}
        />
        <View style={styles.buttoninput_view}>
            <Button onPress={checkAll} title='Tout cocher' />
        </View>
        <View style={styles.buttoninput_view}>
            <Button onPress={unCheckAll} title='Tout décocher' />
        </View>
        <View style={styles.buttoninput_view}>
            <Button onPress={showAllDone} title='Afficher les cochées' />
        </View>
        <View style={styles.buttoninput_view}>
            <Button onPress={showAllToDo} title='Afficher les non cochées' />
        </View>
        <View style={styles.buttoninput_view}>
            <Button onPress={() => {setShowDone(false)}} title='Tout afficher' />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  todoImage: {
    width: 30,
    height: 30,
    marginRight: 10,
    borderRadius: 15,
  },
  todoText: {
    flex: 1,
    fontSize: 18,
  },
  textInput_group: {
    flexDirection: 'row'
  },
  textinput_view: {
    margin: 12,
    borderWidth: 1,
    padding: 10
  },
  buttoninput_view: {
    margin: 12,
    paddingTop: 3
  }
})