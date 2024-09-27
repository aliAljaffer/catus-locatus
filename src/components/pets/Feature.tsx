type FeatureProps = {
  Icon: React.ReactElement;

  featureName: string;
  content: string;
};
export default function Feature({ Icon, featureName, content }: FeatureProps) {
  return (
    <p className="flex w-fit items-center gap-1 text-sm font-bold capitalize">
      {Icon}
      {/* should be last, I think */}
      {featureName}:{" "}
      <span className="text-sm font-normal capitalize">{content}</span>
    </p>
  );
}
