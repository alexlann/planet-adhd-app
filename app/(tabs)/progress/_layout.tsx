import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { headerOptions } from "../../../constants";

export default function progressLayout() {
    const { t } = useTranslation();
    return (
      <Stack
        initialRouteName="index"
      >
        <Stack.Screen name="index" options={{
          title: t("progress-title"),
          ...headerOptions,
        }} />
        <Stack.Screen name="completedGoals" options={{
            presentation: 'modal',
            title: t("completed-goals-title"),
            ...headerOptions
        }} />
      </Stack>
    );
  }