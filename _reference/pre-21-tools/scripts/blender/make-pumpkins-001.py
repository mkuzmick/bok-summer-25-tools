
import bpy
import json
import math
import os

homeDirectory = os.getenv("HOME")
print(homeDirectory)
print(f'starting makePumpkins')

scaleFactor = 2

def round_half_up(n, decimals=3):
    multiplier = 10 ** decimals
    return math.floor(n*multiplier + 0.5) / multiplier

def getRadius(pQuant):
    print(f'getting radius for value {pQuant}')
    radius = round_half_up((pQuant*3./(4.*3.14159))**(1./3))
    return radius

bpy.ops.wm.append(directory=f'{homeDirectory}/Desktop/_blender/prefabs/pumpkin-template.blend\\Object\\', filename="Pumpkin")
bpy.ops.wm.append(directory=f'{homeDirectory}/Desktop/_blender/prefabs/a380.blend\\Object\\', filename="Plane")
bpy.data.objects["Plane"].location[0]=-120
bpy.data.objects["Plane"].rotation_euler[2]=-1.18

with open(f'{homeDirectory}/Desktop/_blender/data/pumpkin-data.json') as data_file:
    data = json.load(data_file)

pumpkinTemplate = bpy.data.objects["Pumpkin"]
pumpkinTemplate.hide_render = True
pumpkinTemplate.hide_viewport = True



for i, country in enumerate(data):
    country["radius"] = getRadius(country["pumpkins"])/scaleFactor
    print(country)

xVal = -data[0]["radius"]

for i, country in enumerate(data):
    xVal+=(country["radius"])
    print(f'working on {country["name"]}, which produced {country["pumpkins"]} pumpkins.')
    bpy.ops.object.text_add(enter_editmode=False, location=(0, 0, 0))
    bpy.context.active_object.name=(f'{country["name"]}-text')
    bpy.context.active_object.data.body=f'{country["name"]}\n{country["pumpkins"]}'
    bpy.context.active_object.data.size=15
    bpy.context.active_object.data.align_x='CENTER'
    bpy.context.active_object.data.extrude=3
    bpy.context.active_object.data.bevel_depth=.15
    bpy.context.active_object.location[0] = xVal
    bpy.context.active_object.location[1] = -34
    bpy.context.active_object.rotation_euler[0] = 1.5708
    bpy.ops.object.add_named(linked=False, name='Pumpkin')
    bpy.context.active_object.name = f'{country["name"]}-pumpkin'
    print(f'when we do the radius, it will be {getRadius(country["pumpkins"])}')
    bpy.context.active_object.location[0] = xVal
    bpy.context.active_object.location[1] = 0
    bpy.context.active_object.location[2] = country["radius"]
    bpy.context.active_object.scale = [country["radius"],country["radius"],country["radius"]]
    bpy.context.object.hide_render = False
    bpy.context.object.hide_viewport = False
    xVal+=(country["radius"]+10)

bpy.ops.wm.save_as_mainfile(filepath=f'{homeDirectory}/Desktop/output.blend')


    # need to add ground
    # need to add camera target
    # need to add camera
    # need to add sun
    # need to add additional objects for scale
