
export enum Vibe {
  LUCID = 'LUCID',
  DEVOTED = 'DEVOTED',
  MAGNETIC = 'MAGNETIC',
  OBSESSED = 'OBSESSED'
}

export interface Entry {
  id: string;
  timestamp: string;
  vibe: Vibe;
  intensity: number;
  narrative: string;
}

export interface UserState {
  currentParadigm: string;
  lastIntensity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  files?: {
    data: string;
    mimeType: string;
    name: string;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  photo: string;
  queriesBalance: number;
  lastFreeQueryDate: string | null;
}
