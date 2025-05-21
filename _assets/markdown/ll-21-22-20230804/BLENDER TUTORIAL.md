# BLENDER TUTORIAL

for augmenting space lab on 20211109

Below are some notes for previous Blender tutorials we've done over the years in case they're helpful! If you ever fall behind or get bored, feel free to work through these at your own pace!

Why Blender? checkout our [pinterest](https://www.pinterest.com/learninglabpins/toolblender/) for examples of what you can do with it. But in this cluster I guess we're excited about two things:
1. if you end up getting excited about building interactive 3D worlds in Unity, Blender is where you'd build the objects that would populate these worlds (in Unity you can create some primitive objects like cubes and spheres, but Blender is where you'd create more complex shapes)
2. if you'd like to make a beautiful 3D data visualization or map, Blender could be a good place to go.

### BLENDER INTRO (Mac)

These are the basics on using Blender 2.8 on a Mac.  Just the _very_ basics.  

This is for you to mark up---be sure to underline anything that feels counter-intuitive to you as you use the software, because this is the stuff you’ll come back to, and you’ll need your paper+pen markup to help you remember where it is.  The big thing you’ll want to do as you learn is to **practice each step** (each shortcut key, each mouse move, each sequence of operations).  It’s more like learning a new dance step than learning the capital of Ohio[^1]--it’s not enough to just hear and understand the information.  It’s about **knowing-how** rather than **knowing-that** . . . and to know **how**, you actually need to train your body to make the right movement. 


### CHEATSHEET

#### TRACKPAD-NAVIGATION



* Two finger scroll = orbit
* Shift + two-finger-scroll = move the scene
* Ctrl + two-finger-scroll = zoom in and out
    * Pinch to zoom works too


#### MOUSE-NAVIGATION



* Middle-mouse-button + drag = orbit the scene
* Shift + middle-mouse-button + drag = move the scene 
* Mouse wheel = zoom in and out
* Left click = select object (or point/edge/face in edit mode)


#### KEYBOARD-NAVIGATION



* with object selected, `.` on number pad frames object selected
* if you have a numeric keyboard, hit all the numbers to see what happens


#### SHORTCUT KEYS


* **X** (and return to confirm) to delete an object
* **S** = scale
* **R** = rotate
* **G** = grab (and move)
* With **S**, **R** or **G** clicked, constrain axis with **X**, **Y** or **Z**
* **shift + Space** and then **S, R, **or **G **will activate the scale, rotate or grab tools
* **Control + Option + Q** = toggle quad view
* **Tab** = toggle between edit and object modes in 3D view
* **A** (in edit mode) = select/deselect all
* **B** then left-mouse-drag (in edit mode) = rectangular selection tool
* **C** then left-mouse-click (in edit mode) = select face/edge/point (right click to disable)
* **E** (especially in face mode) = extrude selected face
* **Z** = toggle on/off wireframe mode
    * In edit mode this will allow you to select faces/edges/points on the other side of the model too (like the “limit selection to visible” toggle on the toolbar).
* **Shift + Z** = render in 3D view
* **Control + left-click + drag** = lasso select
* **Option + right-click an edge** = select a ring of edges


### STEPS TO PRACTICE

these are some moves you might find yourself making frequently in Blender

#### THE SELECT AND EXTRUDE DANCE

* Drop a cube into the scene with **Add => Mesh => Cube**
* practice moving it around in two ways:
    * use the move tool (**Shift + Spacebar => G** or find it in the left sidebar) to move it along one axis at a time. Just grab one of the three axis arrows and pull along the X, Y or Z
    * you can also hit the letter **G** with the object selected in the viewport and drag it around . . . but if you hit G and then X, Y or Z, you can constrain movement to that axis
    * if you hit G, then X or Y or Z and then type in a number (start with 1 or 2), you'll move the object exactly that number of spatial units along that axis
* Shift to edit mode by hitting **tab** (repeat this step a number of times to help internalize it).  Do you see how the options in the “Tools” tab change depending on whether you are in edit or object mode?
    * If you don’t _see_ the Tools tab (or even if you do), hit **T**, again and again and again.
