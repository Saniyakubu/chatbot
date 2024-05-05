import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import axios from "axios";
import { FormEventHandler, useState } from "react";

function App() {
  const [history, setHistory] = useState<any[]>([]);
  const [msg, setMsg] = useState(" ");
  const [loading, setLoading] = useState(false);

  const userMessage = [{ text: msg }];
  const sentMessage: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("https://chatbot-5thp.onrender.com/ask/ai", {
        history,
        message: msg,
      });

      const data = await res.data.text;
      if (data) {
        setHistory((prev: any) => [
          ...prev,
          {
            role: "user",
            parts: userMessage,
          },
          {
            role: "model",
            parts: [{ text: data }],
          },
        ]);
      }
      setMsg(" ");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setMsg(" ");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center h-screen">
      <main className="grid gap-4 overflow-auto w-[90%] lg:w-[60%] mx-auto">
        <div className="relative flex flex-col justify-between p-4 border h-[700px] rounded-xl bg-muted/50">
          <Badge variant="outline" className="absolute right-3 top-3">
            Output
          </Badge>
          <ul className="flex flex-col gap-5 p-5 pb-16 mb-20">
            {history.map((text: any, index) => {
              return (
                <>
                  {text.role === "user" ? (
                    <li key={index} className="flex flex-row">
                      <div className="flex p-4 shadow-md rounded-xl bg-background">
                        <p className="text-primary">{text.parts[0].text}</p>
                      </div>
                    </li>
                  ) : (
                    <li key={index} className="flex">
                      <div className="flex w-3/4 p-4 shadow-md rounded-xl">
                        <p className="text-primary">
                          <span className="font-bold">{text.role}: </span>
                          {text.parts[0].text}
                        </p>
                      </div>
                    </li>
                  )}
                </>
              );
            })}
          </ul>
          <div className="bg-background">
            <form
              onSubmit={sentMessage}
              className="overflow-hidden rounded-lg bg-background focus-within:ring-1 focus-within:ring-ring"
              x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type your message here..."
                className="p-3 border-0 shadow-none resize-none min-h-12 focus-visible:ring-0"
              />
              <div className="flex items-center p-3 pt-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  disabled={!!loading}
                  type="submit"
                  size="sm"
                  className="ml-auto gap-1.5"
                >
                  {loading ? "Loading..." : "Send"}
                  <CornerDownLeft className="size-3.5" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
