interface Window {
  fbq: (
    type: string,
    eventName: string,
    params?: {
      [key: string]: string | number | boolean;
    }
  ) => void;
}

declare function fbq(
  type: string,
  eventName: string,
  params?: {
    [key: string]: string | number | boolean;
  }
): void; 