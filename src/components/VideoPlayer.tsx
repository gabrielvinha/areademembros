type Props = { videoId: string };

export default function VideoPlayer({ videoId }: Props) {
  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
        title="YouTube video"
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
