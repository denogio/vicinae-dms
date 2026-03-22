import { showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath } from './lib/dms-ipc';

export default async function DmsThemeDark() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();

  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  const result = await callDmsIpc('theme', 'dark');

  if (result.success) {
    await showToast({ title: 'Dark theme activated' });
  } else {
    await showToast({
      title: 'Failed to switch theme',
      message: result.error || result.stderr,
    });
  }
}
