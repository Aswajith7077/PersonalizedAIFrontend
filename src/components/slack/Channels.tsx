import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOutletContext } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaHashtag } from "react-icons/fa6";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const getMessages = (id: string, setMessage) => {
  axios
    .get(`http://localhost:9000/slack/channel/${id}`)
    .then(res => {
      console.log(res);
      const result = res.data;
      result.reverse();
      setMessage(result);
    })
    .catch(err => {
      toast("Failed to Load Messages", { description: `${err}` });
    });
};

const getTodoMessages = (id: string, setMessage) => {
  axios
    .get(`http://localhost:9000/slack/suggest/${id}`)
    .then(res => {
      console.log(res);
      const result = res.data;
      result.reverse();
      setMessage(result);
    })
    .catch(err => {
      toast("Failed to Load Messages", { description: `${err}` });
    });
};

const searchTarget = (id: string, target: string, setMessage) => {
  axios
    .get(`http://localhost:9000/slack/search/${id}`, {
      params: {
        target: target
      }
    })
    .then(res => {
      console.log(res);
      const result = res.data;
      result.reverse();
      setMessage(result);
    })
    .catch(err => {
      toast("Failed to Load Messages", { description: `${err}` });
    });
};

const Channels = () => {
  const context = useOutletContext();
  const [message, setMessage] = useState<object[] | undefined>(undefined);
  const [target, setTarget] = useState<string>("");
  const [tasks, setTasks] = useState<string>("normal");

  useEffect(() => {
    getMessages(context.channel_id, setMessage);
  }, []);

  useEffect(
    () => {
      console.log("Messages : ", message);
    },
    [message]
  );

  useEffect(
    () => {
      console.log("Task : ", tasks);
      if (tasks === "todo") getTodoMessages(context.channel_id, setMessage);
      else getMessages(context.channel_id, setMessage);
    },
    [tasks]
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="flex w-full p-3 items-center space-x-2">
        <div className="flex flex-row w-2/3 gap-2">
          <Input
            type="text"
            placeholder="Search"
            className="w-4/5"
            onChange={e => setTarget(e.target.value ? e.target.value : target)}
          />
          <Button
            type="submit"
            className="w-1/5 cursor-pointer"
            onClick={() => {
              searchTarget(context.channel_id, target, setMessage);
            }}
          >
            Search
          </Button>
        </div>
        <Select onValueChange={e => setTasks(e)}>
          <SelectTrigger className="w-1/3">
            <SelectValue defaultChecked={true} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="normal">Normal Messages</SelectItem>
              <SelectItem value="todo">Todo Tasks</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="px-5 overflow-y-auto overflow-x-hidden w-full ">
        <div className="flex flex-row font-bold text-2xl items-center py-3 gap-3 mt-5">
          <FaHashtag size={24} />
          <h1>
            {context.channel_name}
          </h1>
        </div>
        <div className="flex flex-col gap-3 my-5 mx-5">
          {message &&
            message.length &&
            message.map((value, key) => {
              return (
                <Button key={key} variant={
                  'secondary'
                } className="flex justify-start w-fit">{value}</Button>
              );
            })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default Channels;
