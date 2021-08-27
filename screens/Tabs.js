import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from './Dashboard';
import pointList from './pointList'
import Profile from './profile';
import Settings from './Settings'
import { color } from 'react-native-elements/dist/helpers';

export default function Tabs() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName="Dashboard">
            <Tab.Screen name="Profile" component={Profile} 
                options={{
                tabBarLabel: 'Perfil',
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="account" color='gray' size={22} />
                )
                }}
                />
                <Tab.Screen name="Dashboard" component={Dashboard} options={{
                tabBarLabel: 'Mapa',
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="google-maps" color='gray'  size={22} />
                )
                }}
                />
                <Tab.Screen name="Settings" component={pointList} options={{
                tabBarLabel: 'Lista',
                tabBarIcon: () => (
                    <MaterialCommunityIcons name="clipboard-list" color='gray' size={22} />
                )
                }}
                />
        </Tab.Navigator>
    )
}