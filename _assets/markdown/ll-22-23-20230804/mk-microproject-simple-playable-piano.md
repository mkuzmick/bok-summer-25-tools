# mk-microproject-simple-playable-piano

in Unity

- may as well begin with the whole thing (but generated?)
- slide view slide to side
- maybe some other sliders for effects
- a "release the balls" (or rocks or other?) button to randomize play
- grey out (or semi-transparency) for keys not in a key as a feature?



## goals

- model the keys, add materials
- script to generate keyboard, looping through keys
- now play a sound on key press
- then play a sound on midi key press
- then move 3d key on key press
- then add sliders for filters
- record player input



## steps

### start the project

- begin with 3D core
- add empty for the basic set and put a plane in there
- add empty for the keyboard and add a script to it called `KeyboardGenerator`

### create the key prefabs

- add a cube
- add a white material to cube
- change cube to be key-sized `1.0`, `0.1` and `4.0`, say
- drag into prefabs folder
- add another cube and this time give it a `BlackKey` material; make it smaller and drag into prefabs too

### create an octave manually

- create an empty called octave
- drag in 7 white keys and 5 black keys
- arrange them on the x and y to be a keyboard
- drag that octave into prefabs

### generate an octave to start

- add an empty called octave
- instantiate a single key

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GenerateOctave : MonoBehaviour
{
    public GameObject whiteKey;
    public GameObject blackKey;

    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("adding an octave of keys");
        GameObject whiteKey1 = Instantiate(whiteKey, new Vector3(0f, 1.0f, 0f), Quaternion.identity);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}

```

and now use a loop to instantiate many

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class GenerateOctave : MonoBehaviour
{
    public GameObject whiteKey;
    public GameObject blackKey;
    public GameObject keyboardPosition; 

    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("adding an octave of keys");
        //GameObject whiteKey1 = Instantiate(whiteKey, new Vector3(0f, 1.0f, 0f), Quaternion.identity);
        CreateOctave();
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    void CreateOctave()
    {
        for (int i = 0; i < 12; i++)
        {
            float position = i;
            GameObject KeyClone = Instantiate(whiteKey, new Vector3(i*1.1f + keyboardPosition.transform.position.x, keyboardPosition.transform.position.y, keyboardPosition.transform.position.z), keyboardPosition.transform.rotation);
        }
    }
}
```

or

```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class KeyboardController : MonoBehaviour
{

    public GameObject whiteKey, blackKey;
    // Start is called before the first frame update
    void Start()
    {
        for (int i = 0; i < 24; i++)
        {
            createKey(24*i, whiteKey, new Vector3(i*1.1f, 0, 0));
        }
    }

    // Update is called once per frame
    void Update()
    {
        
    }

    private GameObject createKey(int midiKeyNumber, GameObject keyType, Vector3 location)
    {
        GameObject thisKey = Instantiate(keyType, location, Quaternion.identity);
        return thisKey;
    }
}

```


need to loop through the 12 notes and know when they're black and when white---and maybe we need to add to an index


- note 1, for instance
    - type: white
    - loc: 0
- note 2
    - type: black
    - loc: 0.5
- note 3
    - type: white
    - loc: 1
- note 4
    - type: black
    - loc: 1.5

how about

- node 1
    - initial white (midi index 0)
- node 2 = whole
    - black at position 1-.5 (midi index 1)
    - white at position 1 (midi index 2)
    - 
    - 

- next add execute in edit mode
- execute boolean (public) for executing
- reset boolean?
- 


```
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

[ExecuteInEditMode]

public class KeyboardController : MonoBehaviour

{
    public GameObject whiteKey, blackKey;
    public bool buildKeyboard;
    public int numberOfOctaves;
    private GameObject keyboard;

    void Start()
    {
        
    }

    void Update()
    {
        if (buildKeyboard)
        {
            SetupScene();
            buildKeyboard = false;
        }
    }

    public void SetupScene()
    {
        if (keyboard != null)
        {
            DestroyImmediate(keyboard);
        }
        keyboard = new GameObject("Keyboard");
        float keyPosition = 0;
        for (int i = 0; i < 12*numberOfOctaves; i++)
        {
            GameObject theKey = createKey(i + 24, whiteKey, new Vector3(keyPosition, 0, 0));
            theKey.transform.parent = keyboard.transform;
            theKey.name = string.Format("Key: {0}", i+24);
            keyPosition += 1.1f;
        }
    }

    private GameObject createKey(int midiKeyNumber, GameObject keyType, Vector3 location)
    {
        GameObject thisKey = Instantiate(keyType, location, Quaternion.identity);
        return thisKey;
    }
}
```


## reference

- this [tutorial on dynamic content](https://www.youtube.com/watch?v=elkTZq-4Htk) is key
- 