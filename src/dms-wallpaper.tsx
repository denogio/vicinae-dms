import React from 'react';
import { List, ActionPanel, Action, Icon, showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath, parseOutput } from './lib/dms-ipc';

export default function DmsWallpaper() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();
  
  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  return (
    <List
      searchBarPlaceholder="Search wallpaper actions..."
      isShowingDetail
    >
      <List.Section title="Global Wallpaper Actions">
        <List.Item
          title="Set Wallpaper"
          subtitle="Choose a new wallpaper from file system"
          icon={Icon.Folder}
          detail={<List.Item.Detail markdown="Select an image file to set as the global wallpaper." />}
          actions={
            <ActionPanel>
              <Action.Push
                title="Set Wallpaper"
                target={<SetWallpaperForm />}
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Next Wallpaper"
          subtitle="Cycle to next wallpaper"
          icon={Icon.ArrowRightCircle}
          detail={<List.Item.Detail markdown="Cycle to the next wallpaper in your collection." />}
          actions={
            <ActionPanel>
              <Action
                title="Cycle Next"
                onAction={async () => {
                  const result = await callDmsIpc('wallpaper', 'next');
                  if (result.success) {
                    await showToast({
                      title: 'Cycled to next wallpaper',
                    });
                  } else {
                    await showToast({
                      title: 'Failed to cycle wallpaper',
                      message: result.error || result.stderr,
                    });
                  }
                }}
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Previous Wallpaper"
          subtitle="Cycle to previous wallpaper"
          icon={Icon.ArrowLeftCircle}
          detail={<List.Item.Detail markdown="Cycle to the previous wallpaper in your collection." />}
          actions={
            <ActionPanel>
              <Action
                title="Cycle Previous"
                onAction={async () => {
                  const result = await callDmsIpc('wallpaper', 'prev');
                  if (result.success) {
                    await showToast({
                      title: 'Cycled to previous wallpaper',
                    });
                  } else {
                    await showToast({
                      title: 'Failed to cycle wallpaper',
                      message: result.error || result.stderr,
                    });
                  }
                }}
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Get Current Wallpaper"
          subtitle="View current wallpaper path"
          icon={Icon.Eye}
          detail={<List.Item.Detail markdown="Display the path of the currently set wallpaper." />}
          actions={
            <ActionPanel>
              <Action
                title="Get Wallpaper"
                onAction={async () => {
                  const result = await callDmsIpc('wallpaper', 'get');
                  if (result.success && result.stdout) {
                    await showToast({
                      title: 'Current Wallpaper',
                      message: parseOutput(result.stdout),
                    });
                  } else {
                    await showToast({
                      title: 'Failed to get wallpaper',
                      message: result.error || result.stderr,
                    });
                  }
                }}
              />
            </ActionPanel>
          }
        />

        <List.Item
          title="Clear Wallpapers"
          subtitle="Remove all per-monitor wallpapers"
          icon={Icon.Trash}
          detail={<List.Item.Detail markdown="Remove all per-monitor wallpaper settings and return to global mode." />}
          actions={
            <ActionPanel>
              <Action
                title="Clear Wallpapers"
                style={Action.Style.Destructive}
                onAction={async () => {
                  const result = await callDmsIpc('wallpaper', 'clear');
                  if (result.success) {
                    await showToast({
                      title: 'Wallpapers cleared',
                    });
                  } else {
                    await showToast({
                      title: 'Failed to clear wallpapers',
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

function SetWallpaperForm() {
  return (
    <List
      searchBarPlaceholder="Enter wallpaper path..."
    >
      <List.Item
        id="path"
        title="Wallpaper Path"
        subtitle="Enter the full path to an image file"
        icon={Icon.Document}
        actions={
          <ActionPanel>
            <Action.SubmitForm
              title="Set Wallpaper"
              onSubmit={async (values) => {
                const path = values['path'] as string;
                if (!path) return;
                
                const result = await callDmsIpc('wallpaper', 'set', path);
                if (result.success) {
                  await showToast({
                    title: 'Wallpaper set successfully',
                    message: path,
                  });
                } else {
                  await showToast({
                    title: 'Failed to set wallpaper',
                    message: result.error || result.stderr,
                  });
                }
              }}
            />
          </ActionPanel>
        }
      />
    </List>
  );
}
