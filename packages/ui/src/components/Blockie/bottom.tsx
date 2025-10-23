function BlockieBottom({ size = 120 }) {
  const halfWidth = `${size / 2}px`;

  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: `${size}px`,
        height: `${size * 0.4}px`,
        borderRadius: `${size * 0.2}px`,
        marginTop: `${size * 0.1}px`,
      }}
    >
      <div
        className="absolute top-0 left-0 bg-blockie-red-light h-full"
        style={{ width: halfWidth }}
      />
      <div
        className="absolute top-0 right-0 bg-blockie-red h-full"
        style={{ width: halfWidth }}
      />
    </div>
  );
}
export default BlockieBottom;
