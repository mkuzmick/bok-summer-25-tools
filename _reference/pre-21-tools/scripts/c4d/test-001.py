import c4d
from c4d import gui
# Welcome to the world of Python


# Script state in the menu or the command palette
# Return True or c4d.CMD_ENABLED to enable, False or 0 to disable
# Alternatively return c4d.CMD_ENABLED|c4d.CMD_VALUE to enable and check/mark
#def state():
#    return True

# Main function
def main():
    # obj = doc.GetActiveObject()
    # print obj
    # obj[c4d.ID_BASEOBJECT_VISIBILITY_EDITOR]=0
    obj = c4d.BaseObject(c4d.Ocube) # Create new cube
    obj.SetRelPos(c4d.Vector(20))   # Set position of cube
    doc.InsertObject(obj)           # Insert object in document
    c4d.EventAdd()
    objects = doc.GetObjects()
    for thisObj in objects:
        thisObj[c4d.ID_BASEOBJECT_REL_ROTATION,c4d.VECTOR_X] += .1
    print objects
    # refresh c4d to recognize code
    c4d.EventAdd()
    #gui.MessageDialog('Hello World!')

# test

# Execute main()
if __name__=='__main__':
    main()