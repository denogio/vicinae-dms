import { showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath } from './lib/dms-ipc';

export default async function DmsLock() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();
  
  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  const result = await callDmsIpc('lock', 'lock');
  
  if (result.success) {
    await showToast({
      title: 'Screen locked',
    });
  } else {
    await showToast({
      title: 'Failed to lock screen',
      message: result.error || result.stderr,
    });
  }
}
