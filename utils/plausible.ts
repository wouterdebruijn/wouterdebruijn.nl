const TARGET_DOMAIN = "wouterdebruijn.nl";

// Thanks to https://github.com/Schotsl

export default async (event = "pageview") => {
  const agent = window.navigator.userAgent;
  const width = window.innerWidth;
  const url = window.location.href;

  if (url.includes("localhost")) {
    console.log("Not sending event to Plausible on localhost.");
    return;
  }

  try {
    await fetch("https://plausible.hedium.nl/api/event", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": agent,
      },
      body: JSON.stringify({
        n: event,
        d: TARGET_DOMAIN,
        w: width,
        u: url,
      }),
    });
  } catch {
    console.log("Couldn't send event to Plausible.");
  }
};
