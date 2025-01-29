import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import {useDispatch} from 'react-redux';
import {insertTask, updateTask} from '../../database';
import {useNavigation, useRoute} from '@react-navigation/native';
import {addTask, updateTaskAction} from '../../redux/taskSlice';
import TaskForm from '../../components/TaskForm';

const AddEditTask = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const task = route.params?.task;
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }

    try {
      if (task) {
        const updatedTask = await updateTask(task.id, title, description);
        if (updatedTask) {
          dispatch(updateTaskAction(updatedTask));
        }
      } else {
        const newTask = insertTask(title, description);
        dispatch(addTask(newTask));
      }
      navigation.goBack();
    } catch (error) {
      alert('Error saving task: ' + error.message);
    }
  };

  const handleChangeTitle = (text: string) => setTitle(text);
  const handleChangeDescription = (text: string) => setDescription(text);
  return (
    <View style={styles.container}>
      <TaskForm
        title={title}
        setTitle={handleChangeTitle}
        description={description}
        setDescription={handleChangeDescription}
        onSubmit={handleSave}
        submitLabel={task ? 'Update Task' : 'Add Task'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    marginBottom: 16,
  },
});

export default AddEditTask;
