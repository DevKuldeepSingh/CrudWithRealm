import React, {useEffect} from 'react';
import {StyleSheet, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setError, setLoading, setTasks} from '../../redux/taskSlice';
import {getTasks} from '../../database';
import TaskList from '../../components/TaskList';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tasks = useSelector(state => state?.tasks?.tasks);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = () => {
    try {
      dispatch(setLoading(true));
      const tasksData = getTasks();
      dispatch(setTasks(tasksData));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TaskList
        tasks={tasks}
        onEdit={task => navigation.navigate('AddEditTask', {task})}
      />

      <TouchableOpacity
        style={styles.addTaskButton}
        onPress={() => navigation.navigate('AddEditTask')}>
        <Text>Add Task</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addTaskButton: {alignItems: 'center', justifyContent: 'center'},
});

export default Home;