* Right click and select **Subdivide,** then do it again (so that you see 16 faces on each side of the cube)
* Hit **A**, then hit **option + A,** then do it again, then again and again. Note how you move from selecting all of the faces to selecting none?
* Now click a single face to select it. (If you seem to be secting points or lines instead of faces, hit the number **2** on your keyboard to switch from points or lines to faces--you can also find this in the top left of the GUI)
* Now hold down **shift** and click another face elsewhere on the object--you should see both of those faces now selected. 
* With faces selected you can select the move or rotate or scale tools and change them, just as you could change the whole object when in object mode.
* But we are going to do something else. So command Z to undo any changes and get back to your default cube.
* Then select a single face
* Then select the **Extrude Region** tool on the lefthand side of the interface (again, you need to be in edit mode to make this happen). You can also hit **shift + space** and then **E** to make this happen.
* grab the little yellow handle and pull it away from the face. You will seem to be moving the face, but you are actually adding MORE geometry.
* subdivision surface
* add a simple color material
* plane for the floor, add an image texture to material
* render view: Eevee vs Cycles
* 


### CAN WE VISUALIZE DATA IN HERE?

scripting

* save your last doc and create a new one
* navigate to the scripting tag


Let's start by importing everything we need and clearing the scene.

```
import bpy
import requests
import time
import math

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)
    
clear_scene()
    
```

now let's add a simple `Bar` class

```
import bpy
import requests
import time
import math

def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)


class Cube():
    def __init__(self):
        bpy.ops.mesh.primitive_cube_add()
        self.obj = bpy.context.active_object

class Bar:
    def __init__(self, index, value):
        bpy.ops.mesh.primitive_cube_add(size=1)
        self.obj = bpy.context.active_object
        bpy.ops.object.modifier_add(type='BEVEL')
        self.height = value
        self.obj.scale = (1, 1,  self.height)
        self.obj.modifiers["Bevel"].width = 0.03
        self.obj.location[0] = index*1.1
        self.obj.location[2] = self.height/2

clear_scene()

data = [1, 3, 5, 7, 9]
  
# Using for loop
for i, val in enumerate(data):
    Bar(i, val)
```


### QUICKTEXT

```

def quickText(textContent):
    bpy.ops.object.text_add(enter_editmode=False, align='WORLD', location=(0, 0, 0))
    textObject = bpy.context.active_object
    textObject.data.body = str(textContent)
    textObject.rotation_euler[0] = math.radians(90)
    textObject.data.extrude = 0.1
    textObject.data.align_x = 'CENTER'
    return textObject


quickText("Marlon")
bpy.ops.mesh.primitive_plane_add(size=50, location=(0,.7,0), rotation=(1.5708, 0, 0))

```
#### BAR FROM API DATA CONCEPT

```
import requests
import time
import bpy
import math

​
default_data = {}
​
class Candle:
    def __init__(self, close, high, low, open, ts, volume, item_number):
        bpy.ops.mesh.primitive_cube_add(size=1)
        self.candle_object = bpy.context.active_object
        bpy.ops.object.modifier_add(type='BEVEL')
        self.wick_height = high-low
        if (open-close) < 0:
            self.color = "red"
            self.candle_height = close-open
        elif (open-close) > 0:
            self.color = "green"
            self.candle_height = open-close
        else:
            self.color = "gray"
            self.candle_height = 0
        if self.candle_height < 0.01:
            self.candle_height = 0.01
        self.candle_object.scale = (0.1, 0.1,  self.candle_height)
        # create wick
        bpy.ops.mesh.primitive_cube_add()
        self.wick_object = bpy.context.active_object
        self.candle_object.modifiers["Bevel"].width = 0.02
        self.wick_object.scale = (0.01, 0.01, self.wick_height)
        self.candle_object.location[0] = item_number*.1
        self.wick_object.location[0] = item_number*.1
        self.candle_object.location[2] = open + self.candle_height/2
        self.wick_object.location[2] = low + self.wick_height/2
​
class Scene:
    def __init__(self):
        bpy.ops.mesh.primitive_plane_add(size=50, location=(0,.7,0), rotation=(1.5708, 0, 0))
        self.background_plane = bpy.context.active_object
        # bpy.ops.rigidbody.object_add()
        # bpy.context.object.rigid_body.type = 'PASSIVE'
​
​
def get_stock_data(symbol, apikey):
    now=round(time.time())
    print(now)
    r = requests.get(f'https://finnhub.io/api/v1/stock/candle?symbol={symbol}&resolution=15&from={now-86400*7}&to={now}&token={apikey}')
    if r.status_code != 200:
        print(f'failed with code: {r.status_code}')
        data = default_data
    else:
        print(r.json())
        data = r.json()
    z_offset = data["o"][0]
    for i, close in enumerate(data["c"]):
        print(f'opened at {data["o"][i]} and closed at {close}')
        candle = Candle(close, data["h"][i], data["l"][i], data["o"][i], data["t"][i], data["v"][i], i)
        candle.candle_object.location[2] -= z_offset
        candle.wick_object.location[2] -= z_offset
    scene = Scene()
```

