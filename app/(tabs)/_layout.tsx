import { Tabs } from 'expo-router';

// Minimal tabs layout - app uses Stack navigation via root _layout
export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}>
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
