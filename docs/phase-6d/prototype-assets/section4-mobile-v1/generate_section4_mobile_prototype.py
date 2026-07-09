from pathlib import Path
from PIL import Image, ImageDraw, ImageFont


ROOT = Path("/Users/zinwang/Workspace/project/ZENOVELL-V4-PIMPZ/PROJECTS/ZENOVELL-PIMPZ-V4-Active")
OUT = ROOT / "docs/phase-6d/prototype-assets/section4-mobile-v1"
IMG_DIR = ROOT / "public/images/section-4/products"

PINK = "#F31A8F"
PINK_SOFT = "#FF5CB0"
BG = "#090909"
CARD = "#121212"
CARD_ALT = "#171717"
TEXT = "#F4F4F4"
TEXT_SOFT = "#BCBCC2"
TEXT_FAINT = "#6C6C73"
BORDER = "#3F1630"
TRUST_BG = "#141414"
GREEN = "#25D366"

products = [
    {
        "title": "NICKY PIMPZ BOSS",
        "fit": "เพิ่มความมั่นใจ กระชับ อิ่มฟู",
        "diff": "กระชับและอิ่มฟูเด่น",
        "benefits": ["กระชับ", "มั่นใจ", "ทานง่าย"],
        "sale": "990.-",
        "old": "1,290.-",
        "img": "nicky-pimpz-product3.jpeg",
        "badge": "BEST SELLER",
    },
    {
        "title": "BOSS MEN",
        "fit": "เพิ่มพลัง ฟื้นฟู สมรรถภาพ",
        "diff": "พลังและการฟื้นฟู",
        "benefits": ["เพิ่มพลัง", "ฟื้นฟู", "ดูแลง่าย"],
        "sale": "990.-",
        "old": "1,290.-",
        "img": "boss-men-product1.jpeg",
        "badge": None,
    },
    {
        "title": "BOSS LADY",
        "fit": "เพิ่มความสุข อารมณ์ดี สมดุลฮอร์โมน",
        "diff": "บาลานซ์อารมณ์และฮอร์โมน",
        "benefits": ["อารมณ์ดี", "สมดุล", "ความสุข"],
        "sale": "890.-",
        "old": "1,190.-",
        "img": "boss-lady-product1.jpeg",
        "badge": None,
    },
    {
        "title": "NP GEL",
        "fit": "เจลเพิ่มความชุ่มชื้น อิ่มฟู",
        "diff": "ชุ่มชื้นและนุ่มสบาย",
        "benefits": ["ชุ่มชื้น", "เรียบลื่น", "ใช้ง่าย"],
        "sale": "590.-",
        "old": "790.-",
        "img": "np-gel-product1.jpeg",
        "badge": None,
    },
    {
        "title": "NP MEN'S WIPES",
        "fit": "แผ่นเช็ดทำความสะอาดจุดซ่อนเร้นชาย",
        "diff": "รีเฟรชก่อนลุยต่อ",
        "benefits": ["สะอาด", "พกง่าย", "อ่อนโยน"],
        "sale": "390.-",
        "old": "590.-",
        "img": "np-mens-wipes-product1.jpeg",
        "badge": None,
    },
    {
        "title": "B21",
        "fit": "สุดยอดสมรรถภาพชาย",
        "diff": "เน้นสมรรถภาพและความมั่นใจ",
        "benefits": ["สมรรถภาพ", "มั่นใจ", "ดูแลง่าย"],
        "sale": "1,190.-",
        "old": "1,590.-",
        "img": "be21-product1.jpeg",
        "badge": None,
    },
]

trust_items = [
    ("จัดส่งเร็ว", "1-2 วัน"),
    ("แพ็กเกจปิด", "ไม่ระบุสินค้า"),
    ("ข้อมูลปลอดภัย", "ไม่เปิดเผย"),
    ("LINE ปรึกษา", "มีทีมช่วยเลือก"),
]

viewports = [
    (360, 740),
    (375, 667),
    (390, 844),
    (414, 896),
    (430, 932),
]


