# mk-today

think of this 5-10 year arc for the LL as bigger than the first one. 


- [mk-unreal-notes-20230536](/x_HOkTWYS76xtcMJaKWPcg)
- [the-summer-of-ai-book](https://hackmd.io/@ll-summer-23/rJkfu1l83/%2FxYRm2qbSQz2n5fg8B8cbkQ)

## summer projects

### webLab
- begin [Summer Project: mk-next-moves](/5oAbeYOHTJSXiuBkphrXHg)
    - start as 1001-next-moves, then this becomes the-moves?
- other nexts
    - ll-all-time-gallery [mk-sproject-gallery](/Kj5jsQLUSH2-3U8ktewjJw)
    - the-resources (tailwind)
    - the-menu (tailwind?)
    - the-show (tailwind)
    - 

### studioLab
- start thinking about a summer studio project
    - one for next week
    - one for the longer term
- things
    - harness time of day
    - better chroma---and send mattes all over the place
    - integrate with realtime innovations (both Unreal and Unity)
    - 
- 


### realityLab
- unreal learning project (connecting to the studio)
- including some AR/XR element


### aiLab

- work on Sabrina's content/slides
- think about Python workflows


### graphicdesignLab

- print emphasis
    - booklets, etc
- InDesign

# mk-today


## today

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F05A2HJV5QE/the-wall-003-sm.jpg?pub_secret=e8c3284e87)



## 15

- nextjs tutorial and materials for codeLab-23
- `/slaunch` and `/slog` and `sshow` activities
- slaunch, sshow, slog
- 

## pre-15

stuff to integrate at the bottom of this doc.
[mk-wishlist-for-20230510](/shTb0OliRfi3UcjJv47LhA)


- [fireship on google sheet backend](https://fireship.io/lessons/google-sheets-database-nextjs/)
- react-compare-image
- unreal
- blender geo-nodes
- post each day
- all cams to 1080 except EF-mount at 4K?
- use c200s?
- zones
    - classroom
    - small studio
    - control room
    - glass studio
    - music studio
    - open office space
    - mk office
    - brick room
    - main studio 
        - green screen
        - main shelves
        - theatre truss
        - diagonal
        - 

## 06

- xml in studio?
- modals in studio
- ultimatte?
- next
- 

## 05

- taught next
-

## 04

- get transcription into Airtable
- slice transcription and match with start/stop sequences in airtable
- modal for a "session" or take

worked on hair
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F056A3DS20K/mk-test-001.jpg?pub_secret=0954ec3292)


### options
- fire blender scripts from ll-studio-bot-23?
- create AI script repo?
- front-end day?
- 


## 03
- [long interview on projects](/QfEpnNoCQySlHWEtV7nvZA)
- improvements to script


![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F056GCJP9Q9/mk-test-009.jpg?pub_secret=5e03468049)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0560F0NVHB/mk-test-005.jpg?pub_secret=081b57e51b)



## 02

made
- some pngs.
- this script

```
import bpy
import os
import math
import random

print("starting")

# Delete the default cube
bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)


# Get a list of all PNG files in a specified folder
folder_path = "/Users/ll-studio/Desktop/bio-graphic-pngs"
png_files = [f for f in os.listdir(folder_path) if f.endswith('.png')]

# Create a plane for each PNG file in the folder
for i, png_file in enumerate(png_files):
    # Load the PNG image as a texture
    img = bpy.data.images.load(os.path.join(folder_path, png_file))

    # Calculate the aspect ratio of the image
    aspect_ratio = img.size[0] / img.size[1]

    # Calculate the width of the plane based on the height of 2m and the aspect ratio
    plane_width = 2 * aspect_ratio

    # Create the plane with the calculated dimensions
    bpy.ops.mesh.primitive_plane_add(size=plane_width, enter_editmode=False)
    bpy.context.object.name = f"Cardboard Cutout {i}"
    bpy.context.object.location = (i * 2, 0, 0)

    # Scale the plane along the y-axis to 2m
    bpy.context.object.dimensions[1] = 2

    # Rotate the plane 90 degrees around the x-axis
    bpy.context.object.rotation_euler[0] = math.radians(90)

    # Create a new material and add a texture to it
    material = bpy.data.materials.new(f"Material {i}")
    texture = bpy.data.textures.new(f"Texture {i}", type='IMAGE')
    texture.image = img

    # Set up the material using Principled BSDF
    material.use_nodes = True
    nodes = material.node_tree.nodes
    principled_bsdf = nodes.get("Principled BSDF")
    principled_bsdf.inputs["Alpha"].default_value = 1.0  # Set default alpha value to 1 (fully opaque)
    texture_node = nodes.new(type='ShaderNodeTexImage')
    texture_node.image = img
    texture_node.image.colorspace_settings.name = 'sRGB'
    links = material.node_tree.links
    links.new(texture_node.outputs["Color"], principled_bsdf.inputs["Base Color"])
    links.new(texture_node.outputs["Alpha"], principled_bsdf.inputs["Alpha"])

    # Add the material to the plane
    bpy.context.object.data.materials.append(material)

    # Lift up the plane so that the bottom rests on the ground plane
    bpy.context.object.location.z = 1

    # Offset the plane with a random y value between 0 and 0.7 meters
    random_offset = random.uniform(0, 0.7)
    bpy.context.object.location.y += random_offset

# Add a plane and scale it up by 20
bpy.ops.mesh.primitive_plane_add(size=1, enter_editmode=False)
bpy.context.object.name = "Ground Plane"
bpy.context.object.scale = (20, 20, 1)

# Add an area light, lift it up by 10 meters, scale it up by a factor of 5, and set the power to 1000 watts
bpy.ops.object.light_add(type='AREA', location=(0, 0, 10))
bpy.context.object.name = "Area Light"
bpy.context.object.scale = (5, 5, 5)
bpy.context.object.data.energy = 1000
```

