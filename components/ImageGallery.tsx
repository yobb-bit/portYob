import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /** "compact" makes an image shorter — useful for certificates or receipts */
  ratio?: "default" | "compact";
};

type ImageGalleryProps = {
  images: GalleryImage[];
  /** Accessible label for the whole group, e.g. "PILA screenshots" */
  label?: string;
};

export default function ImageGallery({
  images,
  label = "Image gallery",
}: ImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    // 1 col on mobile, 2 on tablet, 3 on desktop. gap-6/gap-8 is the
    // "breathing room" — bigger gaps as the screen gets bigger.
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      role="group"
      aria-label={label}
    >
      {images.map((image) => (
        <figure
          key={image.src}
          // group lets the <img> react to hovering anywhere over the card
          className="group overflow-hidden rounded-[16px] border border-gray-200 bg-gray-50 transition-all duration-[350ms] ease-out-expo hover:-translate-y-[2px] hover:border-gray-300 hover:shadow-card-hover"
        >
          <div
            className={
              // A fixed aspect ratio keeps every row the same height.
              // object-cover crops instead of stretching, so a portrait photo
              // in a landscape box still fills the space without distorting.
              image.ratio === "compact"
                ? "aspect-[16/10] overflow-hidden"
                : "aspect-[4/3] overflow-hidden"
            }
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1600}
              height={1200}
              // object-top keeps faces in shot when a portrait photo gets cropped
              className="h-full w-full object-cover object-top transition-transform duration-[500ms] ease-out-expo group-hover:scale-[1.04]"
            />
          </div>

          {image.caption && (
            <figcaption className="px-4 py-3 text-small-ui text-gray-500">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}