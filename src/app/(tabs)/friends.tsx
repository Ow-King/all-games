import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth, BottomTabInset } from '@/constants/theme';

export default function FriendsScreen() {
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
            Friends
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              marginBottom: Spacing.six,
            }}
          >
            Find friends to see their rankings
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
                marginBottom: Spacing.four,
                textAlign: 'center',
              }}
            >
              No friends yet
            </Text>

            <Pressable
              style={({ pressed }) => ({
                backgroundColor: '#208AEF',
                paddingVertical: Spacing.two,
                paddingHorizontal: Spacing.four,
                borderRadius: 8,
                opacity: pressed ? 0.7 : 1,
              })}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                Find Friends
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
