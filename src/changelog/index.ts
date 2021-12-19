import changelog from "./changelog.json";

export interface ChangelogUpdate {
  name: string;
  date: string;
  features: string[];
}

export default changelog as Record<string, ChangelogUpdate | null>;
