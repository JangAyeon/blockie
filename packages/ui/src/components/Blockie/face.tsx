"use client";

type Emotion = "happy" | "sad" | "neutral";

function BlockieFace({
  size = 120,
  emotion = "happy",
}: {
  size?: number;
  emotion?: Emotion;
}) {
  const quadrantSize = `${size / 2}px`;
  const eyeSize = `${size * 0.15}px`;
  const mouthWidth = `${size * 0.4}px`;
  const mouthHeight = `${size * 0.15}px`;

  const containerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: `${size * 0.2}px`,
  };

  const classMap = {
    eye: {
      base: `absolute bg-neutral-black rounded-full`,
      left: {
        top: `${size * 0.4}px`,
        left: `${size * 0.25}px`,
        width: eyeSize,
        height: eyeSize,
      },
      right: {
        top: `${size * 0.4}px`,
        right: `${size * 0.25}px`,
        width: eyeSize,
        height: eyeSize,
      },
    },
    mouth: {
      base: "absolute left-1/2 transform -translate-x-1/2 bg-neutral-black",
      happy: {
        width: mouthWidth,
        height: mouthHeight,
        bottom: `${size * 0.2}px`,
        borderRadius: "0 0 100px 100px",
      },
      sad: {
        width: mouthWidth,
        height: mouthHeight,
        top: `${size * 0.7}px`,
        borderRadius: "100px 100px 0 0",
      },
      neutral: {
        width: mouthWidth,
        bottom: `${size * 0.2}px`,
        height: `${size * 0.05}px`,
        borderRadius: "2px",
      },
    },
    quadrant: {
      width: quadrantSize,
      height: quadrantSize,
    },
  };

  return (
    <div className="relative overflow-hidden" style={containerStyle}>
      {/* 4분할 컬러 */}
      <div
        className="absolute top-0 left-0 bg-blockie-yellow"
        style={classMap.quadrant}
      />
      <div
        className="absolute top-0 right-0 bg-blockie-green"
        style={classMap.quadrant}
      />
      <div
        className="absolute bottom-0 left-0 bg-blockie-blue"
        style={classMap.quadrant}
      />
      <div
        className="absolute bottom-0 right-0 bg-blockie-purple"
        style={classMap.quadrant}
      />

      {/* 눈 */}
      <div className={classMap.eye.base} style={classMap.eye.left} />
      <div className={classMap.eye.base} style={classMap.eye.right} />

      {/* 입 */}
      <div
        className={classMap.mouth.base}
        style={{
          ...classMap.mouth[emotion],
        }}
      />
    </div>
  );
}

export default BlockieFace;
