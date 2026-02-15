import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

let dmsBinaryPath = 'dms';

export async function setDmsBinaryPath(path: string): Promise<void> {
  dmsBinaryPath = path || 'dms';
}

export function getDmsBinaryPath(): string {
  return dmsBinaryPath;
}

export interface DmsIpcResponse {
  success: boolean;
  stdout: string;
  stderr: string;
  error?: string;
}

export async function callDmsIpc(target: string, func: string, ...args: string[]): Promise<DmsIpcResponse> {
  const commandArgs = ['ipc', 'call', target, func, ...args];
  const command = `${dmsBinaryPath} ${commandArgs.join(' ')}`;

  try {
    const { stdout, stderr } = await execAsync(command);
    
    return {
      success: true,
      stdout: stdout.trim(),
      stderr: stderr.trim(),
    };
  } catch (error: any) {
    return {
      success: false,
      stdout: '',
      stderr: error.stderr || '',
      error: error.message || 'Unknown error occurred',
    };
  }
}

export async function executeDmsCommand(command: string): Promise<DmsIpcResponse> {
  const fullCommand = `${dmsBinaryPath} ${command}`;

  try {
    const { stdout, stderr } = await execAsync(fullCommand);
    
    return {
      success: true,
      stdout: stdout.trim(),
      stderr: stderr.trim(),
    };
  } catch (error: any) {
    return {
      success: false,
      stdout: '',
      stderr: error.stderr || '',
      error: error.message || 'Unknown error occurred',
    };
  }
}

export function parseOutput(output: string): string {
  if (!output) return '';
  
  const lines = output.split('\n');
  const lastLine = lines[lines.length - 1].trim();
  
  return lastLine || output.trim();
}