creating this:

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F055ULBMSKF/llufs-from-script.jpg?pub_secret=611a6c39dd)


built out ultimatte setup.
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F055XHCJ3QS/img_2287.jpg?pub_secret=4f82b0bfe9)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F055XHD1K42/img_2285.jpg?pub_secret=59ce19231c)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F055XHDSH5Y/img_2284.jpg?pub_secret=12286fd2bb)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F055X0B309Z/mk-ultimatte-test-001.jpg?pub_secret=ab4675fe03)


## 01
monday. 
summer week -4 or 1?
### docs
- [ll-nodejs-cli-template](/zoV0x7shSUCauJm3E6wihQ)
- ![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F055H066P4P/screenshot_2023-05-02_at_3.11.11_pm.png?pub_secret=1d1394bd81)
- 
### events
- dev zoom
- ai event?
- code workshop on command-line tools

### projects and taskls
- ll-studio-bot-23
    - ultimatte tests
    - create hackmd working doc added to launch script
    - archive working doc script added too?

### made

- [ll-nodejs-cli-template](/zoV0x7shSUCauJm3E6wihQ) both repo and tutorial

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F055H066P4P/screenshot_2023-05-02_at_3.11.11_pm.png?pub_secret=1d1394bd81)






# mk-project-april-may

## end of term LLUF and MDF projects

- storyLab
    - project stories
    - people stories
- contentLab
    - video and still processing
    - micro-stories
    - image stream
- studioLab
    - blackmagic gear
    - cameras
    - server-side scripting
    - xml
    - ultimatte (crossover with gallery)
    - the show (pgm 1)
- galleryLab
    - blender
    - unity
    - unreal
    - virtual sets (crossover with studio)
    - ar
- resourceLab
    - each thing made needs to be a model, to teach something
    - rationale so that it's not just a how-to but a why-to too
    - tooltimes captured and resources developed
- aiLab 
    - prep for summer and next year
    - inventory of tools
    - api research and proofs of concept
    - 

divide into smaller project groups?


## end of term MK projects

- work-base
- av-base
- studio-base or system-base
    - cams with preferred settings
    - alt settings per cam
    - outputs logged
    - macro programming?
- ll-studio-bot-23
    - logging support
    - logs to fcpxml
    - logs to edl
    - file names and paths and props in Shootbase
    - connect to bases
        - macros from system-base
        - startup from system-base
        - connect to live-log-base
    - growing file support
    - 
- ll-show-your-work-bot-23
    - handle work postings
    - to final db for year
    - go back in time to scrape slack
    - slack scraping tools on this bot
    - create show md from image
- ll-do-your-work-bot-23
    - ~~refactor and start from scratch~~
    - MVP
        - ~~create task~~
        - ~~launch and create hackmd~~
        - create lluf-challenge
        - create resource prompt from link
        - app home with task creation and recent docs
    - next
        - archive hackmd
        - 
- ll-ai-lab
    - proofs of concept with [api](https://platform.openai.com/docs/guides/speech-to-text/prompting)
    - 


## mk-ll-story

- 2015 and 2016 website material
- sprint week
- playtesting
- collaborative design
- rehearsal
- Once
- MOOCs
- github
- vimeo
- youtube
- 