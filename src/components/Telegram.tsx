import React from 'react'
import { ScrollArea } from "./ui/scroll-area";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Outlet, useNavigate } from "react-router-dom";
import { Toaster } from '@/components/ui/sonner';


const getGroupChats = async (setChats) => {
  console.log("getGroupChats");
  axios
    .get("http://localhost:9000/telegram/group_chats") // Adjust the API endpoint to fetch Telegram chats
    .then((res) => {
      console.log(res.data);
      setChats(res.data);
    })
    .catch((err) => {
      toast("Failed to Load Group Chats", { description: `${err}` });
    });
};

const Telegram = () => {
  const [chats, setChats] = useState<object[] | undefined>(undefined);
  const [context, setContext] = useState(undefined);
  const navigate = useNavigate();

  const handleNavigate = useCallback((route: string) => navigate(route), [
    navigate,
  ]);

  useEffect(() => {
    console.log(chats);
    if (chats) return;
      getGroupChats(setChats);
  }, []);   

  useEffect( () => {
    console.log(chats);
  },[chats])

  return (
    <>
      <div className="flex flex-col w-1/2 h-screen">
        <div className="flex flex-row w-full items-end p-3 justify-end">
          <Button>Login</Button> 
        </div>

        <div className="flex flex-row items-center gap-2 px-5">
          <h1 className="font-bold text-2xl">Telegram Groups </h1>
        </div>
        <div className="flex flex-row items-center gap-2 px-5 py-2">
          <h3 className="font-bold text-xl">SurveySparrow Hackathon </h3>
        </div>

        <ScrollArea className="flex flex-col h-3/5 gap-3 py-5 px-4">
          <div className="flex flex-col gap-3 my-5 mx-5">
            {chats &&
              chats.length &&
              chats.map((value, key) => {
                return (
                  <div 
                    key={key} 
                    variant={'secondary'}
                    className="border rounded-lg p-4 bg-gray-900 shadow-md w-full"
                  >
                    <p className="text-left whitespace-pre-line">{value}</p>
                  </div>
                );
            })}
          </div>
        </ScrollArea>
        <Separator className="mb-7" />

        <div className="flex flex-col gap-3 h-1/2 px-7">
        {chats && <Button
            variant="outline"
            className="py-7 cursor-pointer text-base w-full"
            onClick={() => {
              if (chats && chats.length > 0) {
                setContext({ chats: chats });
                handleNavigate("summary");
              } else {
                toast("No chats available to summarize.");
              }
            }}
          >
            Provide Summary
          </Button>}
        </div>
      </div>
      <section className="w-1/2 h-screen border">
        <Outlet context={context} />
        <Toaster />
      </section>
    </>
  );
};

export default Telegram;
