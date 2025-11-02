import { useEffect, useRef, useState, useCallback } from "react";


type Notification = {
    title: string,
    message:string,
    conversation_name:string,
}

export function useNotification(user_id:string){

    const [data, setData] = useState<Notification[]>()
    const wsRef = useRef<WebSocket | null>(null)

    const connect = useCallback(()=> {
        const token = localStorage.getItem("accessToken");
        const backendHost = "localhost:8000";
        const protocol = window.location.protocol === "https:" ? "wss" : "ws";
        const url = `${protocol}://${backendHost}/ws/notifications/${user_id}/?token=${token}`;
        const ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("Notification WebSocket open");
        };

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "notification") {
                setData(data);
            }
            console.log(data)
        };

        ws.onclose = (ev) => {
            console.log("Notification WebSocket closed", ev.code, ev.reason);
        };

        ws.onerror = (err) => {
            console.error("WebSocket error", err);
        };

    }, [user_id])


    useEffect(() => {
        connect();
        return () => {
            wsRef.current?.close();
        }
    },[connect])


    return {data}
}