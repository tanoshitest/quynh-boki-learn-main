
interface VideoPlayerProps {
  title: string;
  videoUrl: string;
}

const VideoPlayer = ({ title, videoUrl }: VideoPlayerProps) => {
  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-lg border border-border/50">
      <iframe
        src={videoUrl}
        title={title}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoPlayer;
