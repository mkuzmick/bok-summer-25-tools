# mk-tool-shell


#### shell scripts

`ffmpeg -i /Users/spacegray/Desktop/stills-machine/vertov.mp4 vertov-%04d.jpg -hide_banner`

`ffmpeg -i /Users/spacegray/Desktop/stills-machine/vertov.mp4 -vf fps=2 /Users/spacegray/Desktop/stills-machine/vertov-%04d.jpg`



### image manipulation

working on generating grids with ImageMagick

#### mkv to mp4

`ffmpeg -i /Users/ll-studio/Documents/_people/staff/mk/projects/hh-23/jinyoung/HHMolecule-draft.mkv -c:v copy -c:a copy /Users/ll-studio/Documents/_people/staff/mk/projects/hh-23/jinyoung/HHMolecule-draft.mp4
`