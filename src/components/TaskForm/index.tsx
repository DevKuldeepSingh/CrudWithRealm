import React from 'react';
import {View, StyleSheet, TextInput, Button, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TaskForm = ({
  title,
  setTitle,
  description,
  setDescription,
  onSubmit,
  submitLabel = 'Save',
}) => {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, {marginTop: inset.top}]}>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={styles.input}
        placeholder="Enter task title"
      />
      {!title.trim() && <Text style={styles.error}>*Title is required</Text>}

      <TextInput
        value={description}
        onChangeText={setDescription}
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Enter task description (optional)"
      />

      <Button onPress={onSubmit} disabled={!title.trim()} title={submitLabel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    padding: 8,
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
});

export default TaskForm;
