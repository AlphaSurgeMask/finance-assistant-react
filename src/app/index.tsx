import { useState } from "react";
import { Link, Stack } from "expo-router";
import { SymbolView } from "expo-symbols";
import { TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";

export default function HomeScreen() {
  const theme = useTheme();
  const [text, onChangeText] = useState("Input your bank statement here...");

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.centerText}>
            Finance assistant
          </ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            Lets help you cut down your spending{"\n"}and prune some
            subscriptions.
          </ThemedText>
        </ThemedView>
        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <TextInput
            editable
            multiline
            numberOfLines={15}
            onChangeText={(text) => onChangeText(text)}
            placeholder={text}
            style={styles.textInput}
          />
        </ThemedView>
        <ThemedView style={styles.heroSection}>
          <ThemedView type="backgroundElement" style={styles.linkButton}>
            <Link
              href={{
                pathname: "/analysis",
                params: { add: 86 },
              }}
            >
              <ThemedText type="link">Begin analysis</ThemedText>
              <SymbolView
                tintColor={theme.text}
                name={{
                  ios: "dollarsign.circle",
                  android: "paid",
                  web: "paid",
                }}
                size={14}
              />
            </Link>
          </ThemedView>
        </ThemedView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  centerText: {
    textAlign: "center",
  },
  code: {
    textTransform: "uppercase",
  },
  textInput: {
    padding: 10,
    borderColor: "#000000",
    borderWidth: 1.5,
    borderRadius: Spacing.two,
    margin: 12,
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  pressed: {
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: "row",
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.five,
    justifyContent: "center",
    gap: Spacing.one,
    alignItems: "center",
  },
});
