import { showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath } from './lib/dms-ipc';

export default async function DmsThemeLight() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();

  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  const result = await callDmsIpc('theme', 'light');

  if (result.success) {
    await showToast({ title: 'Light theme activated' });
  } else {
    await showToast({
      title: 'Failed to switch theme',
      message: result.error || result.stderr,
    });
  }
}
