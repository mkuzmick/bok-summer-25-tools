---
tags: ai, stable diffusion
---

# stable-diffusion-install

[Stable Diffusion Install Guide(Mac)](https://hub.tcno.co/ai/stable-diffusion/automatic1111-mac/)

[Controlnet Install Guide(Mac)](https://stable-diffusion-art.com/controlnet/#Installing_Stable_Diffusion_ControlNet)

`xcode-select --install`
`brew install python`

```
cd Development
brew install cmake protobuf rust python@3.10 git wget
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui
cd stable-diffusion-webui
```

### Download all .ckpt and .safetensors files from these three links
just click the little download button next to each file
* [Stable Diffusion 1.4](https://huggingface.co/CompVis/stable-diffusion-v-1-4-original/tree/main)
* [Stable Diffusion 1.5](https://huggingface.co/runwayml/stable-diffusion-v1-5/tree/main)
* [Stable Diffusion Inpainting](https://huggingface.co/runwayml/stable-diffusion-inpainting/tree/main)

Copy these files from Downloads into `~/Development/stable-diffusion-webui/models/Stable-diffusion`

Launch Stable Diffusion: 
`./webui.sh`

Open the interface in browser: 

localhost:7860

*note -- this number may differ for you, it'll be the last 4 digits in the line "Running on local URL: http://127.0.0.1:7860"

This is the base Stable Diffusion UI, any prompt will work, but there is still more to install, that will enable some of the more useful tools.

### Next, install Controlnet

In the Stable Diffusion webUI interface, navigate to the Extensions tab. 

Select "Install from URL" and paste `https://github.com/Mikubill/sd-webui-controlnet.git`

Next, navigate to this website: 

https://huggingface.co/webui/ControlNet-modules-safetensors/tree/main

And download all the .safetensors files from the Files tab. 

Once downloaded, copy them into this directory: 
`~/Development/stable-diffusion-webui/extensions/sd-webui-controlnet/models`

Now, back in Stable Diffusion, you can hit **Apply and Restart UI**, and you're ready to start using the tool. 

### Notes

* When using Controlnet, it only works from the txt2img tab, despite being an img2img extension.
* If you'd like to use multiple of the Controlnet options(depth maps, scribble, edge detection, straight line detection, OpenPose, pixel difference networks, or segmentations)
* to launch your app, you just need to lauch the `webui.sh` script that's in the webui's root directory