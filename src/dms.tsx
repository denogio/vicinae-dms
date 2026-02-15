import React from 'react';
import { List, ActionPanel, Action, Icon, showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath } from './lib/dms-ipc';

const categories = [
  {
    id: 'wallpaper',
    title: 'Wallpaper',
    subtitle: 'Manage wallpapers',
    icon: Icon.Image,
    command: 'dms-wallpaper',
    description: 'Set, cycle, or clear wallpapers globally or per-monitor',
  },
  {
    id: 'theme',
    title: 'Theme',
    subtitle: 'Switch between light and dark themes',
    icon: Icon.Gear,
    command: 'dms-theme',
    description: 'Toggle theme mode or switch to specific theme',
  },
  {
    id: 'modals',
    title: 'Modals',
    subtitle: 'Open and control shell modals',
    icon: Icon.AppWindow,
    command: 'dms-modals',
    description: 'Access launcher, settings, clipboard, notifications, and more',
  },
  {
    id: 'lock',
    title: 'Lock',
    subtitle: 'Lock screen immediately',
    icon: Icon.Lock,
    command: 'dms-lock',
    description: 'Lock the screen using DMS lock functionality',
  },
  {
    id: 'inhibit',
    title: 'Inhibit',
    subtitle: 'Toggle idle inhibit',
    icon: Icon.Moon,
    command: 'dms-inhibit',
    description: 'Prevent automatic screen lock and sleep',
  },
] as const;

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
        {categories.map((category) => (
          <List.Item
            key={category.id}
            title={category.title}
            subtitle={category.subtitle}
            icon={category.icon}
            detail={<List.Item.Detail markdown={`## ${category.title}\n\n${category.description}`} />}
            actions={
              <ActionPanel>
                <Action.CopyToClipboard
                  title={`Copy ${category.title} Command`}
                  content={`vicinae://extensions/vicinae-dms/${category.command}`}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
