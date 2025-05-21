---
tags: resources, [Audition], [Podcast], [Music], [Audio], [Effects]
author: Dézhawn Dumornay
---
![alt text](https://files.slack.com/files-pri/T0HTW3H0V-F03Q9A36TFA/screen_shot_2022-07-14_at_3.23.50_pm.png?pub_secret=a042aca143 =70x)
# Audition: Effects

Audition has a collection of effects available to enhance productions.
##
## Volume Effects
- **Amplify**: Increases or decreases the volume of the audio you have selected.

- **Channel Mixer**: Alters the balance of stereo or surround channels. Enables you to change the apparent position of sounds, correct mismatched levels, and address phasing issues.
- **DeEsser**: Removes sibilance, *“ess”* sounds. To visually adjust Center Frequency and Bandwidth, drag the edges of the selection in the graph. Multiband is best for most audio content.
- **Dynamics Processing**: A Dynamics multiprocessor. Produces consistent volume levels When used as a compressor or limiter. As an expander, it increases dynamic range by reducing the level of low‑level signals. You can also use this effect as a noise gate by using extreme expander settings to completely eliminate noise below the set threshold.
- **Dynamics Effects**: Multiprocessor that contains an Auto Gate, Compressor, Expander, and Limiter. 
    - **Auto Gate**: Removes noise below a certain amplitude threshold. Useful for removing unwanted background noise like a persistent fan or hum.
    - **Compressor**: Reduces the dynamic range (the difference in level between the loudest and quietest parts of an audio signal)
    - **Expander**: Increases the dynamic range (the difference in level between the loudest and quietest parts of an audio signal). Essentially the opposite of a compressor.
    - **Limiter**: Dynamic range compression used to increase the perceived loudness of an audio recording while preventing clipping.
    
- **Fade Envelope**: Used to reduce amplitude by varying amounts over time. Applies an adjustable amplitude envelope visible in the Waveform Editor panel, click the yellow envelope line to add draggable points. Select the Spline Curves rather than the linear transition option if curved transitions between points are desired.  
-  **Gain Envelope**: Used to boost or reduce amplitude over time. Applies an adjustable amplitude envelope visible in the Waveform Editor panel, click the yellow envelope line to add draggable points. Select the Spline Curves rather than the linear transition option if curved transitions between points are desired.
-  **Hard Limiter**: Dynamic range compression used to increase the perceived loudness of an audio recording while preventing clipping. More aggressive than standard limiting.
-  **Multi-band Compressor**: Compressor with  four independently adjustable frequency bands.
-  **Normalize**: Sets the maximum amplitude of a track. Amplifies the entire audio track equally.
-  **Single-band Compressor**: Reduces sounds that exceed the set threshold level, bringing desired audio into focus and boosting the perceived loudness. This is effective for voiceovers, because it helps the speaker stand out over musical soundtracks and background audio.
-  **Speech Volume Leveler**:  Compressor optimizing dialogue while removing background noise.
-  **Tube-modeled Compressor**: Compressor simulating the warmth (subtle distortion) of vintage hardware compressors.
##
## Sound Quality Effects

- **Equalizers & Filters**: A filter is an electrical circuit that emphasizes or eliminates frequencies from a signal, altering the harmonic content. The main difference between filters and equalizers are that filters reduce certain frequencies in the spectrum, whereas equalizers can both boost and reduce the strength of particular frequencies on the spectrum. Audition has multiple EQs and Filter types:
  ##### **EQ Types**
  - **Graphic Equalizer**: EQ used to boost or cut specific frequencies using preset frequency bands for quick and easy equalization. Fewer bands provide quicker adjustment; more bands provide greater precision.
  - **Parametric Equalizer**: EQ that provides maximum control over tonal equalization, as opposed to the Graphic EQ which has set bands.

  ##### **Filter Types**
  - **FFT Filter**: FFT (Fast Fourier Transform) is an algorithm that quickly analyzes frequency and amplitude. For finer control over low frequencies, select Logarithmic. The logarithmic scale more closely resembles how people hear sound and allows for finer low frequency control. For detailed, high‑frequency work, select Linear scaling.
  - **Notch Filter**: Creates dips to remove very narrow frequency bands while leaving all surrounding frequencies untouched.

##
## Audio Repair Effects

- **Noise Reduction**: Removes any undesired background noise that is constant throughout a waveform. To achieve the best results, remove DC offset **(Favorites > Repair DC Offset)** before applying Noise Reduction. To apply the Noise Reduction effect: 
  1. Select a range in the **Waveform Editor** using the **Marquee Tool** that contains only noise and is at least half a second long
  2. Choose **Effects > Noise Reduction/Restoration > Capture Noise Print**
  3. In the **Editor** panel, select the range from which you want to remove noise
  4. Choose **Effects > Noise Reduction/Restoration > Noise Reduction**

- **Adaptive Noise Reduction**: Real time effect that removes any undesired background noise that is constant throughout a waveform. If this effect slows your computer, lower **FFT Size** and turn off **High Quality Mode**.
- **Sound Remover**: Analyzes a selected portion of a recording and builds a sound model used to find and remove the sound. Common sounds you may want to remove are phones ringing or sirens from outdoors.
- 

##
## Speed, Pitch, and Time Effects

- **Delay**: Creates a multiple echo effect with ability to adjust times between successive echoes and the number, volume and pitch of the successive repeats. Delays are a great way to add ambience. There are three delay types and two pitch change types:
  ##### **Delay Types**
  - **Analog Delay**: Simulates the sonic warmth of vintage hardware delays.
  - **Delay**: Duplicates a signal to reoccur after the original signal. When delayed far enough in time distinct echoes are created.
  - **Echo**: Adds a series of repeated, decaying echoes to a sound. If the echo is cut off abruptly before fully decaying, add several seconds of silence **(Generate > Silence)**, and then reapply the Echo effect.

- **Chorus**: Adds multiple short delays and some feedback resulting in a lush and rich sound simulating several of your original signal played at once, a chorus. This can be used to enhance voices or instruments as well as add spaciousness. Convert mono signals to stereo before applying the Chorus effect for the best result.
- **Flanger**: Creates a phase‑shifted, time‑delay effect, characteristic of psychedelic music from the 1960s and 1970s.
- **Phaser**: Similar to Flanger; creates a phase‑shifted effect characteristic of psychedelic music from the 1960s and 1970s.