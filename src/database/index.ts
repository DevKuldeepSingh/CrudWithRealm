import Realm from 'realm';
import TaskModel from './schema';
const realm = new Realm({schema: [TaskModel]});

export const getTasks = () => {
  try {
    const tasks = realm.objects('Task').sorted('createdAt', true);
    return Array.from(tasks).map(convertToPlainObject);
  } catch (error) {
    console.error('Failed to get tasks:', error);
    // throw error;
  }
};

export const insertTask = (title: string, description: string) => {
  try {
    let task;
    realm.write(() => {
      task = realm.create('Task', {
        id: new Date().getTime().toString(),
        title,
        description,
        createdAt: new Date(),
        completed: false,
      });
    });
    return convertToPlainObject(task);
  } catch (error) {
    console.error('Failed to insert task:', error);
    throw error;
  }
};
export const updateTask = (id: string, title: string, description: string) => {
  try {
    let updatedTask;
    realm.write(() => {
      const task = realm.objectForPrimaryKey('Task', id);
      if (task) {
        task.title = title;
        task.description = description;
        updatedTask = task;
      }
    });
    return updatedTask ? convertToPlainObject(updatedTask) : null;
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};

export const deleteTask = (id: string) => {
  try {
    realm.write(() => {
      const task = realm.objectForPrimaryKey('Task', id);
      if (task) {
        realm.delete(task);
      }
    });
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};

export const convertToPlainObject = task => {
  return {
    id: task.id,
    title: task.title,
    description: task.description || '',
    createdAt: task.createdAt.toISOString(),
    completed: task.completed,
  };
};
