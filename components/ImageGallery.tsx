import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
  /**
   * "default"  — 4/3, good for landscape photos
   * "compact"  — 16/10, shorter cards (certificates, receipts)
   * "wide"     — 16/9, for ultrawide desktop screenshots
   * "portrait" — 9/16, for phone screenshots
   */
  ratio?: "default" | "compact" | "wide" | "portrait";
  /** Overrides the intrinsic size hint. Match your real file to avoid distortion. */
  width?: number;
  height?: number;
};

const RATIO_CLASSES: Record<NonNullable<GalleryImage["ratio"]>, string> = {
  default: "aspect-[4/3]",
  compact: "aspect-[16/10]",
  wide: "aspect-[16/9]",
  portrait: "aspect-[9/16]",
};

type ImageGalleryProps = {
  images: GalleryImage[];
  /** Accessible label for the whole group, e.g. "PILA screenshots" */
  label?: string;
  /** Max columns on desktop. Portrait shots read better with fewer. */
  columns?: 2 | 3 | 4 | 5 | 6;
  /** Where the image sits inside its box when cropping. "top" keeps faces in shot. */
  objectPosition?: "top" | "center";
};

const COLUMN_CLASSES: Record<NonNullable<ImageGalleryProps["columns"]>, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

// Tailwind only sees class names written out in full, so these can't be
// built by string concatenation like `object-${position}`.
const OBJECT_CLASSES: Record<NonNullable<ImageGalleryProps["objectPosition"]>, string> = {
  top: "object-top",
  center: "object-center",
};

export default function ImageGallery({
  images,
  label = "Image gallery",
  columns = 3,
  objectPosition = "top",
}: ImageGalleryProps) {
  if (images.length === 0) return null;

  return (
    // 1 col on mobile, 2 on tablet, `columns` on desktop. gap-6/gap-8 is the
    // "breathing room" — bigger gaps as the screen gets bigger.
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 ${COLUMN_CLASSES[columns]} gap-6 lg:gap-8`}
      role="group"
      aria-label={label}
    >
      {images.map((image) => {
        const ratio = image.ratio ?? "default";

        return (
        <figure
          key={image.src}
          // group lets the <img> react to hovering anywhere over the card
          className="group overflow-hidden rounded-[16px] border border-gray-200 bg-gray-50 transition-all duration-[350ms] ease-out-expo hover:-translate-y-[2px] hover:border-gray-300 hover:shadow-card-hover"
        >
          <div className={`${RATIO_CLASSES[ratio]} overflow-hidden`}>
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width ?? 1600}
              height={image.height ?? 1200}
              // object-cover crops instead of stretching, so a portrait photo
              // in a landscape box still fills the space without distorting.
              className={`h-full w-full object-cover ${OBJECT_CLASSES[objectPosition]} transition-transform duration-[500ms] ease-out-expo group-hover:scale-[1.04]`}
            />
          </div>

          {image.caption && (
            <figcaption className="px-4 py-3 text-small-ui text-gray-500">
              {image.caption}
            </figcaption>
          )}
        </figure>
        );
      })}
    </div>
  );
}