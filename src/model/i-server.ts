export interface IServer {
  start(port: number): void;
  stop(): void;
}
