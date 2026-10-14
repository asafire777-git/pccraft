from PIL import Image, ImageDraw, ImageFilter

im = Image.open('public/banners/banner-infeed-wide.jpg').convert('RGBA')
w, h = im.size

# 1. Clean the background in region x: 670 to 1376, y: 80 to 480
bg_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
bg_draw = ImageDraw.Draw(bg_layer)

for y in range(80, 480):
    factor = y / 480.0
    r = int(5 + 4 * factor)
    g = int(8 + 6 * factor)
    b = int(20 + 12 * factor)
    bg_draw.line([(665, y), (w, y)], fill=(r, g, b, 255))

# Neon beams
beam_layer = Image.new('RGBA', (w, h), (0, 0, 0, 0))
beam_draw = ImageDraw.Draw(beam_layer)

# Cyan beam
beam_draw.line([(730, 0), (950, 500)], fill=(0, 180, 255, 80), width=100)
beam_draw.line([(730, 0), (950, 500)], fill=(50, 220, 255, 130), width=50)
beam_draw.line([(730, 0), (950, 500)], fill=(180, 245, 255, 210), width=20)
beam_draw.line([(730, 0), (950, 500)], fill=(240, 255, 255, 255), width=6)

# Purple beam
beam_draw.line([(1200, 0), (1376, 400)], fill=(180, 0, 255, 80), width=100)
beam_draw.line([(1200, 0), (1376, 400)], fill=(220, 50, 255, 130), width=50)
beam_draw.line([(1200, 0), (1376, 400)], fill=(245, 180, 255, 210), width=20)
beam_draw.line([(1200, 0), (1376, 400)], fill=(255, 240, 255, 255), width=6)

beam_layer = beam_layer.filter(ImageFilter.GaussianBlur(16))
bg_layer = Image.alpha_composite(bg_layer, beam_layer)

# Blend mask
blend_mask = Image.new('L', (w, h), 0)
mask_draw = ImageDraw.Draw(blend_mask)
mask_draw.rectangle([680, 100, 1376, 460], fill=255)
blend_mask = blend_mask.filter(ImageFilter.GaussianBlur(14))

clean_im = Image.composite(bg_layer, im, blend_mask)

# 2. Extract text ONLY from x: 724 to 1315, y: 135 to 340
text_crop = im.crop((724, 135, 1315, 340))
tc_w, tc_h = text_crop.size

text_alpha = Image.new('L', (tc_w, tc_h), 0)
for y in range(tc_h):
    for x in range(tc_w):
        r, g, b, a = text_crop.getpixel((x, y))
        brightness = (r + g + b) / 3
        # White letters (PC HARDWARE)
        if r > 185 and g > 185 and b > 185:
            text_alpha.putpixel((x, y), 255)
        # Cyan / Blue letters (MEGA)
        elif b > 180 and g > 140:
            text_alpha.putpixel((x, y), 255)
        # Magenta / Purple letters (SALE)
        elif r > 160 and b > 170:
            text_alpha.putpixel((x, y), 255)
        elif brightness > 150:
            text_alpha.putpixel((x, y), min(255, int((brightness - 110) * 3)))

text_alpha = text_alpha.filter(ImageFilter.GaussianBlur(0.7))
text_crop.putalpha(text_alpha)

# Resize to 62% for ideal proportion
scale = 0.62
scaled_text = text_crop.resize((int(tc_w * scale), int(tc_h * scale)), Image.Resampling.LANCZOS)

# Position: x=750, y=345
# Vertical span: 345 to 345 + 127 = 472.
# Fits inside visible slice (260..510) with 85px top margin and 38px bottom margin!
clean_im.paste(scaled_text, (750, 345), scaled_text)

final_im = clean_im.convert('RGB')
final_im.save('public/banners/banner-infeed-wide.jpg', quality=96)

# Simulation crop for 1200 x 220 banner container
crop_slice = final_im.crop((0, 260, 1376, 510))
crop_slice.save('public/banners/banner_simulation_final.jpg', quality=96)
print('Optimized banner-infeed-wide.jpg written successfully!')
