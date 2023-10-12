import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const InitialModal = dynamic(() => import("@/components/modals/initial-modal"), { ssr: false }) //<- set SSr to false

const SetupPage = async () => {
  const profile = await initialProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return (
    <div>
        <InitialModal />
    </div>
  );
};

export default SetupPage;
