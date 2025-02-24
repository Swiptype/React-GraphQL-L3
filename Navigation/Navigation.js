import React, {useContext} from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TodoListsScreen from '../Screen/TodoListsScreen'
import HomeScreen from '../Screen/HomeScreen'
import SignInScreen from '../Screen/SignInScreen'
import SignUpScreen from '../Screen/SignUpScreen'
import SignOutScreen from '../Screen/SignOutScreen'

import { TokenContext,UsernameContext } from '../Context/Context'

const Tab = createBottomTabNavigator()

export default function Navigation () {
    const [token, setToken] = useContext(TokenContext)
    return (
          <NavigationContainer>
            {token == null ? (
              <Tab.Navigator>
                <Tab.Screen name='SignIn' component={SignInScreen} />
                <Tab.Screen name='SignUp' component={SignUpScreen} />
              </Tab.Navigator>
            ) : (
              <Tab.Navigator>
                <Tab.Screen name='Home' component={HomeScreen} />
                <Tab.Screen name='TodoLists' component={TodoListsScreen} />
                <Tab.Screen name='SignOut' component={SignOutScreen} />
              </Tab.Navigator>
            )}
          </NavigationContainer>
    )
}