def font(path, size):
    return ImageFont.truetype(path, size=size)


FONT_BOLD = "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
FONT_REG = "/System/Library/Fonts/Supplemental/Arial Unicode.ttf"
FONT_THAI = "/System/Library/Fonts/Supplemental/Krungthep.ttf"
FONT_THAI_UI = "/System/Library/Fonts/Supplemental/SukhumvitSet.ttc"


def pick_font(text, size, bold=False):
    has_thai = any("\u0E00" <= ch <= "\u0E7F" for ch in text)
    if has_thai:
        return font(FONT_THAI_UI, size)
    return font(FONT_BOLD if bold else FONT_REG, size)


def draw_text_aa(img, xy, text, fnt, fill, scale=3):
    if not text:
        return
    big_font = font(getattr(fnt, "path", FONT_REG), fnt.size * scale)
    left, top, right, bottom = big_font.getbbox(text)
    width = max(1, right - left + scale * 4)
    height = max(1, bottom - top + scale * 4)
    layer = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    layer_draw = ImageDraw.Draw(layer)
    bx = scale * 2 - left
    by = scale * 2 - top
    layer_draw.text((bx, by), text, font=big_font, fill=fill)
    layer = layer.resize((max(1, width // scale), max(1, height // scale)), Image.Resampling.LANCZOS)
    img.alpha_composite(layer, dest=(int(xy[0]), int(xy[1])))


def wrap(draw, text, fnt, max_w):
    words = text.split(" ")
    if not words:
        return [text]
    lines = []
    current = words[0]
    for word in words[1:]:
        test = current + " " + word
        if draw.textbbox((0, 0), test, font=fnt)[2] <= max_w:
            current = test
        else:
            lines.append(current)
            current = word
    lines.append(current)
    return lines


def wrap_loose(draw, text, fnt, max_w):
    tokens = text.split(" ")
    if len(tokens) == 1:
        chars = list(text)
        lines = []
        cur = ""
        for ch in chars:
            test = cur + ch
            if draw.textbbox((0, 0), test, font=fnt)[2] <= max_w or not cur:
                cur = test
            else:
                lines.append(cur)
                cur = ch
        if cur:
            lines.append(cur)
        return lines
    return wrap(draw, text, fnt, max_w)


def rr(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def fit_text(draw, xy, text, fnt, fill, max_w, line_gap, max_lines=2):
    lines = wrap_loose(draw, text, fnt, max_w)[:max_lines]
    y = xy[1]
    base_img = draw._image
    for line in lines:
        draw_text_aa(base_img, (xy[0], y), line, fnt, fill)
        y += fnt.size + line_gap
    return y


def render_card(card, width, height, image_h):
    img = Image.new("RGBA", (width, height), BG)
    draw = ImageDraw.Draw(img)
    rr(draw, (0, 0, width - 1, height - 1), 20, CARD, outline=BORDER, width=2)

    source = Image.open(IMG_DIR / card["img"]).convert("RGB")
    src_w, src_h = source.size
    crop_ratio = width / image_h
    src_ratio = src_w / src_h
    if src_ratio > crop_ratio:
        new_w = int(src_h * crop_ratio)
        left = (src_w - new_w) // 2
        crop = source.crop((left, 0, left + new_w, src_h))
    else:
        new_h = int(src_w / crop_ratio)
        top = max(0, (src_h - new_h) // 3)
        crop = source.crop((0, top, src_w, min(src_h, top + new_h)))
    crop = crop.resize((width, image_h))
    img.paste(crop, (0, 0))

    if card["badge"]:
        badge_f = pick_font(card["badge"], 10, bold=True)
        badge_w = 92
        rr(draw, (10, 10, 10 + badge_w, 36), 14, "#1A0E16", outline=PINK, width=2)
        draw_text_aa(img, (22, 17), card["badge"], badge_f, TEXT)

    small_width = width <= 164
    pad = 13 if small_width else 14
    y = image_h + 16
    fit_label_f = pick_font("เหมาะกับ", 9, bold=True)
    fit_f = pick_font(card["fit"], 12 if small_width else 13)
    title_f = pick_font(card["title"], 15 if small_width else 16, bold=True)
    diff_f = pick_font(card["diff"], 11 if small_width else 11)
    chip_f = pick_font("ชุ่มชื้น", 9 if small_width else 9)
    price_f = pick_font(card["sale"], 19, bold=True)
    old_f = pick_font(card["old"], 11)
    cta_f = pick_font("สั่งซื้อผ่าน LINE", 12, bold=True)

    draw_text_aa(img, (pad, y), "เหมาะกับ", fit_label_f, PINK_SOFT)
    y += 15
    y = fit_text(draw, (pad, y), card["fit"], fit_f, TEXT, width - pad * 2, 5 if small_width else 4, max_lines=2)
    y += 9
    y = fit_text(draw, (pad, y), card["title"], title_f, PINK, width - pad * 2, 1, max_lines=2)
    y += 7
    y = fit_text(draw, (pad, y), card["diff"], diff_f, "#B2B2B9", width - pad * 2, 4 if small_width else 3, max_lines=2)
    y += 11

    chip_y = y
    chip_gap = 4 if small_width else 6
    chip_w = (width - pad * 2 - chip_gap * 2) // 3
    for i, benefit in enumerate(card["benefits"]):
        x0 = pad + i * (chip_w + chip_gap)
        chip_h = 22 if small_width else 24
        rr(draw, (x0, chip_y, x0 + chip_w, chip_y + chip_h), 10, CARD_ALT, outline="#26262D", width=1)
        bb = draw.textbbox((0, 0), benefit, font=chip_f)
        tx = x0 + (chip_w - (bb[2] - bb[0])) / 2
        draw_text_aa(img, (tx, chip_y + (6 if small_width else 7)), benefit, chip_f, "#A1A1A8")
    y = chip_y + (34 if small_width else 37)

    draw_text_aa(img, (pad, y), card["sale"], price_f, PINK)
    obb = draw.textbbox((0, 0), card["old"], font=old_f)
    ox = width - pad - (obb[2] - obb[0])
    draw_text_aa(img, (ox, y + 8), card["old"], old_f, "#57575F")
    draw.line((ox, y + 14, ox + (obb[2] - obb[0]), y + 14), fill=TEXT_FAINT, width=1)
    y += 40

    rr(draw, (pad, y, width - pad, y + 40), 20, "#1B0F16", outline=PINK, width=2)
    draw_text_aa(img, (pad + 14, y + 11), "สั่งซื้อผ่าน LINE", cta_f, PINK)
    draw_text_aa(img, (width - pad - 24, y + 11), "›", pick_font("›", 18, bold=True), PINK)
    return img.convert("RGB")


def make_screen(vw, vh):
    if vw == 360:
        hp, gap = 12, 8
        card_w, card_h, image_h = 156, 370, 132
        heading_size = 24
    elif vw == 375:
        hp, gap = 12, 10
        card_w, card_h, image_h = 164, 372, 136
        heading_size = 26
    elif vw == 390:
        hp, gap = 16, 10
        card_w, card_h, image_h = 172, 370, 140
        heading_size = 30
    elif vw == 414:
        hp, gap = 16, 12
        card_w, card_h, image_h = 184, 372, 146
        heading_size = 31
    else:
        hp, gap = 16, 12
        card_w, card_h, image_h = 192, 376, 150
        heading_size = 31

    # section height calculated to show whole section
    total_h = 216 + card_h * 3 + gap * 2 + 156 + 88 + 42
    canvas = Image.new("RGBA", (vw, total_h), BG)
    draw = ImageDraw.Draw(canvas)
    badge_f = pick_font("SECTION 4", 11, bold=True)
    heading_f = font(FONT_THAI, heading_size)
    subtitle_f = pick_font("เลือกผลิตภัณฑ์ที่ใช่ สำหรับคุณ", 15 if vw >= 390 else 14)
    trust_title = pick_font("จัดส่งเร็ว", 10, bold=True)
    trust_sub = pick_font("1-2 วัน", 9 if vw <= 375 else 8)
    footer_f = pick_font("ZENOVELL • Modern Intimate Wellness", 11)
    bottom_cta_f = pick_font("ปรึกษาหรือสั่งซื้อผ่าน LINE", 15, bold=True)

    # intro
    rr(draw, (vw//2 - 76, 30, vw//2 + 76, 64), 17, PINK)
    bb = draw.textbbox((0,0),"SECTION 4",font=badge_f)
    draw_text_aa(canvas, (vw/2 - (bb[2]-bb[0])/2, 40), "SECTION 4", badge_f, TEXT)
    heading = "สินค้าแนะนำทั้งหมด"
    hbb = draw.textbbox((0,0),heading,font=heading_f)
    draw_text_aa(canvas, (vw/2 - (hbb[2]-hbb[0])/2, 90), heading, heading_f, TEXT)
    sub = "เลือกผลิตภัณฑ์ที่ใช่ สำหรับคุณ"
    sbb = draw.textbbox((0,0),sub,font=subtitle_f)
    draw_text_aa(canvas, (vw/2 - (sbb[2]-sbb[0])/2, 142), sub, subtitle_f, "#B9B9C0")

    y = 194
    for row in range(3):
        x = hp
        for col in range(2):
            idx = row*2+col
            card_img = render_card(products[idx], card_w, card_h, image_h)
            canvas.paste(card_img, (x, y))
            x += card_w + gap
        y += card_h + gap

    # trust block
    trust_y = y + 12
    rr(draw, (hp, trust_y, vw - hp, trust_y + 90), 18, TRUST_BG, outline="#222228", width=1)
    inner_w = vw - hp*2
    col_w = inner_w // 4
    for i, (tt, ss) in enumerate(trust_items):
        cx = hp + i*col_w + col_w//2
        # icon dot
        draw.ellipse((cx-9, trust_y+10, cx+9, trust_y+28), fill="#20131A", outline=PINK)
        tbb = draw.textbbox((0,0), tt, font=trust_title)
        draw_text_aa(canvas, (cx - (tbb[2]-tbb[0])/2, trust_y+38), tt, trust_title, TEXT)
        sbb = draw.textbbox((0,0), ss, font=trust_sub)
        draw_text_aa(canvas, (cx - (sbb[2]-sbb[0])/2, trust_y+56), ss, trust_sub, TEXT_FAINT)
    cta_y = trust_y + 112
    rr(draw, (hp, cta_y, vw - hp, cta_y + 54), 27, PINK)
    draw.ellipse((hp+12, cta_y+12, hp+42, cta_y+42), fill="#FFFFFF")
    draw.ellipse((hp+20, cta_y+20, hp+34, cta_y+34), fill=GREEN)
    cta_text = "ปรึกษาหรือสั่งซื้อผ่าน LINE"
    cbb = draw.textbbox((0,0), cta_text, font=bottom_cta_f)
    draw_text_aa(canvas, (vw/2 - (cbb[2]-cbb[0])/2 + 6, cta_y+16), cta_text, bottom_cta_f, TEXT)
    draw_text_aa(canvas, (vw-hp-26, cta_y+14), "›", pick_font("›", 22, bold=True), TEXT)

    foot = "ZENOVELL • Modern Intimate Wellness"
    fbb = draw.textbbox((0,0), foot, font=footer_f)
    draw_text_aa(canvas, (vw/2 - (fbb[2]-fbb[0])/2, cta_y + 68), foot, footer_f, TEXT_FAINT)
    return canvas.convert("RGB")


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for vw, vh in viewports:
        img = make_screen(vw, vh)
        img.save(OUT / f"section4-mobile-prototype-{vw}x{vh}.png")


if __name__ == "__main__":
    main()
