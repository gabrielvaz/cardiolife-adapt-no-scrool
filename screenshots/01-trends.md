# 01-trends.png Content Specification

## 1. Global Header (Patient Info)
- **Top Bar**:
  - Back Button: `< Back`
  - Patient Name: "Andrea Matias"
  - Exam Info: "Exam Captured: 19/05/2023 13:59 • Reviewed: 01/03/2023 19:32"
  - Patient ID: "31235674"
  - Age: "46"
  - Gender: "Male"
  - CRS: "3"
  - Date: "19/05/2025"
  - Exam ID: "2253145"
  - Duration: "85h 57m"
- **Options Bar**:
  - Label: "Options:"
  - Dropdown: "Leads: ch1, ch2" (Orange text)
  - Dropdown: "Show: 2 min" (Orange text)
  - Dropdown: "Gain: 5" (Orange text)
- **Tab Navigation**:
  - Items: Trends (Active/Orange), Events, Timeline, Templates, Table, Report, Annotations.

## 2. Trends Content
- **Filters Row**:
  - Buttons: HR (Orange/Active), RR, HRV, PQ, QRS, QT.
- **Main Chart Area**:
  - **Left Info Box**:
    - Back Button: "← Back to Hour 12: 20-21"
    - Start Time: "2024-05-19 08:00" (Label: Start)
    - End Time: "2024-05-20 07:57" (Label: End)
    - Duration: "85h 57min" (Label: Duration)
    - Beats: "357.208" (Label: Beats)
  - **Center Chart**:
    - Title: "HEART RATE"
    - Type: Line chart.
    - Y-Axis: 50, 100, 150.
    - X-Axis: Oct 29, Oct 30, Oct 31, Nov 1.
    - Vertical Marker: Orange line indicating selection.
  - **Right Histogram**:
    - Title: "HR DISTRIBUTION"
    - Y-Axis: 0, 50.000, 100.000, 150.000, 200.000.
    - X-Axis: 40, 60, 80, 100, 120, 140, 160, 180, 200, 220.
    - Bars: Blue bars with value labels on top (e.g., 21k, 146k, 20k, 3k...).

## 3. Burden Table
- **Columns**: (No visual header, but implied) Label/Visual, BEATS, DURATION, EPISODES, LONGEST.
- **Rows**:
  - **Artifacts**: Blue segmented bar visual. Beats: 357.208. Dur: 00h 00m 07s (20%). Epi: 3.449. Long: 00h 00m 00s.
  - **Sinus Rhythm**: Blue segmented bar visual. Beats: 151.416. Dur: 00h 18m 00s (20%). Epi: 3.187. Long: 03h 03m 07s.
  - **Atrial Fibrillation**: Beats: 151.416. Dur: 00h 20m 07s (20%). Epi: 510. Long: 00h 04m 07s.
  - **Atrial Flutter**: Beats: 151.416. Dur: 00h 50m 07s (20%). Epi: 34. Long: 00h 05m 07s.
  - **Premature Auricular Contr. (PAC)**: Beats: 151.416. Dur: 00h 10m 07s (20%). Epi: 7.078. Long: 00h 06m 07s.
  - **Premature Ventric. Contr. (PVC)**: Beats: 151.416. Dur: 02h 02m 07s (20%). Epi: 26.512. Long: 00h 07m 07s.
- **Vertical Alignment**: Orange vertical line extending from chart cursor through the table.

## 4. ECG Strip
- **Header**:
  - Left: "Time: 21:09:50 • HR: 78bpm"
  - Buttons: F1 (Orange bg), F2 (Gray).
  - Tools: Pacer (Zap icon, Orange bg selected?), Measure, Text, Grid, Cut/Scissors.
  - Actions: "Segmentation" (Gray button), "Add a report" (Outline button with file icon).
  - Right: Playback Controls (Double Left, Single Left, Play (Orange), Single Right, Double Right), Close Strip (X).
- **Channels**:
  - Labels: ch1, ch2, ch3.
  - Annotations: Beat labels (N, S, V) above the waveform. S is Green, V is Red, N is Black.
  - Visualization: Grid background, ECG trace (black normally, red for V-beat/anomaly?).
  - Highlights: Blue shaded regions for events.
