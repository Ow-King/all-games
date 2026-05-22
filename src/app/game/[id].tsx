import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth, BottomTabInset } from '@/constants/theme';

export default function GameDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
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
          {/* Back button */}
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              marginBottom: Spacing.four,
              marginTop: Spacing.two,
            })}
          >
            <Text
              style={{
                fontSize: 16,
                color: '#208AEF',
                fontWeight: '600',
              }}
            >
              ← Back
            </Text>
          </Pressable>

          {/* Cover image placeholder */}
          <View
            style={{
              width: '100%',
              height: 300,
              backgroundColor: colors.backgroundElement,
              borderRadius: 12,
              marginBottom: Spacing.six,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 64,
                opacity: 0.5,
              }}
            >
              🎮
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: Spacing.two,
            }}
          >
            Game {id}
          </Text>

          {/* Genre badges placeholder */}
          <View
            style={{
              flexDirection: 'row',
              gap: Spacing.two,
              marginBottom: Spacing.four,
              flexWrap: 'wrap',
            }}
          >
            <View
              style={{
                backgroundColor: colors.backgroundSelected,
                paddingVertical: Spacing.one,
                paddingHorizontal: Spacing.two,
                borderRadius: 6,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: colors.text,
                }}
              >
                Action
              </Text>
            </View>
          </View>

          {/* Description placeholder */}
          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              lineHeight: 22,
              marginBottom: Spacing.six,
            }}
          >
            Game details will appear here. This is a placeholder for the game description and metadata.
          </Text>

          {/* Add to Library button */}
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: '#208AEF',
              paddingVertical: Spacing.three,
              paddingHorizontal: Spacing.four,
              borderRadius: 8,
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Add to Library
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
