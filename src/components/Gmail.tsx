import { ScrollArea } from "./ui/scroll-area";
import {
  Card,
  CardDescription,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";
import { Dispatch } from "react";
import { SetStateAction } from "react";
import config from '/config/Config';
import { Separator } from "@/components/ui/separator";


const handleLogs = (isLogged:boolean,setIsLogged,setEmail,setContent) => {
  if(isLogged){
    axios
      .get("http://localhost:9000/gmail/logout")
      .then(res => {
        console.log(res);
        setEmail(undefined);
        setContent(undefined);
        setIsLogged(false)
      })
      .catch(err => {
        console.log(err);
      });
  }else{
    axios
      .get("http://localhost:9000/gmail/authenticate")
      .then(res => {
        console.log(res);
        setIsLogged(true);
      })
      .catch(err => {
        console.log(err);
      });
  }
  
}


const authenticate = () => {
  axios.get("http://localhost:9000/gmail/authenticate")
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err)
    })
}


const getEmails = (
  email: string[] | undefined,
  setEmail: Dispatch<SetStateAction<string[] | undefined>>
) => {
  console.log('Config : ',config);
  axios
    .get(config.GET_EMAIL_URL)
    .then(res => {
      setEmail(res.data);
    })
    .catch((error: unknown) => {
      console.log(error);
      toast("There is an error in the code", { description: `${error}` });
    });
};

const getBody = (thread_id:string,setContent) => {
  axios
    .get(config.GET_BODY_URL + `?thread_id=${thread_id}`)
    .then(res => {
      setContent(res.data[0]);
    })
    .catch((error: unknown) => {
      console.log(error);
      toast("Failed to Fetch Body", { description: `${error}` });
    });
};

type MyCardsProps = {
  data: any;
  index: number;
  currentMail: number | undefined;
  setCurrentMail: (prev: number) => void;
  className: string;
};

const MyCards = ({ data, index, currentMail, setCurrentMail, className }) => {
  const tags = ["Urgent", "Business", "Important"];

  return (
    <Card
      className={`w-full cursor-pointer my-4 ${className}`}
      onClick={() => setCurrentMail(index)}
    >
      <CardHeader>
        <CardTitle className="text-lg">
          {data.from}
        </CardTitle>
        <CardDescription>
          {data.summary ? data.summary : data.subject}
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-5">
        <Badge className="py-2 px-4 mx-1" variant="secondary">
          {data.category}
        </Badge>
      </CardContent>
    </Card>
  );
};

const Gmail = () => {
  const [isLogged,setIsLogged] = useState<boolean>(false);
  const [email, setEmail] = useState<string[] | undefined>(undefined);
  const [currentMail, setCurrentMail] = useState<number | undefined>(undefined);
  const [content, setContent] = useState<object | undefined>(undefined);


  useEffect(() => {
    console.log(content);
  },[content])

  useEffect(() => {
    if(isLogged){
      getEmails(email,setEmail);
    }
  },[isLogged])


  useEffect(
    () => {
      if(email === undefined || currentMail === undefined)
        return;
      getBody(email[currentMail].thread_id, setContent);
    },
    [currentMail]
  );

  return <>
      <div className="flex flex-col w-1/3 h-screen">
        <div className="flex justify-end p-4 ">
          <Button variant={isLogged ? "destructive" : "default"} className="cursor-pointer" onClick={() => handleLogs(isLogged,setIsLogged,setEmail,setContent)}>
            {isLogged ? 'Logout' : 'Login'}
          </Button>
        </div>
        <ScrollArea className=" gap-4 border rounded-md px-4 text-sm">
          {!email && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v, k) => {
              return <div key={k} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 my-5 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>;
            })}
          {email && email.map((value, key) => {
              return <MyCards key={key} index={key} data={value} setCurrentMail={setCurrentMail} className={currentMail === key ? "bg-slate-700" : ""} />;
            })}
        </ScrollArea>
      </div>
      <section className="flex flex-col w-2/3">
        <div className="h-screen w-full border">
          <Card className={`w-full cursor-pointer border-none h-1/2`}>
            {content && <CardHeader>
                <CardTitle className="text-lg">
                  {content.from}
                </CardTitle>
                <CardDescription>
                  <div>
                    <h1>To: </h1>
                    <p>
                      {content.to}
                    </p>
                  </div>
                </CardDescription>
              </CardHeader>}
            {content && <CardContent className="gap-5">
                <Badge className="py-2 mb-10 px-4 mx-1" variant="secondary">
                  {content.category}
                </Badge>
                <div className="flex flex-row  items-center gap-5 mb-7">
                  <h1 className="font-bold text-lg">Subject</h1>
                  <p>
                    {content.subject ? content.subject : "No Subject"}
                  </p>
                </div>
                {content.body}
              </CardContent>}
            {content && <CardFooter>
                <h1 className="font-semibold mr-2">
                  {"Time Stamp : "}
                </h1>
                {content.date}
              </CardFooter>}
          </Card>
          <Separator />
          <Card className="h-1/2 border-none">
            {content && <CardContent className="gap-5">
                <div className="flex flex-col items-center gap-5 mb-10">
                  <h1 className="w-full font-semibold text-left text-xl">Summary of the Email</h1>
                  <p className="w-full">
                    {content.summary}
                  </p>
                </div>
                <div className="flex flex-col items-center gap-5">
                  <h1 className="w-full text-left font-semibold text-xl">Suggested Reply</h1>
                  <p className="w-full">
                    {content.suggested_reply}
                  </p>
                </div>
              </CardContent>}
          </Card>
        </div>
        <Toaster />
      </section>
    </>
};

export default Gmail;
