---
tags: mk
---

# mk-microproject-cable-mapping-workbook


## mapping

### high level

- hub 1
    - gets all sources in
    - sends sources to ATEMs & recorders
- hub 2
    - gets sources from ATEMs and other hub (some by way of recorders?)
    - sends to screens and sends a couple of aux's back to hub 1
- a8k
    - main switcher


cables

- snakes
    - need to have 40 cable snake to middle of room with 20 in and 20 out
        - current red, green, blue snake gets inputs
        - send new 20 cable orange and purpel out sending outputs
    - small studio
        - two reds currently?
        - ultimately 4 existing 100' sending to HUB ins
        - then 4 new purple/orange sending from HUB outs
        - or just add these on to the 40 cable mid-room snake?
    - stage, table 3/4, music room
    - 10-20'
- need 20 cable to stage area (10 in and 10 out)

notes on numbers:
- 1 ft:
    - green = 2
    - red = 2
- 2 ft:
    - blue = 27
    - red = 34
    - green = 14
    - purple = 1
- 3ft:
    - black = 7
- 5 ft:
    - green = 1
- 6 ft:
    - red = 4
    - green = 3
- 10 ft:
    - blue = 2
    - red = 2
    - green = 2
    - black = 1
- 15 ft
    - green = 2
    - 
    

### unit by unit

- HUB 1 (on top)
    - 40 ins from direct sources
        - 26x ish = RGB cables from main studio all cameras from main studio tables (or just 20x to main snake)
            - 4x table
            - 4x computer
            - 4x table 1 and 2 main cams
            - 2x stage cams
            - 2x table 3 and 4 cams
            - 4x AppleTVs etc
        - 84x from other hub?
        - 4x++ utility from ATEMs
    - 40 outs mainly to atems and recorders
        - 4x to other hub
        - 8x to amxs.a for backup and audio
        - 20x to a8k
        - 8x to a4k
        - all displays in main studio
- A8K
    - 40 ins
    - 24 outs
- A4K
    - 
- AMXS
    - 8 ins
    - 1 usb out to web cam for lens studio
- HUB 2 (bottom)
    - 40 ins from ATEMs and recorders
        - 4x drops
        - 6x small studio corner
        - 8x from other side of Bok
        - 16x from ATEMs
    - 40 outs to screens and recorders
        - 24 to screens
        - 4 to recorders
        - 8 back to ATEMS

- ACHD2?
    - 20 ins
    - 12 outs

## recording zones

### control room hyperdeck stack

### control room amxs isos

### control room live stills & documentation

### small studio

### glass studio





### constellation ins and outs
* hub 1 outs into 4k in
    * blue 2' cables
    * 28 > 4k8
    * 27 > 4k7
    * 26 > 4k6
    * 25 > 4k5
    * 24 > 4k4
    * 23 > 4k3
    * 22 > 4k2
    * 21 > 4k1
* hub 1 outs into 8k in:
    * red 2' cables
    * 1 - 24 > 8k1 - 8k24
* hub 1 out to AMXS in:
    * hub 1 outs 29 - 36 > AMXS 
* hub 2 outputs 1 - 8:
    * green 2' cables
    * aux 1 - 4, me 1, me 2, multiview 1 and 2 > hub 2 outputs 1 - 8
* 8k to hub 2
    * blue 2' cables
    * outputs 9 - 24 > hub 2 inputs 9-24
* 8k to hub 2
    * red 2' cables
    * multiview 1 - 4 > hub 2 inputs 25 - 28
* hub 1 to hub 2
    * blue and green 3' cables
    * outputs 37 - 40 > inputs 37 - 40
* hub 2 to hub 1
    * black 3' cables
    * outputs 37 - 40 > inputs 37 - 40
* random 4 to hub 2 or other utility things


### hub 1 ins

node 1
13. red 308 to node 1
14. red rg6 ?? 342 
        - red rg6 ?? => hub 15
        - red 75 => hub 16
        - red 305 => hub 17
        - red 33 => hub 18
        - red 310 => hub 19
        - green 120 => hub 20
        - green 3_6 => hub 21 (call it 306?)
        - green 40 => hub 22
        - blue 301 => hub 23
        - blue 72 => hub 24 

