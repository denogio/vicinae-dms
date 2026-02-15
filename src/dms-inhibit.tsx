import { showToast, getPreferenceValues } from '@vicinae/api';
import { callDmsIpc, setDmsBinaryPath } from './lib/dms-ipc';

export default async function DmsInhibit() {
  const preferences = getPreferenceValues<{ 'dms-binary-path': string }>();
  
  if (preferences['dms-binary-path']) {
    setDmsBinaryPath(preferences['dms-binary-path']);
  }

  const result = await callDmsIpc('inhibit', 'toggle');
  
  if (result.success) {
    const state = result.stdout.includes('enabled') ? 'enabled' : 'disabled';
    await showToast({
      title: `Idle inhibit ${state}`,
    });
  } else {
    await showToast({
      title: 'Failed to toggle idle inhibit',
      message: result.error || result.stderr,
    });
  }
}
