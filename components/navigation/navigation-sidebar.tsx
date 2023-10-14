import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import NavigationItem from "./navigation-item";
import NavigationAction from "./navigation-action";
import { ModeToggle } from "../mode-toggle";
import { UserButton } from "@clerk/nextjs";

interface Props {}

const NavigationSidebar = async (props: Props) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center gap-4 justify-between h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <div className="flex h-full flex-col space-y-4 ">
        <NavigationAction />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        <ScrollArea>
          {servers.map((server) => (
            <div key={server.id} className="mb-4">
              <NavigationItem
                id={server.id}
                imageUrl={server.imageUrl}
                name={server.name}
              />
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="pb-3 flex items-center flex-col mt-auto gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[36px] w-[36px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
