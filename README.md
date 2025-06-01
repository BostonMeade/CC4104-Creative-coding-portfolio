# CC4104-Creative-coding-portfolio

## An alternative visual way to represent a realtime clock - Spiral Clock
this is regular text
When choosing to do this experiment I was inspired by a whirlpool and how things get sucked in towards the centre. To replicate this movement I tried a number of methods, including incremental rotations of stationary lines, using sin and cos to get positions and other unsuccessful methods. During the development of the final clock I started from scratch rather then using my prototypes of the clock, I did this because the method used to create the spiral look required a different technical implimentation that wouldn't be easily addapted from previous versions. I finally settled on usings Sin and Cos to get coordinates for a individual point on the clock, then drawing a line between each one and rotating the entire spiral for other the other hands. The dots indicating time use easing to move from one coordinate to another by having the time act as the value of the array of coordinates. Hours had to be multiplied by 2.5 to match the other hands progress along the spiral. 
![image](https://github.com/user-attachments/assets/7fdc9b37-816e-4667-8c52-8d39c8b33406)
One of the main features I wanted to include that guided my actions was wanting to include easing into the clock hands, this was why I went with creating coordinates over just rotating a line and moving origin points. I wanted to have the clock slowly spin to mimic my idea of a whirlpool, for the reason I have a universal rotation applied to the begining of the draw function using framecount to ensure a consisted rotation.
When creating the visuals of the clock I decided to go simple with just having the lines change colour as they got closer to the centre. My main issue with the current clock is the lack of way to accuratly read the clock at the centre points and fact the the hours hand travels much further for each hour, but the clock is meant to be a alternative way of repesenting a real time clock and I believe that I have achieved this. 

[Run My Spiral Clock code](Spiral_clock_with_easing_2025_06_01_13_26_19/index.html)

## A city or landscape generator, with at least 3 distinct types of building or land - City Generator

[Run city generator Code](City_generator_3d_2025_06_01_13_31_57/index.html)

## one key game (two players) with a clear win state - Tron Game
(When speaking to Dave about the amount of keys I got told that we were allowed to use 2 keys per player)

[Run Tron Game Code](tron_game_2025_06_01_13_35_12/index.html)
