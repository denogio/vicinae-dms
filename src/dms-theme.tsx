import React from 'react';
import { List, ActionPanel, Action, Icon, showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath, parseOutput } from './lib/dms-ipc';

export default async function DmsTheme() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();
  
  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  const result = await callDmsIpc('theme', 'getMode');
  const currentMode = result.success ? result.stdout : 'Unknown';

  return (
    <List
      searchBarPlaceholder="Search theme actions..."
      isShowingDetail
    >
      <List.Section title={`Current Theme: ${currentMode}`}>
        <List.Item
          title="Toggle Theme"
          subtitle="Switch between light and dark themes"
          icon={Icon.Switch}
          detail={<List.Item.Detail markdown="Toggle between light and dark theme modes." />}
          actions={
            <ActionPanel>
              <Action
                title="Toggle Theme"
                onAction={async () => {
                  const result = await callDmsIpc('theme', 'toggle');
                  if (result.success) {
                    await showToast({
                      title: 'Theme toggled',
                    });
                  } else {
                    await showToast({
                      title: 'Failed to toggle theme',
                      message: result.error || result.stderr,
                    });
                  }
                }}
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Light Theme"
          subtitle="Switch to light theme"
          icon={Icon.Sun}
          detail={<List.Item.Detail markdown="Switch to light theme mode for better visibility in bright environments." />}
          actions={
            <ActionPanel>
              <Action
                title="Switch to Light"
                onAction={async () => {
                  const result = await callDmsIpc('theme', 'light');
                  if (result.success) {
                    await showToast({
                      title: 'Light theme activated',
                    });
                  } else {
                    await showToast({
                      title: 'Failed to switch theme',
                      message: result.error || result.stderr,
                    });
                  }
                }}
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Dark Theme"
          subtitle="Switch to dark theme"
          icon={Icon.Moon}
          detail={<List.Item.Detail markdown="Switch to dark theme mode for reduced eye strain in low-light environments." />}
          actions={
            <ActionPanel>
              <Action
                title="Switch to Dark"
                onAction={async () => {
                  const result = await callDmsIpc('theme', 'dark');
                  if (result.success) {
                    await showToast({
                      title: 'Dark theme activated',
                    });
                  } else {
                    await showToast({
                      title: 'Failed to switch theme',
                      message: result.error || result.stderr,
                    });
                  }
                }}
              />
            </ActionPanel>
          }
        />
      </List.Section>
    </List>
  );
}
