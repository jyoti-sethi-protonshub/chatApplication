import { View, Text } from 'react-native'
import React from 'react'
import Home from './src/screens/Home'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Chat from './src/screens/Chat'
import ChatDetail from './src/screens/ChatDetail/index';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props: any) => <Home {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Chat" 
        options={{
          headerShown: false,
        }}
        // options={(props: any) => ({
        //    title: props.route.params?.name
        // })} 
        >
          {(props: any) => <Chat {...props}  />}
        </Stack.Screen>
        <Stack.Screen name="ChatDetail" 
        options={{
          headerShown: false,
        }} 
        >
          {(props: any) => <ChatDetail {...props}  />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App