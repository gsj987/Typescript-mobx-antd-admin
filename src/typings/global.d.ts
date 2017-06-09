interface Window {
  __props__?: string;
}

declare module '*.css' {

}

declare type Require = {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void, name?: string) => void;
}
