# README

Small bun application that takes an input image and splits it into a multipage pdf while retaining the original size.

## Usage

With pixel per inch taken from metadata:
```sh
bun i
bun run main.ts > out.pdf < in.png
```

If the pixel per inch (density) of the image is not set correctly, you can set it manually via `--ppi`

```sh
bun i
bun run main.ts --ppi 128 > out.pdf < in.png
```
