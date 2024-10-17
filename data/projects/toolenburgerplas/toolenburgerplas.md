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
published: true
---

# Introduction

The Toolenburgerplas is a recreational lake in Hoofddorp, The Netherlands, known
for swimming, diving, and fishing. My friend
[Sjors van Holst](https://sjorsvanholst.nl) and I began regularly swimming in
the lake once a week for both exercise and relaxation. While the water was
pleasant in the summer, winter brought colder temperatures, and we eventually
turned to the local swimming pool. However, it wasn’t the same—the water was too
warm, and the pool was crowded. We decided to continue swimming in the lake
during the colder months by purchasing wetsuits, but even that solution had
limits as the water eventually became too cold. We paused swimming each winter,
waiting for the water to warm up in spring. This led to the recurring question:
"Can we swim in the Toolenburgerplas yet?"

# The Spark of an Idea

Wouldn’t it be useful to know the exact temperature of the lake year-round? This
simple idea led us to brainstorm a system that could monitor the lake's water
temperature remotely. If we could track the water temperature, we would know
precisely when it was warm enough to swim again. And why stop there? Making the
data accessible to others who enjoy the lake could benefit the broader
community. Our goal was to build a device that could measure the lake's water
temperature continuously and display the data online for anyone to access.

# Designing the Solution

We began exploring how we could implement this idea. The core requirements were:

- A reliable temperature sensor to measure the water temperature year-round.
- A microcontroller to process the sensor data.
- A data connection to send the information to a server where it could be stored
  and accessed.

The plan was to display the data on a website for easy access, showing both
current temperatures and trends over time.

# Building the Prototype

We chose the
[Arduino MKR NB 1500](https://docs.arduino.cc/hardware/mkr-nb-1500/) as the
microcontroller and purchased two temperature sensors—one for the water and one
for internal enclosure temperature monitoring. The device needed a waterproof
enclosure to protect the electronics while allowing part of it (e.g., the
antenna) to remain above water for connectivity.

### Power Source and Efficiency

To ensure the device could operate for extended periods, we used four 18650
batteries in parallel, charged by a wireless charging coil inside the enclosure.
To conserve power, we programmed the Arduino to "sleep" most of the time, only
waking up hourly to take measurements and send data. This approach worked well,
allowing the device to last over a month on a single charge.

### Software and Website

While I focused on the electronics and code, [Sjors](https://sjorsvanholst.nl)
developed the [website](https://toolenburgerplas.nl/) to display the temperature
data. The site, built using [Next.js](https://nextjs.org), is hosted on
[Vercel](https://vercel.com) and shows current water temperatures along with a
graph illustrating temperature trends over time. We stored the data on
[Supabase](https://supabase.io).

![Getting the electronics together](hardware.webp)

### API Challenges

We encountered challenges with API security because the Arduino had limited
support for SSL certificates. To solve this, I set up an Nginx reverse proxy on
a VPS to handle SSL termination, forwarding requests securely to the Supabase
API. Using Let's Encrypt, I ensured the certificates would renew automatically.
To optimize wake-up times, I removed unnecessary root certificates, leaving only
ISRG Root X1, which is valid until 2035—hopefully, the hardware lasts that long!

# Overcoming Challenges

We encountered a few issues during the project. The biggest concern was ensuring
the enclosure was watertight, but initial tests showed no signs of leaks.
However, after a month and a half of successful operation, the device stopped
sending data.

### Corrosion and Enclosure Problems

Upon inspection, we discovered that the antenna, placed outside the enclosure,
had corroded due to exposure to the elements. Initially, we suspected moisture
inside the enclosure, but after breaking the seal, we found that the interior
was completely dry. However, with the seal broken, the device could no longer be
submerged.

### Solution: New Enclosure Design

We redesigned the enclosure to place the antenna in a sealed compartment,
keeping it protected from rainwater while maintaining connectivity. This
modification has worked well, and the device has been operating without issues
since then.

# Next Steps

(Add content here)

# Future Improvements

(Add content here)
