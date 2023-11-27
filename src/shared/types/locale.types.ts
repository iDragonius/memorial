export type LocaleTypes = "AZ" | "EN" | "RU";

export interface LocaleProps {
  name: string;
  description: string;
  locale: LocaleTypes;
}
