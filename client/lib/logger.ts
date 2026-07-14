const IS_DEV = process.env.NODE_ENV === "development";

export const logger = {
  info: (message: string, ...args: any[]) => {
    if (IS_DEV) {
      console.log(
        `%c[NexTrade INFO] %c${message}`,
        "color: #FF9500; font-weight: bold;",
        "color: inherit;",
        ...args
      );
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (IS_DEV) {
      console.warn(
        `%c[NexTrade WARN] %c${message}`,
        "color: #FFB347; font-weight: bold;",
        "color: inherit;",
        ...args
      );
    }
  },
  error: (message: string, ...args: any[]) => {
    console.error(
      `%c[NexTrade ERROR] %c${message}`,
      "color: #EF4444; font-weight: bold;",
      "color: inherit;",
      ...args
    );
  },
};
