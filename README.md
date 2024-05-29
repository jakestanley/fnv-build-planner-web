# FNV Build Planner

Interactively plan a Fallout New Vegas character build. 

Originally started as a Python QT project, I decided this should instead be a simple enough web site which anybody can use without any setup.

I have a bunch of ideas for roleplay character builds in New Vegas but I haven't been able to find a character planner that meets my requirements. This is focused on selecting the perks and skills you want up front and guiding you into which stats and skills to invest to best flesh out your character in the game world.

# Roadmap

## Plan

- Add selected perks to character object

## Features

- Automatically set required skills and stats
- Progression plan; what skills to invest in at each level and order in which to take perks
- Option to select implants and other SPECIAL perks
- Filter based on installed DLCs
- Support for extra perks mods
- Save and load characters in session storage, exportable to JSON that can be imported for backups or sharing
    - Allow inputting back story

# Build and serve

```
npm install
npm run build
http-server dist
```

# Disclaimer

ChatGPT and AWS CodeWhisperer have been used extensively to create the skeleton for this project as I'm not a front end specialist but I'm confident its "influence" should be reduced as the project develops further and I become more familiar with the style.
