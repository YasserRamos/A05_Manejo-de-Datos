import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Index from '../pages';
import Sqlite from '../pages/Sqlite';
import SecureStoreScreen from '../pages/securestore';

const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'blue',
      }}
    >
      <Tab.Screen
        name="Index"
        component={Index}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="SecureStore"
        component={SecureStoreScreen}
        options={{
          title: 'SecureStore',
          tabBarIcon: ({ color }) => <FontAwesome name="key" size={28} color={color} />,
        }}
      />
      <Tab.Screen
        name="Sqlite"
        component={Sqlite}
        options={{
          title: 'SQLite',
          tabBarIcon: ({ color }) => <FontAwesome name="database" size={28} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
