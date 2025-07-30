
/// <reference types="vite/client" />

interface UnicornStudio {
  isInitialized: boolean;
  scenes: any[];
  addScene: (config: any) => Promise<any>;
  destroy: () => void;
  init: () => Promise<any[]>;
  unbindEvents: () => void;
}

declare global {
  interface Window {
    UnicornStudio: UnicornStudio;
  }
}

export {};
