import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './src/navigation';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva'
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as theme } from './custom-theme.json'
import { Provider } from 'react-redux';
import LoadingPopover from './src/components/LoadingPopover';
import { store } from './src/redux/store';
import Snackbar from './src/components/Snackbar/Snackbar';

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <>
        <Provider store={store}>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
            <SafeAreaProvider>
              <Navigation />
              <StatusBar />
              <LoadingPopover />
              <Snackbar />
            </SafeAreaProvider>
          </ApplicationProvider>
        </Provider>
      </>
    );
  }
}