node 2
  - red 309 => hub 25
        - red 311 => hub 26
        - red 193 => hub 27
        - green 39 => hub 28
        - green 339 => hub 29
        - green 194 => hub 30
        - blue 37 => hub 31
        - blue 300 => hub 32
node 3
    - 4 sources sent back to hub ins
        - red 67 => hub in 33
        - red 65 => hub in 34
        - blue 68 => hub in 35
        - blue 302 => hub 36
        

### hub 1 outs

1. red to a8k 1
2. red to a8k 2
3. red to a8k 3
4. red to a8k 4
5. red to a8k 5
6. red to a8k 6
7. red to a8k 7
8. red to a8k 8
9. red to a8k 9
10. red to a8k 10
11. red to a8k 11
12. red to a8k 12
13. red to a8k 13
14. red to a8k 14
15. red to a8k 15
16. red to a8k 16
17. red to a8k 17
18. red to a8k 18
19. red to a8k 19
20. red to a8k 20
21. blue to a4k 21
22. blue to a4k 22
23. blue to a4k 23
24. blue to a4k 24
25. blue to a4k 25
26. blue to a4k 26
27. blue to a4k 27
28. blue to a4k 28
29. red 313 to amxs1
30. red 202 to amxs2
31. red 318 to amxs3
32. red 194 to amxs4
33. red 217 to amxs5
34. red 343 to amxs6
35. red 201 to amxs7
36. red 314 to amxs8
37. blue going to hub 2 37
38. blue going to hub 2 38
39. green going to hub 2 39
40. green going to hub 2 40


### a4k ins

1. blue from hub 1 out 21
2. blue from hub 1 out 22
3. blue from hub 1 out 23
4. blue from hub 1 out 24
5. blue from hub 1 out 25
6. blue from hub 1 out 26
7. blue from hub 1 out 27
8. blue from hub 1 out 28




### a4k outs



aux 6: red going to a8k 38
pgm 1: red going to a8k 39
pvw 1: red going to a8k 40 


### a8k ins



38. red coming from a5k aux 6
39. red pgm 1 from a4k 
40. red pvw 1 from a4k

### a8k outs

### hub 2 ins

1. green ME1 from a4k
2. green ME2 from a4k
3. green MV1 from a4k
4. green Aux 1 from a4k
5. green Aux 2 from  a4k 
6. green Aux 3 from a4k
7. green aux 4 from a4k
8. green aux 5 from a4k
9. blue from a8k 9
10. blue from a8k 10
11. blue from a8k 11
12. blue from a8k 12
13. blue from a8k 13
14. blue from a8k 14
15. blue from a8k 15
16. blue from a8k 16
17. blue from a8k 17
18. blue from a8k 18
19. blue from a8k 19
20. blue from a8k 20
21. empty
22. empty
23. empty
24. empty
25. red from a8k mv1
26. red from a8k mv2
27. red from a8k mv3
28. red from a8k mv4
29. empty
30. empty
31. empty
32. empty
33. empty
34. empty
35. empty
36. empty
37. blue from hub 1 out 37
38. blue from hub 1 out 38
39. green from hub 1 out 39
40. green from hub 1 out 40


### hub 2 outs

1. 
2. 
36. temp testing to monitor
37. black going to hub in 37
38. black going to hub in 38
39. black going to hub in 39
40. black going to hub in 40




## cable notes


### main snake

already there

- xlr
    - 8-cable snake
    - blue
    - white
    - green
    - purple
- sdi
    - red (12)
        - 311
        - no number (rg6)
        - 193 (rg6)
        - 65 (rg6)
        - 67
        - no number (rg6)
        - 305
        - 309
        - 33
        - 310
        - 75
        - 308
    - green (6)
        - 40
        - 39
        - 339
        - 120
        - 194
        - 3_6
    - blue (6)
        - 68
        - 300
        - 37
        - 72
        - 302
        - 301
        - 259
    - orange (10)
    - purple (10)


## screens and sources

- 1
    - 3 computer (green)
    - 7 red
    - 2 blue
- 2
    - 3 computer (green)
    - 2 blue
    - 3 red
- 3
    - 2 red
    - 2 blue


### ideal sources & screens

