import { Stack } from 'expo-router';
import { CustomHeader } from '@/components/CustomHeader';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home Screen',
          headerTitle: () => <CustomHeader />, // Use CustomHeader
        }}
      />
      <Stack.Screen
        name="VideoDetails"
        options={{
          title: 'Video Details',
          headerTitle: () => <CustomHeader />, // Same header for VideoDetails
        }}
      />
    </Stack>
  );
}

