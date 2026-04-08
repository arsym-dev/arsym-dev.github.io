from pathlib import Path
import subprocess
import argparse
import sys

#!/usr/bin/env python3

IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".bmp", ".tiff", ".gif", ".webm", ".mp4"}


def create_thumbnail(image_path: Path, overwrite: bool = False) -> None:
    # Skip files that already look like thumbnails
    if image_path.stem.endswith("_th"):
        return

    thumb_path = image_path.with_name(f"{image_path.stem}_th.jpg")

    if thumb_path.exists() and not overwrite:
        print(f"Skip (exists): {thumb_path}")
        return

    cmd = [
        "ffmpeg",
        "-y" if overwrite else "-n",
        "-i",
        str(image_path),
        "-vf",
        "scale=115:65", #:force_original_aspect_ratio=decrease,pad=115:65:(ow-iw)/2:(oh-ih)/2",
        "-q:v",
        "2",
        str(thumb_path),
    ]

    try:
        print(f"> {' '.join(cmd)}")
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        print(f"Created: {thumb_path}")
    except subprocess.CalledProcessError as e:
        print(f"Failed: {image_path}\n{e.stderr.decode(errors='ignore')}", file=sys.stderr)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Create 115x65 thumbnails (<image_name>_th.jpg) recursively using ffmpeg."
    )
    parser.add_argument(
        "root",
        nargs="?",
        default=".",
        help="Root directory to scan (default: current directory).",
    )
    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Overwrite existing thumbnails.",
    )
    args = parser.parse_args()

    root = Path(args.root).resolve()
    if not root.exists() or not root.is_dir():
        print(f"Invalid directory: {root}", file=sys.stderr)
        sys.exit(1)

    files = [p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in IMAGE_EXTENSIONS]
    if not files:
        print("No images found.")
        return

    for image in files:
        create_thumbnail(image, overwrite=args.overwrite)


if __name__ == "__main__":
    main()