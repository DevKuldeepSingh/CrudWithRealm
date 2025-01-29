import React from 'react';
import {View, StyleSheet, FlatList, Text, TouchableOpacity} from 'react-native';

import {useDispatch} from 'react-redux';
import {deleteTask} from '../../database';
import {removeTask} from '../../redux/taskSlice';

const ListEmpty = () => {
  return (
    <View style={styles.emptyContaier}>
      <Text style={styles.title}>
        {'No tasks found \n Add one to get started'}
      </Text>
    </View>
  );
};

const TaskList = ({tasks, onEdit}) => {
  const dispatch = useDispatch();

  const handleDelete = async id => {
    try {
      await deleteTask(id);
      dispatch(removeTask(id));
    } catch (error) {
      alert('Error deleting task: ' + error.message);
    }
  };

  return (
    <FlatList
      data={tasks}
      contentContainerStyle={styles.containerStyle}
      ListEmptyComponent={ListEmpty}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text>{`Title: ${item?.title ?? ''}`}</Text>
          {item.description && (
            <Text>{`Description: ${item.description}`}</Text>
          )}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.button}>
              <Text onPress={() => onEdit(item)}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text onPress={() => handleDelete(item.id)}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerStyle: {
    flex: 1,
    padding: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    marginTop: 20,
  },
  item: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyContaier: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default TaskList;
