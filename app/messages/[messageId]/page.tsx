import React from "react";
import TopNav from "@/components/nav/TopNav";
import MessageForm from "@/components/messageComp/MessageForm";
import { getAUserMessage } from "@/actions/messageAction";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { relativeDateFn } from "@/lib/fn";

export default async function Page({
  params,
}: {
  params: Promise<{ messageId: string }>;
}) {
  const messageId = (await params).messageId;
  const user = await currentUser();

  const msg = await getAUserMessage(messageId);

  if ("error" in msg!) {
    return <div>Error: {msg.error}</div>;
  }

  console.log(msg);

  const combinedMessages = [
    ...(msg.receiver?.receivedMessages || []).map((message) => ({
      ...message,
      type: "received",
    })),
    ...(msg.receiver?.sentMessages || []).map((message) => ({
      ...message,
      type: "sent",
    })),
  ];

  const sortedMessages = combinedMessages.sort(
    (a, b) => new Date(a.sentAt).getTime() - new Date(b.sentAt).getTime()
  );

  console.log("Sorted Combined Messages:", sortedMessages);

  return (
    <div className="flex flex-col justify-between bg-white min-h-dvh">
      <TopNav />
      <div className="flex flex-col gap-8 p-5 h-full">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={msg.receiver?.image || ""}
            alt={msg.receiver?.name || ""}
            className="rounded-full w-24 h-24 object-cover"
            width={500}
            height={500}
          />
          <p className="font-semibold">{msg.receiver?.name}</p>
        </div>

        <div className="flex flex-col gap-4">
          {sortedMessages.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col gap-2 max-w-fit w-11/12 rounded-xl bg-orange-50 ${
                item.senderId === user?.id
                  ? "self-end rounded-tr-none"
                  : "rounded-tl-none"
              } shadow p-4`}
            >
              <p className="text-gray-600 text-sm">{item.content}</p>
              <p className="text-gray-500 text-sm">
                {relativeDateFn(item.sentAt)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <MessageForm recieverId={messageId} />
      </div>
    </div>
  );
}
