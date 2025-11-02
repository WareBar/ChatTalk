// src/hooks/useChat.ts
import { useEffect, useRef, useState, useCallback } from "react";

type Message = {
  id: number;
  sender: { id: number; first_name: string; last_name: string; email: string };
  content: string;
  sent_at: string;
  conversation: string;
};

export function useChat(referenceCode: string) {
  const [data, setData] = useState<Message[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback(() => {
    const token = localStorage.getItem("accessToken");
    const backendHost = "localhost:8000";
    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const url = `${protocol}://${backendHost}/ws/conversations/${referenceCode}/?token=${token}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket open");
      
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "message") {
        setData((prev) => [...prev, data]);
      }
    };

    ws.onclose = (ev) => {
      console.log("WebSocket closed", ev.code, ev.reason);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error", err);
    };
  }, [referenceCode]);

  useEffect(() => {
    connect();
    return () => {
      wsRef.current?.close();
    };
  }, [connect]);

  const sendData = (content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not connected");
      return;
    }
    const payload = {
      type: "message.send",
      content,
    };
    wsRef.current.send(JSON.stringify(payload));
  };

  return { data, sendData };
}
