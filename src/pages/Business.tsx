import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ManageParticipantsScreen from './ManageParticipantsScreen';
import SponsorSectionScreen from './SponsorSectionScreen';

const Stack = createStackNavigator();

const BusinessScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Управление участниками" component={ManageParticipantsScreen} />
      <Stack.Screen name="Раздел спонсоров" component={SponsorSectionScreen} />
    </Stack.Navigator>
  );
};

export default BusinessScreen;