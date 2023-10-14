"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import useModalStore from "@/hooks/useModalStore";
import { ServerWithMembersAndProfiles } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import UserAvatar from "../user-avatar";
import {
  Check,
  Crown,
  MoreVertical,
  Shield,
  ShieldQuestion,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  DropdownMenuPortal,
  DropdownMenuSub,
} from "@radix-ui/react-dropdown-menu";

const MembersModal = () => {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const { isOpen, onClose, onOpen, type, data } = useModalStore();
  const isModalOpen = isOpen && type === "manageMembers";

  const { server } = data as { server: ServerWithMembersAndProfiles };

  const roleIconMap = {
    ADMIN: <Crown className="w-4 h-4" />,
    MODERATOR: <ShieldQuestion className="w-4 h-4" />,
    GUEST: <User className="w-4 h-4" />,
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black dark:bg-stone-800 dark:text-white overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center">
            Manage Members
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {server?.members?.length} members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-8 max-h-[420px] pr-6">
          {server?.members?.map((member) => (
            <div key={member.id} className="flex items-center gap-x-2 mb-6">
              <UserAvatar src={member.profile.imageUrl} />
              <div className="text-sm font-semibold space-y-1">
                <div className="flex gap-2 items-center">
                  {member.profile.name}
                  {roleIconMap[member.role]}
                </div>
                <p className="text-xs font-normal">{member.profile.email}</p>
              </div>
              {server.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-4 h-4 text-zinc-200" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <Shield className="h-4 w-4 mr-2" />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className="w-4 h-4 ml-auto" />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
            </div>
          ))}
        </ScrollArea>

        <div className="p-6"></div>
      </DialogContent>
    </Dialog>
  );
};

export default MembersModal;
