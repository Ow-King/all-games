import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

export default function OnboardingScreen() {
  const router = useRouter();
  const colors = useTheme();

  const handleSkip = () => {
    router.replace('/(tabs)/library');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: Spacing.four,
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
            marginBottom: Spacing.four,
            textAlign: 'center',
          }}
        >
          Seed Your Rankings
        </Text>

        <Text
          style={{
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: Spacing.six,
            textAlign: 'center',
            lineHeight: 22,
          }}
        >
          Compare 5 of your favorite games to get started. This helps us understand your taste and build better recommendations.
        </Text>

        <View
          style={{
            backgroundColor: colors.backgroundElement,
            borderRadius: 8,
            padding: Spacing.four,
            marginBottom: Spacing.six,
            width: '100%',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              color: colors.text,
              marginBottom: Spacing.two,
            }}
          >
            Progress
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
            }}
          >
            0 / 5 comparisons
          </Text>
        </View>

        <Pressable
          onPress={handleSkip}
          style={({ pressed }) => ({
            opacity: pressed ? 0.7 : 1,
          })}
        >
          <Text
            style={{
              color: '#208AEF',
              fontSize: 16,
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Skip for now
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
