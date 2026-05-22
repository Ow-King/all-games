import { Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { SymbolView } from 'expo-symbols';
import { useTheme } from '@/hooks/use-theme';

export default function TabLayout() {
  const colors = useTheme();

  const isWeb = Platform.OS === 'web';

  const tabBarOptions = {
    tabBarActiveTintColor: '#208AEF',
    tabBarInactiveTintColor: colors.textSecondary,
    tabBarStyle: {
      backgroundColor: colors.backgroundElement,
      borderTopColor: colors.backgroundSelected,
      borderTopWidth: 1,
    },
    headerShown: false,
  };

  if (isWeb) {
    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#208AEF',
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: {
            backgroundColor: colors.backgroundElement,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="library"
          options={{
            title: 'Library',
            tabBarIcon: ({ color }) => (
              <SymbolView name="books.vertical" size={24} tintColor={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            title: 'Discover',
            tabBarIcon: ({ color }) => (
              <SymbolView name="magnifyingglass" size={24} tintColor={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="compare"
          options={{
            title: 'Compare',
            tabBarIcon: ({ color }) => (
              <SymbolView name="arrow.left.arrow.right" size={24} tintColor={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="friends"
          options={{
            title: 'Friends',
            tabBarIcon: ({ color }) => (
              <SymbolView name="person.2" size={24} tintColor={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => (
              <SymbolView name="person.circle" size={24} tintColor={color} />
            ),
          }}
        />
      </Tabs>
    );
  }

  return (
    <Tabs screenOptions={tabBarOptions}>
      <Tabs.Screen
        name="library"
        options={{
          title: 'Library',
          tabBarIcon: ({ color }) => (
            <SymbolView name="books.vertical" size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => (
            <SymbolView name="magnifyingglass" size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="compare"
        options={{
          title: 'Compare',
          tabBarIcon: ({ color }) => (
            <SymbolView name="arrow.left.arrow.right" size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color }) => (
            <SymbolView name="person.2" size={24} tintColor={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <SymbolView name="person.circle" size={24} tintColor={color} />
          ),
        }}
      />
    </Tabs>
  );
}
