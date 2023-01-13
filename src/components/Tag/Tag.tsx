type TagProps = {
  label: string;
  labelColor?: string;
  bgColor?: string;
};

export default function Tag(props: TagProps) {
  const {
    label,
    labelColor = "text-gray-600",
    bgColor = "bg-gray-200",
  } = props;
  return (
    <span
      className={`mr-1 inline-block w-fit rounded ${bgColor} py-1 px-2 text-xs font-semibold uppercase uppercase ${labelColor} last:mr-0`}
    >
      {label}
    </span>
  );
}
