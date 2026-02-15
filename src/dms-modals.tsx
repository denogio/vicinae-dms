import React from 'react';
import { List, ActionPanel, Action, Icon, showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath } from './lib/dms-ipc';

interface ModalAction {
  title: string;
  subtitle: string;
  icon: any;
  target: string;
  func: string;
  args?: string[];
  description: string;
}

const coreModalActions: ModalAction[] = [
  {
    title: 'Launcher',
    subtitle: 'Open application launcher',
    icon: Icon.ArrowRight,
    target: 'spotlight',
    func: 'toggle',
    description: 'Toggle the application launcher modal with search capabilities.',
  },
  {
    title: 'Clipboard History',
    subtitle: 'Open clipboard manager',
    icon: Icon.Clipboard,
    target: 'clipboard',
    func: 'toggle',
    description: 'Toggle the clipboard history manager.',
  },
  {
    title: 'Notifications',
    subtitle: 'Open notification center',
    icon: Icon.Bell,
    target: 'notifications',
    func: 'toggle',
    description: 'Toggle the notification center modal.',
  },
  {
    title: 'Settings',
    subtitle: 'Open DMS settings',
    icon: Icon.Gear,
    target: 'settings',
    func: 'toggle',
    description: 'Toggle the DMS settings modal.',
  },
  {
    title: 'Power Menu',
    subtitle: 'Open power options',
    icon: Icon.Power,
    target: 'powermenu',
    func: 'toggle',
    description: 'Toggle the power menu with shutdown, restart, and logout options.',
  },
  {
    title: 'Control Center',
    subtitle: 'Open quick settings',
    icon: Icon.Cog,
    target: 'control-center',
    func: 'toggle',
    description: 'Toggle the control center with network, audio, and quick settings.',
  },
  {
    title: 'Process List',
    subtitle: 'Open system processes',
    icon: Icon.AppWindow,
    target: 'processlist',
    func: 'toggle',
    description: 'Toggle the system process list and performance monitor.',
  },
  {
    title: 'Notepad',
    subtitle: 'Open quick notepad',
    icon: Icon.Pencil,
    target: 'notepad',
    func: 'toggle',
    description: 'Toggle the quick notepad/scratchpad.',
  },
];

const otherModalActions: ModalAction[] = [
  {
    title: 'Welcome Wizard',
    subtitle: 'Open first-run wizard',
    icon: Icon.Info,
    target: 'welcome',
    func: 'open',
    description: 'Show the DMS welcome wizard with feature overview and system diagnostics.',
  },
  {
    title: 'Dashboard',
    subtitle: 'Open dashboard popup',
    icon: Icon.AppWindow,
    target: 'dash',
    func: 'toggle',
    description: 'Toggle the dashboard popup with overview, media, and weather tabs.',
  },
  {
    title: 'File Browser',
    subtitle: 'Browse files for wallpaper/profile',
    icon: Icon.Folder,
    target: 'file',
    func: 'browse',
    args: ['wallpaper'],
    description: 'Open the file browser to select wallpapers or profile images.',
  },
  {
    title: 'DankDash',
    subtitle: 'Toggle wallpaper browser',
    icon: Icon.Globe,
    target: 'dankdash',
    func: 'wallpaper',
    description: 'Toggle the DankDash wallpaper browser.',
  },
];

const notifActionList = [
  {
    title: 'Clear All',
    subtitle: 'Dismiss all notifications',
    icon: Icon.Trash,
    target: 'notifications',
    func: 'clearAll',
    description: 'Clear all notifications from the notification center.',
  },
  {
    title: 'Dismiss All Popups',
    subtitle: 'Close all notification popups',
    icon: Icon.XMarkCircle,
    target: 'notifications',
    func: 'dismissAllPopups',
    description: 'Dismiss all active notification popups.',
  },
  {
    title: 'Toggle Do Not Disturb',
    subtitle: 'Enable/disable DND',
    icon: Icon.EyeSlash,
    target: 'notifications',
    func: 'toggleDoNotDisturb',
    description: 'Toggle Do Not Disturb mode for notifications.',
  },
];

export default function DmsModals() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();
  
  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  return (
    <List
      searchBarPlaceholder="Search modal actions..."
      isShowingDetail
    >
      <List.Section title="Core Modals">
        {coreModalActions.map((modal) => (
          <List.Item
            key={modal.title}
            title={modal.title}
            subtitle={modal.subtitle}
            icon={modal.icon}
            detail={<List.Item.Detail markdown={modal.description} />}
            actions={
              <ActionPanel>
                <Action
                  title={modal.title}
                  onAction={async () => {
                    const result = await callDmsIpc(
                      modal.target,
                      modal.func,
                      ...(modal.args || [])
                    );
                    if (result.success) {
                      await showToast({
                        title: `${modal.title} toggled`,
                      });
                    } else {
                      await showToast({
                        title: `Failed to toggle ${modal.title}`,
                        message: result.error || result.stderr,
                      });
                    }
                  }}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>

      <List.Section title="Notification Actions">
        {notifActionList.map((action) => (
          <List.Item
            key={action.title}
            title={action.title}
            subtitle={action.subtitle}
            icon={action.icon}
            detail={<List.Item.Detail markdown={action.description} />}
            actions={
              <ActionPanel>
                <Action
                  title={action.title}
                  onAction={async () => {
                    const result = await callDmsIpc(action.target, action.func);
                    if (result.success) {
                      await showToast({
                        title: `${action.title} executed`,
                      });
                    } else {
                      await showToast({
                        title: `Failed to execute ${action.title}`,
                        message: result.error || result.stderr,
                      });
                    }
                  }}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>

      <List.Section title="Other Modals">
        {otherModalActions.map((modal) => (
          <List.Item
            key={modal.title}
            title={modal.title}
            subtitle={modal.subtitle}
            icon={modal.icon}
            detail={<List.Item.Detail markdown={modal.description} />}
            actions={
              <ActionPanel>
                <Action
                  title={modal.title}
                  onAction={async () => {
                    const result = await callDmsIpc(
                      modal.target,
                      modal.func,
                      ...(modal.args || [])
                    );
                    if (result.success) {
                      await showToast({
                        title: `${modal.title} toggled`,
                      });
                    } else {
                      await showToast({
                        title: `Failed to toggle ${modal.title}`,
                        message: result.error || result.stderr,
                      });
                    }
                  }}
                />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
