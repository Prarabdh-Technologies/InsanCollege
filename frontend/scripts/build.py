"""Copy only public files into dist for deployment; no dependencies required."""
from pathlib import Path
from shutil import copy2

ROOT = Path(__file__).resolve().parent.parent
PUBLIC_FILES = [
    'index.html', 'styles.css', 'app.js', '_headers', 'robots.txt',
    'insanlogo.jpg', 'purnea_university.png', 'insaan.webp', 'insan_phil.webp',
    'gallery1.webp', 'gallery2.webp', 'gallery3.webp', 'gallery4.webp',
    'gallery5.webp', 'gallery6.webp', 'notice.pdf', 'notice1.pdf',
]

if __name__ == '__main__':
    output = ROOT / 'dist'
    output.mkdir(exist_ok=True)
    for name in PUBLIC_FILES:
        copy2(ROOT / name, output / name)
    print(f'Copied {len(PUBLIC_FILES)} public files to {output}')
