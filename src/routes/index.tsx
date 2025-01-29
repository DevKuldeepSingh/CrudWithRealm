import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AddEditTask, Home} from '../screens';

const RootNavigation = () => {
  const RootStack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="Home" component={Home} />
        <RootStack.Screen name="AddEditTask" component={AddEditTask} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