#### SIMPLE GROUND

```
class SimpleGround:
    def __init__(self):
        bpy.ops.mesh.primitive_plane_add(size=50, location=(0,0,0))
        self.object = bpy.context.active_object
        bpy.ops.rigidbody.object_add()
        bpy.context.object.rigid_body.type = 'PASSIVE'
```

#### MAKING A NAME CONCEPT

```
import bpy
import sys
import argparse
sys.path.append('/Users/mk/Desktop/project-blender-py/scripts/projects/name_drop')
import mk_blender_utilities as mk

def parse_arguments(argv):
    usage_text = (
            "Run blender in background mode with this script:"
            "  blender --background --python " + __file__ + " -- [options]"
        )
    if "--" not in argv:
        argv = []  # as if no args are passed
    else:
        argv = argv[argv.index("--") + 1:]  # get all args after "--"
    parser = argparse.ArgumentParser(description=usage_text)
    parser.add_argument(
        "-n", "--NAME_TO_DROP", dest="NAME_TO_DROP", type=str, default="name", required=False,
        help="This name will be the one we use for the name drop",
    )
    parser.add_argument(
        "-o", "--OUTPUT_PATH", dest="OUTPUT_PATH", type=str, required=True,
        help="This text will be used to define the output path for the blender file",
    )
    parser.add_argument(
        "--RENDER_PATH", dest="RENDER_PATH", type=str, required=True,
        help="This text will be used to define the render path",
    )
    args = parser.parse_args(argv)
    return args

class Letter:
    def __init__(self, letter):
        self.letter = letter
        bpy.ops.object.text_add(enter_editmode=False, location=(0, 0, 0))
        self.object = bpy.context.active_object
        self.object.name=(f'{letter}-text')
        self.object.data.body=f'{letter}'
        self.object.data.size=4
        self.object.data.align_x='LEFT'
        self.object.data.extrude=.2
        self.object.data.bevel_depth=.02
        self.object.location[0] = 0
        self.object.location[1] = 0
        self.object.location[2] = 4.2
        self.object.rotation_euler[0] = 1.5708
        self.object.hide_render = False
        self.object.hide_viewport = False
        self.object.data.font=bpy.data.fonts.load("/System/Library/Fonts/Avenir Next.ttc")
        bpy.ops.object.convert(target="MESH")
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
        bpy.ops.object.origin_set(type='ORIGIN_CENTER_OF_VOLUME', center='MEDIAN')
        bpy.ops.rigidbody.object_add()
        self.width = self.object.dimensions.x
        self.height = self.object.dimensions.y
        self.depth = self.object.dimensions.z

class Name:
    def __init__(self, name):
        self.letters = []
        self.offset = 0
        self.spacing = .05
        for num, letter in enumerate(name):
            thisLetter = Letter(letter)
            if letter=="r":
                print('changing offset for r')
                self.offset-=.15
            self.offset+=(thisLetter.width/2+self.spacing)
            thisLetter.object.location[0] = self.offset
            self.letters.append(thisLetter)
            print(f'created {thisLetter.letter} in position {num} and added to array. Width is {thisLetter.width} and we set location[0] to {self.offset}')
            self.offset+=(thisLetter.width/2+self.spacing)
            if letter=="r":
                print('changing offset for r')
                self.offset+=.1
        self.center=(self.offset/2, 0, 1.5)

```


## OTHER DOCS

* [Blender and Python Gists](/FW23UBH3RpOeDUX_qBrwdw)
* [Tutorial for Christie](/2Cp1OitOTOey3yQALxdNfw)



#### EXTRAS TO KNOW ABOUT



