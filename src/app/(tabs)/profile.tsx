import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth, BottomTabInset } from '@/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const colors = useTheme();

  const handleSignOut = () => {
    signOut();
    router.replace('/(auth)/login');
  };

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
              marginBottom: Spacing.six,
              marginTop: Spacing.four,
            }}
          >
            Profile
          </Text>

          {/* Avatar placeholder */}
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.backgroundElement,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: Spacing.four,
            }}
          >
            <Text
              style={{
                fontSize: 32,
                color: colors.textSecondary,
              }}
            >
              👤
            </Text>
          </View>

          {/* Username */}
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              color: colors.text,
              marginBottom: Spacing.six,
            }}
          >
            {user?.username}
          </Text>

          {/* Stats row */}
          <View
            style={{
              flexDirection: 'row',
              gap: Spacing.three,
              marginBottom: Spacing.six,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: colors.backgroundElement,
                borderRadius: 12,
                padding: Spacing.four,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.text,
                }}
              >
                0
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                Games
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: colors.backgroundElement,
                borderRadius: 12,
                padding: Spacing.four,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.text,
                }}
              >
                0
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                Comparisons
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: colors.backgroundElement,
                borderRadius: 12,
                padding: Spacing.four,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: colors.text,
                }}
              >
                0
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                Friends
              </Text>
            </View>
          </View>

          {/* Sign out button */}
          <Pressable
            onPress={handleSignOut}
            style={({ pressed }) => ({
              backgroundColor: colors.backgroundElement,
              paddingVertical: Spacing.three,
              paddingHorizontal: Spacing.four,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#FF6B6B',
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text
              style={{
                color: '#FF6B6B',
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              Sign Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
