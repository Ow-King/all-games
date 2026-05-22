import { View, Text, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth } from '@/constants/theme';

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const colors = useTheme();

  const handleSignIn = () => {
    signIn();
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
            fontSize: 32,
            fontWeight: 'bold',
            color: colors.text,
            marginBottom: Spacing.two,
            textAlign: 'center',
          }}
        >
          AllGames
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            marginBottom: Spacing.six,
            textAlign: 'center',
          }}
        >
          Rank your games. Find your taste.
        </Text>

        <Pressable
          onPress={handleSignIn}
          style={({ pressed }) => ({
            backgroundColor: '#208AEF',
            paddingVertical: Spacing.three,
            paddingHorizontal: Spacing.four,
            borderRadius: 8,
            width: '100%',
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
            Sign In
          </Text>
        </Pressable>

        <Text
          style={{
            marginTop: Spacing.four,
            color: colors.textSecondary,
            textAlign: 'center',
          }}
        >
          Don't have an account?{' '}
          <Text
            style={{
              color: '#208AEF',
              fontWeight: '600',
            }}
          >
            Create one
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
