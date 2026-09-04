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
  let graph = [];
  let ySeries = [];
  let months = [];
  let costs = [];

  let statement = (useLocalSearchParams().statement as string)
    .split("\n")
    .filter((n) => n);

  removeString(
    statement,
    "------------------------------------------------------------------------------------------------",
  );

  let statementEvents = statement.slice(
    6,
    statement.findIndex((element) => element.includes("Total Income")),
  );

  statement.splice(6, statement.length - 9);

  for (let i = 0; i < statementEvents.length; i++) {
    if (statementEvents[i].indexOf(".") > 65) {
      statementEvents.splice(i, 1);
      i--;
    }
  }

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

  for (let i = 0; i < statementEvents.length; i++) {
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
      i++;
    }
  }

  statementEvents[0] = statementEvents[0].slice(3);

  for (let i = 0; i < statementEvents.length; i += 4) {
    if (months.indexOf(statementEvents[i]) === -1) {
      months.push(statementEvents[i]);
    }
  }

  for (let j = 1; j < statementEvents.length; j += 4) {
    costs.push(statementEvents[j]);
  }

  costs = costs.filter((item, index) => costs.indexOf(item) === index);

  for (let i = 0; i < months.length; i++) {
    let graphColumn = {
      month: months[i],
    };

    for (let j = 1; j < statementEvents.length; j += 4) {
      if (statementEvents[j - 1] === months[i]) {
        graphColumn[statementEvents[j]] = Number(statementEvents[j + 1]);
      }
    }
    graph.push(graphColumn);
  }

  for (let i = 0; i < costs.length; i++) {
    let ySeriesRow = {};
    ySeriesRow["yKey"] = costs[i];
    ySeriesRow["label"] = costs[i];
    ySeries.push(ySeriesRow);
  }

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
                data={graph}
                xKey="month"
                mode="stacked"
                series={ySeries}
                orientation="horizontal"
                scrollable
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
