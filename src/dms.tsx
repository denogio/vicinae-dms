import React from 'react';
import { List, ActionPanel, Action, Icon, showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath } from './lib/dms-ipc';

export default function DmsControl() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();
  
  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  return (
    <List
      searchBarPlaceholder="Search DMS commands..."
      isShowingDetail
    >
      <List.Section title="DMS Control Categories">
        <List.Item
          title="Wallpaper"
          subtitle="Manage wallpapers"
          icon={Icon.Image}
          detail={<List.Item.Detail markdown="## Wallpaper\n\nSet, cycle, or clear wallpapers globally or per-monitor" />}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copy Wallpaper Command"
                content="vicinae://extensions/vicinae-dms/dms-wallpaper"
              />
            </ActionPanel>
          }
        />
        <List.Item
          title="Theme"
          subtitle="Switch between light and dark themes"
          icon={Icon.Gear}
          detail={<List.Item.Detail markdown="## Theme\n\nToggle theme mode or switch to specific theme" />}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copy Theme Command"
                content="vicinae://extensions/vicinae-dms/dms-theme"
              />
            </ActionPanel>
          }
        />
        <List.Item
          title="Modals"
          subtitle="Open and control shell modals"
          icon={Icon.AppWindow}
          detail={<List.Item.Detail markdown="## Modals\n\nAccess launcher, settings, clipboard, notifications, and more" />}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copy Modals Command"
                content="vicinae://extensions/vicinae-dms/dms-modals"
              />
            </ActionPanel>
          }
        />
        <List.Item
          title="Lock"
          subtitle="Lock screen immediately"
          icon={Icon.Lock}
          detail={<List.Item.Detail markdown="## Lock\n\nLock the screen using DMS lock functionality" />}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copy Lock Command"
                content="vicinae://extensions/vicinae-dms/dms-lock"
              />
            </ActionPanel>
          }
        />
        <List.Item
          title="Inhibit"
          subtitle="Toggle idle inhibit"
          icon={Icon.Moon}
          detail={<List.Item.Detail markdown="## Inhibit\n\nPrevent automatic screen lock and sleep" />}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard
                title="Copy Inhibit Command"
                content="vicinae://extensions/vicinae-dms/dms-inhibit"
              />
            </ActionPanel>
          }
        />
      </List.Section>
    </List>
  );
}
