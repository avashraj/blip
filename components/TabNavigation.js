import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlusButton from './PlusButton';
import ProfileButton from './ProfileButton';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="PlusButton" component={PlusButton} />
      <Tab.Screen name="ProfileButton" component={ProfileButton} />
    </Tab.Navigator>
  );
}