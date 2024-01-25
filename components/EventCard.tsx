import { NDKEvent } from "@nostr-dev-kit/ndk";
import Link from "next/link";

export default function EventCard({ event }: { event: NDKEvent }) {
  const created_at = event.created_at || 0;
  const dateTime = new Date(created_at * 1000);
  return (
    <Link
      href={`/post/${event.id}`}
      className="block w-full p-4 rounded-2xl border-2 border-neutral-200 space-y-4 hover:bg-neutral-200"
    >
      <p>{event.content}</p>
      <p className="text-neutral-500">{dateTime.toLocaleDateString()}</p>
    </Link>
  );
}
