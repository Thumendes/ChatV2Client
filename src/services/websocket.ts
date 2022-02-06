import { io, Socket } from "socket.io-client";

class Ws {
  private socket!: Socket;
  private listeners = new Map<string, (payload: any[]) => void>();

  constructor() {
    this.start();
  }

  start() {
    this.socket = io(process.env.NEXT_PUBLIC_API_URL || "");
  }

  send(event: string, ...payload: any[]) {
    this.socket.emit(event, ...payload);
  }

  on(event: string, callback: (...payload: any[]) => void) {
    const listener = this.listeners.get(event);

    if (listener)
      throw new Error(
        "Já existe um listener para esse evento! Cancele o anterior e tente novamente."
      );

    this.listeners.set(event, callback);

    this.socket.on(event, (...payload: any[]) => {
      callback(...payload);
    });

    return () => {
      this.listeners.delete(event);
    };
  }
}

export const ws = new Ws();
