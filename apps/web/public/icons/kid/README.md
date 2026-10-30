# Cú Vàng Tactile assets

Each file is a standalone, production-ready SVG asset with a 24×24 viewBox. Use these assets through `/icons/kid/<name>.svg`; do not use the `.review-design` samples in product code.

This directory contains every export from `src/components/kid/icons/` as an individual asset, plus the semantic `notification.svg` alias for `bell.svg`. Regenerate the full asset set after changing an icon component with:

```powershell
node scripts/export-kid-icon-assets.cjs
```
