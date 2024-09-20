---
title: Toolenburgerplas.nl
description: Creating a temperature monitoring system for the Toolenburgerplas in Hoofddorp, The Netherlands.
tags:
  - website
  - development
  - toolenburgerplas
  - iot
  - ardunio
  - nextjs
  - c++
  - hardware
cover: hardware.webp
created: 2024-06-21
updated: 2024-06-21
published: false
---

# How it all started

The Toolenburgerplas is a lake in Hoofddorp, The Netherlands. The lake is used
for recreational purposes and is a popular spot for swimming, diving, and
fishing. Me and my friend [Sjors van Holst](https://sjorsvanholst.nl) have been
in the habit of swimming in the lake about once a week, because it makes for
great exercise and relaxation. In the summer months the water temperature is
quite nice, when the water got colder in the winter months, we tried out the
local swimming pool. But it was not the same, the water was too warm and the
pool was too crowded.

We made the choice to buy a wetsuit and continue swimming in the lake, but of
course even that had its limits, at some point the water would be too cold to
swim in. So in the winter months we would take a break from swimming, until the
water temperature would rise again in the spring. But when exactly would that
be? When could we start swimming again, "Can we swim in the toolenburgerplas?"
was a question we would ask ourselves every week.

# The idea

We thought it would be great to have some sort of temperature monitoring system
for the lake. We needed something to measure the water temperature year round,
even when we were not swimming. Some sort of device that would measure the
temperature of the water and report it to us. We could then use this data to
determine when the water was warm enough to swim in again. And while we were at
it, we would make the data available to everyone, so that other people could
also benefit from it.

So we started brainstorming about how we could make this happen. We needed a
temperature sensor, microcontroller and some sort of data connection. Then the
data would be recorded and stored somewhere on the web for us to display on a
website.

# The implementation

We bought a [Arduino MKR NB 1500](https://docs.arduino.cc/hardware/mkr-nb-1500/)
and two temperature sensors. One to measure the internal temperature within the
enclosure and one to measure the water temperature. We wanted to make a
submersible device hidden under the water, so we needed a waterproof enclosure.
But we also needed connectivity, so not the entire device could be submerged.

Then for a power source we ended up using four 18650 batteries in parallel,
which would be charged by a wireless charging coil placed inside the enclosure.
To conserve power we would put the device to sleep most of the time, only waking
it up every hour to take a measurement and send it to the server. This eneded up
being a great success, as the device would last for over a month on a single
charge.

I started working on getting the electronics together as well as writing the
code for the microcontroller. [Sjors](https://sjorsvanholst.nl) started working
on the [website](https://toolenburgerplas.nl/), which would display the data. We
used [Next.js](https://nextjs.org) for the website, which would be hosted on
[Vercel](https://vercel.com). The website would display the current temperature,
as well as a graph of the temperature over time. The temperature data is stored
on [Supabase](https://supabase.io).

![Getting the electronics together](hardware.webp)

I discovered some possible problems that came with using external parties for
hosting the API endpoint, because the Arduino has limited support for SSL
certificates. I ended up creating a Nginx reverse proxy on a VPS to handle the
SSL termination and forward the requests to the Supabase API. The certificate is
requested from Let's Encrypt and renewed automatically. For improvements in
wake-up times I ended up removing a lot of the default root certificates that
came with the [MKRNB](https://www.arduino.cc/reference/en/libraries/mkrnb/)
library, only leaving ISRG Root X1, which will expire in 2035. But I would be
extremely happy if the hardware survived that long.

# The problems

We encountered some problems along the way, were unsure if the enclosure would
be watertight, but that turned out the be fine. However, the antenna on the
outside of the enclosure ended up being a problem. After about one and a half
months the device stopped sending data.

We removed the device and found that the antenna had started to corrode, which
was most likely the cause of the problem. However, because of high internal
humidity levels, we suspected that the enclosure failed. After opening the
enclosure and breaking the seal, we found that the inside was completely dry.

Now that the seal was broken, we could not submerge the device anymore. We had
to create a new enclosure, also fixing the antenna problem. We ended up creating
a new enclosure where the antenna was placed inside of a sealed compartment,
sealing it off from any rainwater. This is the current setup and it has been
working great since then, the website is available at
[toolenburgerplas.nl](https://toolenburgerplas.nl).
