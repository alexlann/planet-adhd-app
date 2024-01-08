import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import "../translation";
import { StatusBar } from 'expo-status-bar';
import AuthProvider from '../authentication/AuthProvider';
import { useTranslation } from 'react-i18next';
import { headerOptions } from '../constants';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    MontserratRegular: require("../assets/fonts/Montserrat-Regular.ttf"),
    MontserratMedium: require("../assets/fonts/Montserrat-Medium.ttf"),
    MontserratBold: require("../assets/fonts/Montserrat-Bold.ttf"),
    NotoSansRegular: require("../assets/fonts/NotoSans-Regular.ttf"),
    NotoSansMedium: require("../assets/fonts/NotoSans-Medium.ttf"),
    NotoSansBold: require("../assets/fonts/NotoSans-Bold.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
    !loaded && SplashScreen.preventAutoHideAsync();
    loaded && SplashScreen.hideAsync();
  }, [error, loaded]);


  return (
    <>
      {loaded && <RootLayoutNav />}
    </>
  );
}

function RootLayoutNav() {
  const { t } = useTranslation();

    return (
        <AuthProvider>
            <>
                <StatusBar backgroundColor={"transparent"} translucent={true} animated={true} />
                <Stack>
                  <Stack.Screen name="index" options={{ headerShown: false }} />
                  <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                  <Stack.Screen name="goals/add" options={{
                      presentation: 'modal',
                      title: t("goals-add-title"),
                      ...headerOptions
                  }} />
                  <Stack.Screen name="tasks/add" options={{
                      presentation: 'modal',
                      title: t("tasks-add-title"),
                      ...headerOptions
                  }} />
                  <Stack.Screen name="tasks/[id]" options={{
                      presentation: 'modal',
                      title: t("tasks-detail-title"),
                      ...headerOptions
                  }} />
                  <Stack.Screen name="goals/[id]" options={{
                      presentation: 'modal',
                      title: t("goals-detail-title"),
                      ...headerOptions
                  }} />
                </Stack>
            </>
        </AuthProvider>
    );
}
