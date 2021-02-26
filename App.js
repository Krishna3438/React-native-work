import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import PostsScreen from './Components/Posts';
import CommentsScreen from './Components/Comments';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Posts: {
    screen: PostsScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Comments: {
    screen: CommentsScreen,
    navigationOptions: {
      headerShown: false
    }
  }
});

const AppContainer = createAppContainer(AppNavigator);
