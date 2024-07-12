"use client";

import { useState, useCallback } from "react";
import { generatePickupLine } from "@/actions/generate-pickup-line";
import logout from "@/actions/logout";
import Image from "next/image";
export default function PickupLineGenerator() {
  const [crush, setCrush] = useState("");
  const [style, setStyle] = useState("");
  const [result, setResult] = useState<{
    output1: string;
    output2: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedStates, setCopiedStates] = useState({
    output1: false,
    output2: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await generatePickupLine(crush, style);
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    }

    setLoading(false);
  };

  const normalizeText = (text: any): string => {
    if (typeof text !== "string") {
      text = String(text);
    }
    return text.replace(/,(?=[^\s])/g, "").replace(/(?<=\w)'(?=\w)/g, "'");
  };

  const copyToClipboard = useCallback(
    (text: any, outputKey: "output1" | "output2") => {
      const normalizedText = normalizeText(text);
      navigator.clipboard.writeText(normalizedText).then(
        () => {
          setCopiedStates((prev) => ({ ...prev, [outputKey]: true }));
          setTimeout(() => {
            setCopiedStates((prev) => ({ ...prev, [outputKey]: false }));
          }, 3000);
        },
        (err) => {
          console.error("Could not copy text: ", err);
        }
      );
    },
    []
  );

  return (
    <div className="min-h-screen w-full h-full text-[#FF2157] bg-white bg-opacity-90 py-6 flex flex-col justify-top lg:py-0">
      <div className="relative py-3 lg:max-w-screen-2xl lg:mx-auto">
        <div className="relative px-0 py-10 sm:rounded-3xl lg:p-5">
          <div className="w-auto lg:w-[90vw] mx-auto">
            <div className="relative flex items-center align-middle justify-center">
              <h1 className="text-4xl lg:text-[38px] font-normal mb-6 text-right">
                Pickup Line Generator
              </h1>
              <button
                className="absolute text-[26px] px-6 py-2 rounded-full -mt-3 text-[#B5002C] bg-[#B5002C] bg-opacity-10 top-[70vh] lg:top-0 lg:right-0"
                onClick={() => {
                  logout();
                }}
              >
                Signout
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative">
                <label
                  htmlFor="crush"
                  className="block text-[19px] font-medium text-[#A5455C]"
                >
                  {result ? "Your PickUp Line 1" : "Tell us about your crush"}
                </label>
                <textarea
                  id="crush"
                  value={result ? result.output2 : crush}
                  onChange={(e) => setCrush(e.target.value)}
                  placeholder="She is a 10 but.. He likes football...."
                  className="mt-1 block w-[80vw] lg:w-[80vh] h-[20vh] text-[19px] placeholder:opacity-40 tracking-tight resize-none border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
                {result && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.output2, "output2")}
                    className="absolute bottom-4 right-2 p-2 bg-[#FF2157] text-white rounded-lg hover:bg-opacity-80 focus:outline-none"
                  >
                    {copiedStates.output2 ? (
                      <Image
                        src="/assets/clipboard-fill.png"
                        color="white"
                        className=""
                        width={20}
                        height={20}
                        alt="google logo"
                      />
                    ) : (
                      <Image
                        src="/assets/clipboard-line.png"
                        color="white"
                        className=""
                        width={20}
                        height={20}
                        alt="google logo"
                      />
                    )}
                  </button>
                )}
              </div>
              <div className="relative">
                <label
                  htmlFor="style"
                  className="block text-[19px] font-medium text-[#A5455C]"
                >
                  {result ? "Your PickUp Line 2" : "Style (e.g., funny, witty)"}
                </label>
                <textarea
                  id="style"
                  value={result ? result.output1 : style}
                  onChange={(e) => setStyle(e.target.value)}
                  className={`mt-1 block border w-[80vw] lg:w-[80vh] ${
                    result ? "h-[20vh]" : "h-[8vh]"
                  }  text-[19px] tracking-tight resize-none border-gray-300 rounded-md shadow-sm p-2`}
                  required
                />
                {result && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(result.output1, "output1")}
                    className="absolute bottom-4 right-2 p-2 bg-[#FF2157] text-white rounded-lg hover:bg-opacity-80 focus:outline-none"
                  >
                    {copiedStates.output1 ? (
                      <Image
                        src="/assets/clipboard-fill.png"
                        color="white"
                        className=""
                        width={20}
                        height={20}
                        alt="google logo"
                      />
                    ) : (
                      <Image
                        src="/assets/clipboard-line.png"
                        color="white"
                        className=""
                        width={20}
                        height={20}
                        alt="google logo"
                      />
                    )}
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#FF2157] px-0 py-2 mt-12 w-[80vw] lg:w-[80vh] rounded-full text-[20px] text-white"
              >
                &#9829; {loading ? "Generating..." : "Generate Pickup Lines"}{" "}
                &#9829;
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
