import { CornerDownLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormEventHandler, useState } from "react";
import axios from "axios";

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
    <main className="gap-4 w-[90%] lg:w-[60%] mx-auto">
      <div className="relative w-full p-4 border mt-5 h-[700px] rounded-xl bg-muted/50">
        <Badge variant="outline" className="absolute right-3 top-3">
          Output
        </Badge>
        <ul className="flex flex-col h-full gap-5 p-5 pb-16 mb-20 overflow-y-scroll">
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
      </div>
      <div className="fixed lg:w-[60%] mx-auto bottom-5 left-0 right-0">
        <form
          onSubmit={sentMessage}
          className="w-full overflow-hidden rounded-lg bg-muted/50 focus-within:ring-1 focus-within:ring-ring"
        >
          <Label htmlFor="message" className="sr-only">
            Message
          </Label>
          <div className="flex items-center ">
            <Textarea
              id="message"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              placeholder="Type your message here..."
              className="h-full p-3 text-xl text-black border-0 shadow-none resize-none bg-slate-300 min-h-12 focus-visible:ring-0"
            />
            <Button
              disabled={!!loading}
              type="submit"
              className="ml-auto h-[75px] gap-1.5"
            >
              {loading ? "Loading..." : "Send"}
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default App;
