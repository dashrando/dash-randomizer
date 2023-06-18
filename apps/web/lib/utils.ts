import { ClassValue, clsx } from 'clsx'
import { saveAs } from 'file-saver'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function downloadFile(data: string, filename: string) {
  saveAs(new Blob([data]), filename);
}
