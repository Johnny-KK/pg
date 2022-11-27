type GlobalConfig = {
  dictApi: (type: string) => Promise<{ value: string; label: string; type: string }[]>;
};

export type { GlobalConfig };
