# Performance Browser for `PerformanceEntry`

This is a lightweight UI to visualize performance entries extracted via `performance.getEntries()`.

The UI does accept various text payloads that contain valid JSON objects, where each JSON object represents a valid `PerformanceEntry`.

## Example payload

```text
This is a console output, some performance events follow for debugging purposes.
Event 1: { "name": "https://jakobnohe.de/performance-browser/", "entryType": "navigation", "startTime": 0, "duration": 252.09999999962747, "...": "..." }
Event 2: { "name": "https://jakobnohe.de/performance-browser/static/js/lib-react.b9f96a03.js", "entryType": "resource", "startTime": 37.80000000074506, "duration": 36.59999999962747, "...": "..." }
Event 3: { "name": "first-contentful-paint", "entryType": "paint", "startTime": 232, "duration": 0 }
```
