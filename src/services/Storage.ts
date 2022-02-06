import Uid from "../helpers/Uid";

type ChangeCallback = (value: any) => void;

type Subscriber = { key: string; callback: ChangeCallback };

class Storage {
  static subscribers = new Map<string, Subscriber>();

  static onChange(key: string, callback: ChangeCallback) {
    const id = Uid.token();

    Storage.subscribers.set(id, { key, callback });

    return {
      remove() {
        Storage.subscribers.delete(id);
      },
    };
  }

  static set(key: string, value: any) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(key, jsonValue);

    for (const subscriber of Storage.subscribers.values()) {
      if (subscriber.key !== key) continue;

      subscriber.callback(jsonValue);
    }
  }

  static get(key: string) {
    const jsonValue = localStorage.getItem(key);

    if (!jsonValue) return null;

    try {
      return JSON.parse(jsonValue);
    } catch {
      return jsonValue;
    }
  }

  static remove(key: string) {
    localStorage.removeItem(key);

    for (const subscriber of Storage.subscribers.values()) {
      if (subscriber.key !== key) continue;

      subscriber.callback(null);
    }
  }
}

export default Storage;
