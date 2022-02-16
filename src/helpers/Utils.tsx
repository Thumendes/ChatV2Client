export class Utils {
  static sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  static fileUrl(url: string, type: string) {
    return `${process.env.NEXT_PUBLIC_API_URL}/${type}/${url}`;
  }
}
