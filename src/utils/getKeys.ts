interface FlattenedValue<T> {
  [key: string]: T;
}

export function flattenObject<T extends Record<string, any>>(
  ob: T,
  prefix = '',
  result: Array<FlattenedValue<T[keyof T]>> = []
): Array<FlattenedValue<T[keyof T]>> {
  Object.keys(ob).forEach((key) => {
    const currentPrefix = prefix ? `${prefix}.` : '';
    if (typeof ob[key as keyof T] === 'object' && ob[key as keyof T] !== null) {
      flattenObject(ob[key as keyof T], `${currentPrefix}${key}`, result);
    } else {
      result.push({ [`${currentPrefix}${key}`]: ob[key as keyof T] });
    }
  });
  return result;
}
