import React from "react";
import TodoList from '../components/TodoList';
import { ScrollView } from "react-native";

export default function TodoListsScreen({ navigation }) {

  return(
    <ScrollView>
      <TodoList/>
    </ScrollView>
  );
};
