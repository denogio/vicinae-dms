import { showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath } from './lib/dms-ipc';

interface DmsAction {
  id: string;
  title: string;
  description: string;
  action: () => Promise<void>;
}

const actions: DmsAction[] = [
  {
    id: 'wallpaper',
    title: 'Wallpaper',
    description: 'Manage wallpapers',
    action: async () => {
      await showToast({
        title: 'Opening Wallpaper Controls',
      });
    },
  },
  {
    id: 'theme',
    title: 'Theme',
    description: 'Toggle theme mode',
    action: async () => {
      await showToast({
        title: 'Opening Theme Controls',
      });
    },
  },
  {
    id: 'modals',
    title: 'Modals',
    description: 'Control shell modals',
    action: async () => {
      await showToast({
        title: 'Opening Modal Controls',
      });
    },
  },
  {
    id: 'lock',
    title: 'Lock',
    description: 'Lock screen',
    action: async () => {
      await callDmsIpc('lock', 'lock');
      await showToast({
        title: 'Screen Locked',
      });
    },
  },
  {
    id: 'inhibit',
    title: 'Inhibit',
    description: 'Toggle idle inhibit',
    action: async () => {
      await callDmsIpc('inhibit', 'toggle');
      await showToast({
        title: 'Idle Inhibit Toggled',
      });
    },
  },
];

export default async function DmsControl() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();
  
  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  const args = process.argv.slice(2);
  const actionId = args[0];

  if (actionId) {
    const action = actions.find((a) => a.id === actionId);
    if (action) {
      await action.action();
    }
  } else {
    await showToast({
      title: 'DMS Control',
      message: 'Use: wallpaper, theme, modals, lock, inhibit',
    });
  }
}
