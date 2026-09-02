import { Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ChartKitProvider, BarChart } from "react-native-chart-kit/v2";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";

function removeString(array: any[], string: string) {
  array.forEach((item, index) => {
    if (item === string) {
      array.splice(index, 1);
    }
  });
  return array;
}

export default function AnalysisScreen() {
  let statement = (useLocalSearchParams().statement as string)
    .split("\n")
    .filter((n) => n);
  const demoData = [
    { month: "January", Coles: 180, GymMembership: 60 },
    { month: "February", Coles: 520, GymMembership: 210 },
    { month: "March", Coles: 260, GymMembership: 120 },
  ];

  removeString(
    statement,
    "------------------------------------------------------------------------------------------------",
  );

  let statementEvents = statement.slice(
    6,
    statement.findIndex((element) => element.includes("Total Income")),
  );

  statement.splice(6, statement.length - 9);

  statementEvents.forEach((item, index) => {
    if (item === "") {
      statementEvents.splice(index, 1);
    }
  });

  statementEvents = statementEvents
    .join()
    .split("  ")
    .filter((n) => n)
    .map((item) => item.trim());

  for (let i = 0; i < statementEvents.length; i += 2) {
    if (statementEvents[i][statementEvents[i].indexOf(".") + 3] === ",") {
      statementEvents.splice(
        i,
        0,
        statementEvents[i].slice(
          0,
          statementEvents[i].length - statementEvents[i].indexOf(".") - 2,
        ),
      );

      statementEvents.splice(
        i + 1,
        1,
        statementEvents[i + 1].slice(
          statementEvents[i + 1].length -
            statementEvents[i + 1].indexOf(".") +
            2,
        ),
      );
    }
  }

  console.log(statementEvents);
  console.log(statement);

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ title: "Analysis" }} />
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.centerText}>
            Finance Analysis
          </ThemedText>
          <ThemedText style={styles.centerText} themeColor="textSecondary">
            {statement[1]}
          </ThemedText>
          <ThemedView type="backgroundElement" style={styles.stepContainer}>
            <ChartKitProvider mode="system">
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
            </ChartKitProvider>
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
