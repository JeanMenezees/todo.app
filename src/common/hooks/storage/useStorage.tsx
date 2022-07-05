import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function useStorage(key: string): Promise<string | null> {
  return await AsyncStorage.getItem(key);
}
