# Как конвертировать SVG в PNG иконки

Нужно сконвертировать SVG файлы в PNG для работы PWA.

## Вариант 1: Онлайн конвертеры
1. Зайдите на https://cloudconvert.com/svg-to-png
2. Загрузите icon-192.svg
3. Установите размер 192x192
4. Скачайте и переименуйте в icon-192.png
5. Повторите для icon-512.svg (размер 512x512)

## Вариант 2: Node.js (если установлен)
```bash
npm install sharp
node convert-icons.js
```

## Вариант 3: Photopea (онлайн Photoshop)
1. Зайдите на https://www.photopea.com/
2. File > Open > icon-192.svg
3. File > Export As > PNG
4. Сохраните как icon-192.png
5. Повторите для 512

После конвертации удалите .svg файлы, оставьте только .png
