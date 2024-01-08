import { Stack } from "expo-router";
import { useTranslation } from "react-i18next";
import { headerOptions } from "../../constants";

export default function onBoardingLayout() {
    const { t } = useTranslation();
    return (
      <Stack
        initialRouteName="login"
      >
        <Stack.Screen
            name="login"
            options={{
            title: t("login-title"),
            ...headerOptions,
            }}
        />
        <Stack.Screen
            name="register"
            options={{
            title: t("register-title"),
            ...headerOptions,
            }}
        />
      </Stack>
    );
  }