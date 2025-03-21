import { PerformanceEntryLane } from './PerformanceEntryLane.tsx';

export const PerformanceSwimlane: React.FC<{
  entries: PerformanceEntry[];
  minStartTime: number;
  pixelPerMs: number;
}> = (props) => {
  return (
    <>
      {props.entries.map((entry) => (
        <PerformanceEntryLane
          key={entry.name + entry.startTime}
          entry={entry}
          minStartTime={props.minStartTime}
          pixelPerMs={props.pixelPerMs}
        />
      ))}
    </>
  );
};
