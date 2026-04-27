#!/bin/bash
#
# Генерация превью (thumbnails) из полноразмерных изображений.
# Использует встроенную утилиту macOS — sips.
# Не требует установки дополнительных программ.
#
# Использование:
#   npm run thumbs
#
# Что делает:
#   Для каждой комнаты берёт файлы из full/ и создаёт
#   уменьшенные копии в thumb/ (ширина 600px).
#   Уже существующие превью не перезаписываются.

set -e

IMAGES_DIR="public/images"
THUMB_WIDTH=600

rooms=("kabinet" "koridor" "kukhnya-gostinaya" "spalnya" "sanuzel")

total=0
created=0
skipped=0

for room in "${rooms[@]}"; do
  full_dir="$IMAGES_DIR/$room/full"
  thumb_dir="$IMAGES_DIR/$room/thumb"

  if [ ! -d "$full_dir" ]; then
    echo "  Пропуск: $full_dir не найдена"
    continue
  fi

  mkdir -p "$thumb_dir"

  for img in "$full_dir"/*.{jpg,jpeg,png,JPG,JPEG,PNG}; do
    [ -f "$img" ] || continue

    filename=$(basename "$img")
    thumb_path="$thumb_dir/$filename"
    total=$((total + 1))

    if [ -f "$thumb_path" ]; then
      skipped=$((skipped + 1))
      continue
    fi

    cp "$img" "$thumb_path"
    sips --resampleWidth "$THUMB_WIDTH" "$thumb_path" --out "$thumb_path" > /dev/null 2>&1
    created=$((created + 1))
    echo "  ✓ $room/$filename"
  done
done

echo ""
echo "Готово: $created создано, $skipped пропущено (уже есть), $total всего"
