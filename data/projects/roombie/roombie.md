---
title: Roombie
description: A mini robotic vacuum cleaner for cleaning the top of your robotic vacuum cleaner (or your desk!).
tags:
  - roombie
  - robot
  - hardware
  - vacuum
  - gift
  - diy
  - electronics
  - 3d-printing
  - arduino
cover: cover.webp
created: 2025-04-12
updated: 2026-04-16
published: true
---

# Why?
So, you might know that robotic vacuum cleaners are awesome, they run around cleaning your house. But of course, they can't get to all the places. For some people this is a reason not to get a robot vacuum, which I think is invalid. Even though it doesn't get everywhere, it can still do something, and its a robot that cleans for you! Who cares if it is not efficient.

Anyhow, there is one place that does bother me. Because I love these things, I want to take good care of it. But the top of the robot vacuum gets dirty. And of course, I can dust that of myself. But then I am just a servant to my machine. That didn't sit right with me.

This was a bit of a joke between me and two of my friends, Ianthe and Sjors. 

# Version 1
I made the first version of the mini roomba back in 2022 for Ianthe her birthday. She is a great friend of mine that, at the time, was still completing her studies as an industrial designer. This mini roomba did exactly nothing a regular roomba does. It didn't vacuum, mop, clean in any meaningful way, or even just drive around. It was made from cardboard and didn't have any motors or cleaning brushes.

But what it did have was emotion, it had two eyes with a eyelash mechanism behind it, behind that were two LEDs. It was more of a tamagotchi, there were a couple of buttons on the side that gave it food, making it happy. If you didn't interact with it for a little while, it would get sad or angry. The eyelashes move up or down changing the size and form of the eyes, indicating its emotion.

![Current Picture of Roombie v0](roombie-0.webp)

As I mentioned, this one was made from cardboard. The eyelash mechanism was made from cardstock with splitpins used to make the hingepoints, there was a Arduino Pro Micro controlling a servo, two leds and listening for user input from the buttons. Looking back, it was quite crude and simple, but it was a great project and made for a nice personal gift.

# Version 2
At the end of 2024, Ianthe send me a picture of Sjors his roomba, asking if we could make a mini roomba for his birthday coming up in March. I replied saying "Yes, thats gonna take some crafty work and effort, but I love the idea!" 

## Making it drive
We didn't have much of a plan yet, but I started of ordering some small motors and motor drivers. I bought some DRV8833 motor drivers, together with some small geared motors with a speed of 40 RPM. I didn't do any calculations at the time, but I just guessed that I didn't want to drive to fast, and the motors were quite cheap, so buying some other ones later wouldn't be a problem if the speed wasn't right. 


I started testing some of the electronics, while Ianthe started thinking about the design of the Roomba. Instead of cardboard, this one was going to be 3D printed. So we started working together on a CAD model, with Ianthes actual degree in industrial design, and my hobbyist approach to anything 3D printing related, we had an absolute blast designing the thing.

<Section> 
![The motors arrived](motors.webp)
<Video src="motor-test-web" />
</Section>

One of the elements I focused on where the new and improved eye lashes, as I created these before in the cardboard version. The idea was quite similar, but this time it would be 3D printed. So I had to design it in CAD. At this point I had design quite a lot of static parts before, but I never modulated these parts into an assembly testing out movement or rotation. As I wasn't about to do any calculations figuring out the correct angles or lengths to use. I started learning to use my parts in assemblies and adding joints to them to make them behave how I envisioned to. This worked quite well, and after some tweaking, I had the basic eye design figured out, apart for the location of the servo that was going to actually move the parts.
<Video src="eyelashes-design-web" />

<Video src="motor-test-web" />

While I worked on the eye design, Ianthe continued on the design of the overall body and internals. We decided on the position of the motors and brushes, where we needed to make sure that the cliff sensor positions would be forward enough to register before driving off, as well as keeping them away from the spinning brushes. For this, we ended up placing two sets of cliff sensors. Two at the front, and two just before the rear wheels. As the sensors in front can't see a cliff approaching from the side. We also modeled in a small ledge on the inside, onto which we could place a internal plate to mount some more electronics.

<MediaStack>
<Image src="roombie-design-1.webp" />
<Image src="roombie-design-2.webp" />
<Image src="roombie-design-3.webp" />
<Image src="roombie-design-4.webp" />
</MediaStack>