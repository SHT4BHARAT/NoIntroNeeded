import shutil
import os

source_path = r"C:\Users\ASUS\.gemini\antigravity-ide\brain\af3332dd-5eb0-45b4-83b0-74235b7cc323\portfolio_og_image_1783883402636.png"
dest_path = r"d:\PortfolioNew\public\og-image.png"

try:
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    shutil.copy(source_path, dest_path)
    print("SUCCESS: Custom Open Graph image copied to public/og-image.png successfully!")
except Exception as e:
    print(f"ERROR: Failed to copy image: {e}")
