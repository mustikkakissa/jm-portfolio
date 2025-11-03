# Media Files Guide

## Adding Your Project Images and Videos

Place your media files in the `public/images/` folder with the following names:

### Required Media Files

1. **horror-prototype.jpg** (or .mp4 for video)
   - Screenshot or video of your Horror-Survival Prototype
   - Recommended size: 1920x1080 or 16:9 aspect ratio

2. **character.jpg**
   - Your Blender character model
   - Show the final textured model or multiple views

3. **diy.jpg**
   - Photos of your DIY projects (3D printer, etc.)
   - Can be a collage if you have multiple projects

### Supported Formats

#### Images
- `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

#### Videos
- `.mp4` (recommended), `.webm`, `.ogg`
- Videos will automatically have controls and loop

### File Placement

```
public/
  └── images/
      ├── horror-prototype.jpg (or .mp4)
      ├── character.jpg
      └── diy.jpg
```

### Tips

- **Image Optimization**: Compress images to keep file sizes reasonable (under 2MB per image)
- **Video Optimization**: Keep videos under 30 seconds and compress for web (H.264 codec recommended)
- **Aspect Ratio**: 16:9 or 4:3 work best for the layout
- **Resolution**: 1920x1080 for images, 1280x720 for videos

### Example: Converting Video for Web

```bash
# Using ffmpeg to optimize video
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```

## Testing Locally

Run the development server to preview:

```bash
npm run dev
```

## Building for GitHub Pages

Build the production version:

```bash
npm run build
```

The built files will be in the `dist/` folder.

