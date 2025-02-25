import { ScrollArea } from "./ui/scroll-area";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FaHashtag } from "react-icons/fa6";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Outlet, useNavigate } from "react-router-dom";

const getChannels = (setChannels) => {
  axios
    .get("http://localhost:9000/slack/channels")
    .then(res => {
      console.log(res.data);
      setChannels(res.data);
    })
    .catch(err => {
      toast("Failed to Load Channels", { description: `${err}` });
    });
};

const Slack = () => {
  const [channels, setChannels] = useState<object[] | undefined>(undefined);
  const [context, setContext] = useState(undefined);
  const navigate = useNavigate();

  // const handleGetChannels = useCallback(
  //   setChannels => getChannels(setChannels),
  //   [getChannels]
  // );
  const handleNavigate = useCallback((route: string) => navigate(route), [
    navigate
  ]);

  useEffect(() => {
    console.log('UseEffect : ',channels)
    if (channels !== undefined) return; // Prevent re-fetching if data is already set
    getChannels(setChannels);
  }, []);


  return (
    <>
      <div className="flex flex-col w-1/3 h-screen">
        <div className="flex flex-row w-full items-end p-3 justify-end">
          <Button>Login</Button>
        </div>

        <div className="flex flex-row items-center gap-2 px-5">
          <FaHashtag size={24} />
          <h1 className="font-bold text-2xl">Channels</h1>
        </div>

        <ScrollArea className="flex flex-col h-1/2 gap-3 py-5 px-4">
          {channels &&
            channels.length &&
            channels.map((value: object, key: number) => {
              return (
                <Button
                  key={key}
                  variant={"ghost"}
                  className="w-full text-md text-left py-5 justify-start px-10 cursor-pointer"
                  onClick={() => {
                    setContext({
                      channel_id: value.id,
                      channel_name: value.name
                    });
                    handleNavigate("channel");
                  }}
                >
                  {value.name}
                </Button>
              );
            })}
        </ScrollArea>
        <Separator className="mb-7" />

        <div className="flex flex-col gap-3 h-1/2 px-7">
          <Button
            variant="outline"
            className="py-7 cursor-pointer text-base w-full"
            onClick={() => {
              setContext({ channels: channels });
              handleNavigate("summary");
            }}
          >
            Provide Summary
          </Button>
          <Button
            variant="outline"
            className="py-7 cursor-pointer text-base w-full"
            onClick={() => handleNavigate("daily_digest")}
          >
            Daily Digest
          </Button>
        </div>
      </div>
      <section className="w-2/3 h-screen border">
        <Outlet context={context} />
      </section>
    </>
  );
};

export default Slack;
