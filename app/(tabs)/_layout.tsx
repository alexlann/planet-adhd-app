import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { COLORS } from "../../constants";
import { Icon } from "../../components";
import { IconOptions } from "../../types";
import { headerOptions } from "../../constants";

export default function TabsLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      initialRouteName="dashboard"
      screenOptions={{
        tabBarActiveTintColor: COLORS.primaryDark,
        tabBarInactiveTintColor: COLORS.darkGray,
        tabBarShowLabel: false,
        tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderWidth: 0,
            height: 75,
            borderColor: "transparent",
        }
      }}
    >
      <Tabs.Screen
        name="goals"
        options={{
            title: t("goals-title"),
            tabBarIcon: ({ color }) => <Icon size={28} icon={IconOptions.mountain} color={color} />,
            ...headerOptions,
          }}
      />
      <Tabs.Screen
          name="calendar"
          options={{
              title: t("calendar-title"),
              tabBarIcon: ({ color }) => <Icon size={28} icon={IconOptions.calendar} color={color} />,
              ...headerOptions,
            }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: t("dashboard-title"),
          tabBarIcon: ({ color }) => <Icon size={28} icon={IconOptions.home} color={ COLORS.white } />,
          // unmount screen when navigating away
          unmountOnBlur: true,
          tabBarItemStyle: {
            height: 90,
          },
          tabBarIconStyle: {
            backgroundColor: COLORS.primaryDark,
            color: COLORS.white,
            width: 90,
            borderRadius: 999,
            borderColor: COLORS.white,
            borderWidth: 12,
            position: "relative",
            top: -10,
          },
          ...headerOptions,
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: t("progress-title"),
          headerShown: false,
          tabBarIcon: ({ color }) => <Icon size={28} icon={IconOptions.chart} color={color} />,
          ...headerOptions,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: t("account-title"),
          tabBarIcon: ({ color }) => <Icon size={28} icon={IconOptions.user} color={color}  />,
          ...headerOptions,
        }}
      />
    </Tabs>
  );
}