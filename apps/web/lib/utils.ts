import { ClassValue, clsx } from 'clsx'
import { saveAs } from 'file-saver'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function deepEqual(obj1: object, obj2: object) {
  if (obj1 === obj2) {
    return true;
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let k of keys1) {
    const key = k as keyof typeof obj1;
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
