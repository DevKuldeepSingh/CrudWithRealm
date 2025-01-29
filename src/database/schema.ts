import Realm from 'realm';

class TaskModel extends Realm.Object {}
TaskModel.schema = {
  name: 'Task',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    description: 'string?',
    createdAt: 'date',
    completed: {type: 'bool', default: false},
  },
};

export default TaskModel;
