# 3d-lab-blender-images-as-planes

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F04378G2V4N/vintagemap.jpg?pub_secret=c57f1696fe)

One key tool to consider for our first challenge is the ["Images as Planes"](https://docs.blender.org/manual/en/3.3/addons/import_export/images_as_planes.html) add-on for Blender. This will save you the trouble of adding your own plane (with correct dimensions) and then adding a image-texture material. If you are new to Blender, it's also a good idea to get the hang of installing add-ons and using them.

## the basic steps

1. install the add-on by going to your Blender preferences (`command` + `,`), selecting `Add-ons` from the sidebar menu, then search for "images" or "images as planes" in the search bar and "Import-Export: Import Images as Planes" should show up. All you need to do is check the little box to install it.
2. Back in your scene, click `File` => `Import` => `Images as Planes` and navigate to the image you'd like to import.
3. You may need to rotate it a bit to get it to be aligned the way you'd like it, but that should be it.

## the next steps

- if you want it to look like a piece of paper, you may want to subdived the plane a little and distort it a bit to make it look like paper
- you'll also want to add lights and cameras and maybe shift to the `Cycles` renderer if you're aiming for realistm 
- if you want to really zoom in and out, you may want multiple planes for multiple zoom levels (as in the following sequence)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F0443FH1MNC/ll-on-map-xcu.jpg?pub_secret=79ddab4f89)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F042Z7M6WB1/ll-on-map-medium.jpg?pub_secret=ef89c16fe6)

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F043SDCDYSD/ll-on-map-wide.jpg?pub_secret=975e139dda)

- you may note that the second shot's map looks a little pixellated. That's because we're a little too zoomed in on it, given the resolution of the source image. If you can get away with it, one way to hide this is to focus your camera on the 3D object and defocus the map, like so:

![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F043DP58SUB/ll-on-map-shallow-dof.jpg?pub_secret=84ac2b1bd3)