import React, { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';

export default function TodoItem(props) {
  const [done, setDone] = useState(props.item.done);
  const [editingContent, setEditingContent] = useState(props.item.content);

  useEffect(() => {
    setDone(props.item.done);
  }, [props.item.done]);

  const handleSave = () => {
    props.modifyItem(editingContent);
  };

  return (
    <View style={styles.content}>
      <Switch value={done} onValueChange={(state) => { setDone(state); props.updateItem(props.item.id) }} />
      {props.isEditing ? (
        <TextInput
          style={[styles.item, { textDecorationLine: done ? 'line-through' : 'none' }]}
          value={editingContent}
          onChangeText={setEditingContent}
          onBlur={handleSave}
          autoFocus={true}
          selectTextOnFocus={true}
        />
      ) : (
        <Text style={[styles.item, { textDecorationLine: done ? 'line-through' : 'none' }]}>
          {props.item.content}
        </Text>
      )}
      {!props.isEditing && (
        <TouchableOpacity onPress={props.startEditing}>
          <Image
            source={require('../assets/pen.png')}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => props.deleteTodo(props.item.id)}>
        <Image
          source={require('../assets/bin.png')}
          style={{ height: 30, width: 30 }}
        />
      </TouchableOpacity>
      <Image
        source={require('../assets/todo.png')}
        style={{ height: 30, width: 30, left: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row'
  },
  item: {
    marginLeft: 10,
    width: 150
  }
});
