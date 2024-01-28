import { NDKEvent, NDKFilter, NDKUser } from "@nostr-dev-kit/ndk";
import { NDKSingleton } from "./NDKSingleton";

export const getExplicitRelayUrls = async (
  ndk: NDKSingleton,
  user: NDKUser
) => {
  if (ndk.explicitRelayUrls?.length == 0) {
    ndk.explicitRelayUrls = [
      "wss://nos.lol",
      "wss://relay.damus.io",
      "wss://relay-jp.nostr.wirednet.jp",
      "wss://nostr-relay.nokotaro.com",
      "wss://nostr.holybea.com",
      "wss://nostr.fediverse.jp",
      "wss://yabu.me",
    ];

    const explicitRelayUrlsFilter: NDKFilter = {
      kinds: [10002],
      authors: [user.pubkey],
    };

    const explicitRelayUrlsEvent: NDKEvent | null = await ndk.fetchEvent(
      explicitRelayUrlsFilter
    );

    if (!explicitRelayUrlsEvent) {
      throw new Error("kind 10002 is not found.");
    }

    let explicitRelayUrls: string[] = [];
    for (const value of explicitRelayUrlsEvent.tags) {
      if (value[0] == "r") {
        explicitRelayUrls = [...explicitRelayUrls, value[1]];
      }
    }
    ndk.explicitRelayUrls = explicitRelayUrls;
  }
};
