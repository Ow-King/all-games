import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@/hooks/use-theme';
import { Spacing, MaxContentWidth, BottomTabInset } from '@/constants/theme';

export default function CompareScreen() {
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
              marginBottom: Spacing.six,
              marginTop: Spacing.four,
            }}
          >
            1v1 Ranking
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: 250,
              gap: Spacing.four,
            }}
          >
            {/* Left game card placeholder */}
            <View
              style={{
                flex: 1,
                backgroundColor: colors.backgroundElement,
                borderRadius: 12,
                padding: Spacing.four,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 250,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  textAlign: 'center',
                }}
              >
                Game 1
              </Text>
            </View>

            {/* VS badge */}
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#208AEF',
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                vs
              </Text>
            </View>

            {/* Right game card placeholder */}
            <View
              style={{
                flex: 1,
                backgroundColor: colors.backgroundElement,
                borderRadius: 12,
                padding: Spacing.four,
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 250,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: colors.textSecondary,
                  textAlign: 'center',
                }}
              >
                Game 2
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: colors.backgroundElement,
              borderRadius: 12,
              padding: Spacing.four,
              marginTop: Spacing.six,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center',
              }}
            >
              Add games to your library to start comparing
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
