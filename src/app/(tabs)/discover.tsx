import { View, Text, SafeAreaView, TextInput, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth, BottomTabInset } from '@/constants/theme';

export default function DiscoverScreen() {
  const colors = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: Spacing.four,
        }}
        contentContainerStyle={{
          paddingBottom: BottomTabInset,
        }}
      >
        <View
          style={{
            maxWidth: MaxContentWidth,
            alignSelf: 'center',
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: Spacing.two,
              marginTop: Spacing.four,
            }}
          >
            Discover
          </Text>

          <TextInput
            placeholder="Search games..."
            placeholderTextColor={colors.textSecondary}
            style={{
              backgroundColor: colors.backgroundElement,
              borderRadius: 8,
              paddingVertical: Spacing.three,
              paddingHorizontal: Spacing.three,
              color: colors.text,
              marginBottom: Spacing.six,
              fontSize: 14,
            }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              color: colors.text,
              marginBottom: Spacing.four,
            }}
          >
            Trending
          </Text>

          <View
            style={{
              backgroundColor: colors.backgroundElement,
              borderRadius: 12,
              padding: Spacing.six,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 200,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                textAlign: 'center',
              }}
            >
              Search for a game to get started
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