* To change the object’s **anchor point**, select **Transform => origin to cursor **after clicking on the right spot of the object (the orthographic views are good for this
* To apply a material to only a group of polygons in an object, select them in edit mode, then create a new material, then click **assign**
* Each window’s toolbar is at the BOTTOM rather than the top of the window.
* You can add windows by clicking and dragging the little lines at the top right or bottom left of each window (drag down or inwards to the left from the top right; drag up inward to the right from the bottom left). But there is no immediately obvious way to get RID of the windows.  The way to do it is to invert what you’ve just done: hover over one of those same corners until you see crosshairs (a white “plus” shape), and then instead of dragging INWARDs, drag OUTWARDS into a neighboring window that you’d like to collapse (so you do this not in the window you want to get RID of, but in the window you want to “absorb” the space of the window you need to close). You will get used to this, but everyone has to admit that it’s a little weird.


#### 


#### CREATING A SIMPLE SCREEN IN BLENDER FOR UNITY

The easiest way to create a “screen” in Blender is to create a simple plane.  On its own, it won’t do much that a quad generated in Unity can’t do, so if all you need is a flat surface, you may want to stick with Unity alone.  So we are going to create a slightly wavy plane to make it more interesting: starting by adding a simple plane, then deforming it just a bit, and then bringing it into Unity.



1. In your new Blender scene, right click on the cube and delete it (forward delete key, or fn + delete on macBook).
2. In the Create menu, click Plane.  And then, BEFORE you do anything else, look for the “add plane” menu and make sure that you select** “generate UVs”**--it’s _possible_ to fix things if you forget to do this; it just takes some extra steps that add complexity, and we’re trying to keep this simple.
3. Find your “transform” tab (if you can’t see it, hit the letter “N” while your mouse is hovering over your 3d view [i.e. your main editing window]).  With your screen selected (right click on it), rotate it 90 degrees around the X axis in one of these three ways
    1. Click in the X Rotation field and type in 90
    2. With the screen selected and your cursor hovering over the 3D view, type “R” for rotate, then type “X” to constrain your rotation to the x-axis
    3. Click the little arc in the toolbar at the bottom of your 3D view and rotate the object
4. Export the object as an .fbx file (if you don’t want to export the whole scene, including the cameras, lights, etc., then select the object and check “export selected objects” when in the export .fbx view)
5. In Unity, import the .fbx file.  When you click on it in the assets folder, you will see a materials tab in the inspector.  Click on this and select your Video Material. If you don’t have a Video Material, create a new material, call it VideoMat or some such, and follow these steps:
    4. Drag your .fbx object (the one that you just applied VideoMat to) from the assets folder into the hierarchy to add it to the scene. 
    5. Then select the object in the hierarchy to reveal its properties in the inspector
    6. Click “Add Component” => Video Player.
    7. Choose your video in the “Video Clip” box
    8. Change “Render Mode” from “Material Override” to Render Texture
    9. Change


#### HOTKEYS

opt + G = resest position of object

N = toggle on/off transform numers

T = toggle on/off tool palette

	 


<!-- Footnotes themselves at the bottom. -->
## Notes

[^1]:
     And, to tell you the truth, learning the capital of Ohio may be more like learning a dance step than we think!





## more notes

we need to create a number of things at the intersection of blender and python. one interesting development => given the fact that students learning python in the sciences and social sciences are going to be using `matplotlib`, it could make sense to have the learning trajectory we create match what they encounter with `matplotlib`.

so if the very first thing is simply 


### elements
things to do/create:
* basic scatterplot
* axes
* line plot
* histogram
* population pyramids?
* streamplot (weather?)
* monochromatic and multichromatic color-scales
* bar charts
* pie charts
* 



## REFERENCE

* API for stock data: https://finnhub.io
* great [github repo full of blender scripts](https://github.com/njanakiev/blender-scripting)
* [article on an astronomer's script to map a data set to a sphere's texture](https://bertvandenbroucke.netlify.app/2019/10/13/making-rotating-sphere-plots-with-blender/) and here is [his script](https://bertvandenbroucke.netlify.app/assets/code/rotating_sphere.py)
* matplotlib window interactively in blender: https://blender.stackexchange.com/questions/141121/how-to-use-matplotlib-interactively-with-blender
* [cool example of terrain with noise in python](https://blender.stackexchange.com/questions/34351/how-to-get-a-seed-and-perlin-noise-randomnumber-in-python-in-bge) proof of concept
* [real cool medium post on creative coding with blender](https://medium.com/@behreajj/creative-coding-in-blender-a-primer-53e79ff71e)
* [this guy's medium channel is essential for blender python scripting](https://medium.com/@behreajj)
	* [creating a capsule in 5 environments](https://medium.com/@behreajj/making-a-capsule-mesh-via-script-in-five-3d-environments-c2214abf02db)
	* [tutorial on bmesh = complicated!](https://medium.com/@behreajj/shaping-models-with-bmesh-in-blender-2-9-2f4fcc889bf0)
	* [creative coding in blender: a primer](https://medium.com/@behreajj/creative-coding-in-blender-a-primer-53e79ff71e) is pre 2.8 though
	* [visualizing complex numbers in blender](https://medium.com/@behreajj/visualizing-complex-numbers-in-blender-d60bd32f20b9)
	* [scripting curves with Blender](https://medium.com/@behreajj/scripting-curves-in-blender-with-python-c487097efd13)
	* [coding materials with nodes and python](https://medium.com/@behreajj/coding-blender-materials-with-nodes-python-66d950c0bc02)
	* 
* scripting for artists
	* [15 = Modal Operators](https://www.youtube.com/watch?v=A8S-s7tuTdY)
	* [14 = the roast of nature clicker](https://www.youtube.com/watch?v=uBDc0Eq70kM)
	* [13 = roast my add-on](https://www.youtube.com/watch?v=_8KsNVE6KJs)
	* [12 = asset linking](https://www.youtube.com/watch?v=tIg-KOeFxkg)
	* [11 = custom properties](https://www.youtube.com/watch?v=9fuFDHR-UkE)
	* [10 = user interfaces](https://www.youtube.com/watch?v=bZUTiAJ1Tuc)
	* [9 = from script to add-on](https://www.youtube.com/watch?v=nKt6CtMH0no)
	* [8 = your own operator](https://www.youtube.com/watch?v=xscQ9tcN4GI)
	* [7 = for vs while](https://www.youtube.com/watch?v=7M8FIXDMKkg)
	* [6 = blender collections](https://www.youtube.com/watch?v=opZy2OJp8co&t=38s)
* [stylized character workflow](https://www.youtube.com/watch?v=f-mx-Jfx9lA&t=132s)
* [archeology for 3d modelling](https://www.youtube.com/watch?v=bwMTTJogurE)
* [simple bar chart with python and blender](https://medium.com/@octaviogl69/making-a-simple-bar-plot-with-blender-and-python-2894bf98534e)
* [scripting for artists video 6](https://www.youtube.com/watch?v=opZy2OJp8co)
* [scan the world resouces](https://www.myminifactory.com/scantheworld/)
* [intro to three.js](https://medium.com/javascript-in-plain-english/javascript-in-3d-an-introduction-to-three-js-780f1e4a2e6d) that includes a quick note on how to use it with React
* [creating a blender 2.8 voxelize script](https://www.youtube.com/watch?v=l9wSDtqThmQ&list=PL7Xqu2JziZPfzdAop8I9J5OticI4EbzZ8&index=187)
* [talk on using python to create terrain from noise in blender](https://www.youtube.com/watch?v=O33YV4ooHSo)
* [grass in blender](https://www.youtube.com/watch?v=Hf8s1Ckycdo)
* [the bezier game](https://bezier.method.ac/)
* [great article on bezier curve, adobe, art history](https://blog.prototypr.io/an-ode-to-the-bezier-curve-3eb9eca038ff)	
* [quick video on making meshes in blender with python](https://www.youtube.com/watch?v=gVUvnSJ-t3M)




# BLENDER NOTES #


* blender materials
	* create rounded rectangles with images on them
	* apply images to faces
	* https://www.youtube.com/watch?v=htV_BhUZwcI
	* https://www.youtube.com/watch?v=rng7AYfJk4Q
	* smoke explosion cartoon: https://www.youtube.com/watch?v=eQPcso-Lcbc
	* anime explosion in AE: https://www.youtube.com/watch?v=XBYd7XUR4o8
	* referenve plugin: https://www.youtube.com/watch?v=qcBLwoPH9Kg
	* random hand-drawn animations: https://www.youtube.com/watch?v=hurAsW41GM4
	* ae glitchy circuits: https://www.youtube.com/watch?v=VeA9OyVEH4A
	* best anime explosion: https://www.youtube.com/watch?v=YdSHSf9c9FU
	* shattering stuff in AE: https://www.youtube.com/watch?v=rsqgL3K84bg
	* anime energy flash effects
	* cartoon world: https://www.youtube.com/watch?v=gqujN20Q_PU
	* cracked glass displacement: https://www.youtube.com/watch?v=c9dQYJ4nZ9w
	* cracked lens effect in AE: https://www.youtube.com/watch?v=mzGkSABCkx8
	* broken glass effect: https://www.youtube.com/watch?v=L4-AMTewrK8

## BLENDER SCRIPTING


scripting links:
* [3D programming for Beginners](https://www.youtube.com/watch?v=rHzf3Dku_cE)
* [Blender scripting for lazy 3d artists](https://www.youtube.com/watch?v=hj3FtJsQFbA)
* [scripting quickstart](https://docs.blender.org/api/current/info_quickstart.html)
* [cgCookie's intro to scripting in Blender 2.8](https://cgcookie.com/articles/blender-2-8-python-scripting-superpowers-for-non-programmers)
* [Blender 2.91 Alpha API Docs](https://docs.blender.org/api/blender2.8/)
* [DataVis for Python and Blender](https://www.youtube.com/watch?v=Xrixs_XuDQo)
* [Python Crash Course for Blender](https://www.youtube.com/watch?v=XqX5wh4YeRw)
* [Blender Python Tutorial](https://www.youtube.com/watch?v=cyt0O7saU4Q&t=19s)
* [Python Scripting: 5 Tips](https://www.youtube.com/watch?v=pfhht_67x3k)
* [Python scripting for Physics Sims](https://www.youtube.com/watch?v=KI0tjZUkb5A&t=405s)
* [Python Scripting: How to Create an Addon](https://www.youtube.com/watch?v=8mSSCQ7LGVo) like a shader library
* [Scripting for Artists](https://www.youtube.com/watch?v=hfYgCwC_4iE)
* [Blender Python Scripting: add a keyframe and modifier with Blender Python](https://www.youtube.com/watch?v=zYi5JPmMG3w)
* [intro to python scripting](https://www.youtube.com/watch?v=KNa5kJd2Epo) but from bad angle
* 

### BLENDER
duck on arrays: [here](https://www.youtube.com/watch?v=skDqIwTnOfs)

scripting links:
* [3D programming for Beginners](https://www.youtube.com/watch?v=rHzf3Dku_cE)
* [Blender scripting for lazy 3d artists](https://www.youtube.com/watch?v=hj3FtJsQFbA)
* [scripting quickstart](https://docs.blender.org/api/current/info_quickstart.html)
* [cgCookie's intro to scripting in Blender 2.8](https://cgcookie.com/articles/blender-2-8-python-scripting-superpowers-for-non-programmers)
* [Blender 2.91 Alpha API Docs](https://docs.blender.org/api/blender2.8/)
* [DataVis for Python and Blender](https://www.youtube.com/watch?v=Xrixs_XuDQo)
* [Python Crash Course for Blender](https://www.youtube.com/watch?v=XqX5wh4YeRw)
* [Blender Python Tutorial](https://www.youtube.com/watch?v=cyt0O7saU4Q&t=19s)
* [Python Scripting: 5 Tips](https://www.youtube.com/watch?v=pfhht_67x3k)
* [Python scripting for Physics Sims](https://www.youtube.com/watch?v=KI0tjZUkb5A&t=405s)
* [Python Scripting: How to Create an Addon](https://www.youtube.com/watch?v=8mSSCQ7LGVo) like a shader library
* [Scripting for Artists](https://www.youtube.com/watch?v=hfYgCwC_4iE)
* [Blender Python Scripting: add a keyframe and modifier with Blender Python](https://www.youtube.com/watch?v=zYi5JPmMG3w)
* [intro to python scripting](https://www.youtube.com/watch?v=KNa5kJd2Epo) but from bad angle
* 


gist = 
`blender --background --python myscript.py`



## BLENDER RANDOM
duck on arrays: [here](https://www.youtube.com/watch?v=skDqIwTnOfs)

adding texture to an area light: https://odederell3d.blog/2020/05/06/blender-adding-a-texture-to-an-area-light/
[osl shaders in blender and cycles](https://odederell3d.blog/2020/05/28/using-osl-shaders-in-blender-cycles/)]


fire in blender
https://www.youtube.com/watch?v=_RKAL5zST84
https://www.youtube.com/watch?v=vSYMjhFXcr8&t=333s
https://www.youtube.com/watch?v=z7hHFYaQ2nA
https://www.youtube.com/watch?v=29yfS-icS3M
https://www.youtube.com/watch?v=UwccGl85qdc
https://www.youtube.com/watch?v=vSYMjhFXcr8&t=333s
https://www.youtube.com/watch?v=ghhjiSmXwM4

clouds: 
https://www.youtube.com/watch?v=GhMQN4vVMIU&t=21s




