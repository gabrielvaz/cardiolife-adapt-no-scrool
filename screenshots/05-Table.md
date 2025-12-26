# 05-Table.png Content Specification

## 1. Global Header (Patient Info)
- Identical to 01-trends.md.
- **Tab Navigation**: Table is Active/Orange.

## 2. Main Content Area
- **Left Column: Data Table**:
  - **Header**:
    - Filter Buttons: HR (Orange), S, V, R.
    - Controls: "20 examples", Pagination (< >).
  - **Table**:
    - Columns: HOURS, BEATS, HR MEAN, HR MIN (Blue text), HR MAX, PAUSES, PER HOUR, MAX PAUSE.
    - Rows:
      - "00h 00m 00s", "151.416", "23", "1", "3", "5", "2", "2".
      - Alternating row background colors (White / Light Gray).
      - Approximately 15-20 rows visible.

- **Right Column: ECG Strip**:
  - **Header**:
    - Text: "Time: 21:09:50 • HR: 78bpm"
    - Buttons: F1 (Orange), F2.
    - Tools: Pacer, Measure, Text, Grid, Cut/Prop.
    - Actions: Segmentation, Add report.
  - **Traces**:
    - 3 Channels (ch1, ch2, ch3).
    - Vertical layout within the right pane.
    - Beat annotations visible (N, S).
    - Playback controls at bottom of strip? Or separate? (Screenshot shows controls at bottom of this pane).