- node 1 (main) . . . 41 max
    - TO HUB 1: sources (22 max without small studio)

        - subnode 1a: table
            - 4 cams on middle bar for tables
            - 2 overheads for T1
        - subnode 1b: stage
            - 2 cams for stage
        - subnode 1c: ethernet converters
        - subnode 2: table 2
        - subnode 3: wall/small studio

        - 2 overheads for T2
        - 1 on-table cam for T1
        - 1 on-table cam for T2
        - 4++ rolling cams
        - 2 computers for T1
        - 2 computers for T2
        - 2 aux for the puppet theatre corner
        - MAYBE small studio needs to go from here too
        - 
    - FROM HUB 2: screens (19 max without small studio)
        - 4x Ultrastudios/AMXs on tables
        - 8x confidence monitors for tables
        - 4x projectors on far wall/in puppet zone
        - 3x monitors across truss
        - 2x rolling monitors
        - 
- node 2 (small studio) 16 max
    - TO HUB 1: sources (10-12 tops)
        - 2 overheads
        - 2x in-room cams on ground/truss
        - 1 in-entry-way-corner-bts cam
        - cam 1 (M)
        - cam 2 (MCU)
        - cam 3 (ts-e)
        - 2 drops?
        - 2x ATEM PGM?
    - FROM HUB 2: screens & switcher-ins (4)
        - big projector
        - 3x into switcher
- node 3 (stage wall)
    - sources (10-ish)
        - 3 for table 3
        - 3 for table 4
        - 2 drops++
        - 1 computer for table 3
        - 1 computer for table 4
        - 
    - screens (8-ish)
        - 1 table 3
        - 1 table 4
        - 1 stage right
        - 1 stage left
        - 2 projectors
        - 
- node 4 (control room + music studio)
    - sources
        - 2x overheads
        - 2x control room cams
        - 2x computers
        - 2x++ music room cams
    - screens
        - 12x control room screens
        - 2x music room screens
- node 5 (other side of 50 church)
    - sources 
        - 10x cams
    - screens
        - 1x big screen
        - 10x screens



- node 1 (table 1 and truss center)
    - 12 orange and purple from hub outs
        - purple 1-10 come from hub 2 outs 1-10
        - orange 11-12
    - sources sent to hub ins
        - red 308 => hub 13
        - red rg6 ?? 342  => hub 14
        - red rg6 ?? => hub 15
        - red 75 => hub 16
        - red 305 => hub 17
        - red 33 => hub 18
        - red 310 => hub 19
        - green 120 => hub 20
        - green 3_6 => hub 21 (call it 306?)
        - green 40 => hub 22
        - blue 301 => hub 23
        - blue 72 => hub 24 

    - audio
        - 8 cable snake
        - white, green, blue, purple
- node 2 (table 2)
    - hub outs to table 24 orange and purple in from hub
        - orange 13
        - orange 14
        - orange 15
        - orange 16
    - sources sent back to hub ins
        - red 309 => hub 25
        - red 311 => hub 26
        - red 193 => hub 27
        - green 39 => hub 28
        - green 339 => hub 29
        - green 194 => hub 30
        - blue 37 => hub 31
        - blue 300 => hub 32
- node 3 (wall, puppet theatre, temp small studio)
    - 4 sources sent back to hub ins
        - red 67 => hub in 33
        - red 65 => hub in 34
        - blue 68 => hub in 35
        - blue 302 => hub 36
    - 4 purple and orange from hub outs
        - orange 17
        - orange 18
        - orange 19
        - orange 20



Hub outs
1. purple 1 (node 1)
2. purple 2 (node 1)
3. purple 3 (node 1)
4. purple 4 (node 1)
5. purple 5 (node 1)
6. purple 6 (node 1)
7. purple 7 (node 1)
8. purple 8 (node 1)
9. purple 9 (node 1)
10. purple 10 (node 1) 
11. orange 11 (node 1)
12. orange 12 (node 1)
13. orange 13 (node 2)
14. orange 14 (node 2)
15. orange 15 (node 2)
16. orange 16 (node 2)
17. orange 17 (node 3)
18. orange 18 (node 3)
19. orange 19 (node 3)
20. orange 20 (node 3)
21. ?
22. ?
23. ?
24. ?
25. ?
26. ?
27. ?
28. ?
29. ?
30. ?
31. ?
32. ?
33. ?
34. ?
35. ?
36. ?
37. ?
38. ?
39. ?
40. ?