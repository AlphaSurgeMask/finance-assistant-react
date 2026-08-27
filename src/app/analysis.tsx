import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { BarChart } from "react-native-chart-kit/v2";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

export default function AnalysisScreen() {
  const statement = (useLocalSearchParams().statement as string).split("\n");
  const demoData = [
    { month: "January", Coles: 180, GymMembership: 60 },
    { month: "February", Coles: 520, GymMembership: 210 },
    { month: "March", Coles: 260, GymMembership: 120 },
  ];

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Analysis" }} />
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.centerText}>
            Finance Analysis
          </ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            {statement[2]}
          </ThemedText>
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <BarChart
              data={demoData}
              xKey="month"
              mode="stacked"
              series={[
                { yKey: "Coles", label: "Coles" },
                { yKey: "GymMembership", label: "Gym Membership" },
              ]}
              interaction={{
                mode: "tap",
                deselectOnOutsidePress: true,
              }}
              tooltip={{
                anchor: "pointer",
                placement: "above",
                width: 170,
              }}
              width={MaxContentWidth}
              height={480}
            />
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
