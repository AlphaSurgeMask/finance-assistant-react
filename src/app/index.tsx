import { useState } from "react";
import { Link, Stack } from "expo-router";
import { TextInput, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export default function HomeScreen() {
  const [statement, onChangeText] = useState(
    "Input your bank statement here...",
  );
  const colorScheme = useColorScheme();
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightTextArea : styles.darkTextArea;

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
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <TextInput
              editable
              multiline
              numberOfLines={15}
              onChangeText={(statement) => onChangeText(statement)}
              placeholder={statement}
              style={[styles.textInput, themeContainerStyle]}
            />
          </ThemedView>
          <ThemedView type="backgroundElement" style={styles.linkButton}>
            <Link
              href={{
                pathname: "/analysis",
                params: { statement: statement },
              }}
            >
              <ThemedText type="link">Begin analysis</ThemedText>
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
  textInput: {
    padding: 10,
    borderWidth: 1.5,
    borderRadius: Spacing.two,
    width: MaxContentWidth,
    margin: 12,
  },
  lightTextArea: {
    borderColor: "#000000",
    color: "#000000",
  },
  darkTextArea: {
    borderColor: "#ffffff",
    color: "#ffffff",
  },
  stepContainer: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  centerText: {
    textAlign: "center",
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
