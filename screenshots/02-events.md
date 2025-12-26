# 02-events.png Content Specification

## 1. Global Header (Patient Info)
- Identical to 01-trends.md.
- **Tab Navigation**: Events is Active/Orange.

## 2. Metric Cards Grid
- **Rhythm**:
  - Subtitle: "Distribution of detected heart rhythms"
  - Table Content:
    - SR: 18:15m | 76% | -- | --
    - AFIB: 32:38s | 2% | -- | 39
    - AFL: 1:49s | 0% | 34 | 29
- **HR (Heart Rate)**:
  - Subtitle: "Heart rate and RR interval statistics"
  - Grid Content:
    - HR MEAN: 416ms
    - HR MIN: 566ms
    - HRN MEAN: 434ms
    - HRN MIN: 12
    - HR STD: 9
    - HR MAX: 170
    - HRN STD: 9
    - HRN MAX: 170
- **HRV (Heart Rate Variability)**:
  - Subtitle: "Heart rate variability metrics overview"
  - Grid Content:
    - AVNN: 889
    - SDNN: 9
    - RMSSD: 566
    - PNN50: 170
    - SDNNI: 434
    - PNN20: 9
    - SDNNI: 170
    - HTI: 12
- **PAC**:
  - Subtitle: "Premature atrial contraction summary"
  - Grid Content:
    - BEATS: 57.266
    - ISO: 2.000
    - RUNS: --
    - HOUR: 305.9
    - COUP: 260
    - BIG: --
    - TRIG: 4.818
    - ABERR: --
- **PVC**:
  - Subtitle: "Premature ventricular contraction summary"
  - Grid Content:
    - BEATS: 57.266
    - ISO: 2.000
    - BIG: --
    - HOUR: 305.9
    - COUP: 260
    - TRIG: 4.818
    - RUNS: --
- **Pauses**:
  - Subtitle: "Detected cardiac pauses and duration"
  - Grid Content:
    - PAUSES: 85
    - LONGEST: 4.95s
    - PER HOUR: 3.5
- **Artifacts**:
  - Subtitle: "Signal noise and recording artifacts"
  - Grid Content:
    - BEATS: 6.144
    - LONGEST: --
    - EPISODES: 3.449
    - PERCENTAGE: 6%

## 3. Examples Grid Section
- **Header**:
  - Title: "HRN Min"
  - Controls: "20 examples", Pagination (< >), Close (X).
- **Grid**:
  - 12 mini-strips visible.
  - Top row: Pink background, "12:10:10" label.
  - Other rows: White background, various timestamps.
  - Waveforms visible in each box.

## 4. ECG Strip (Bottom)
- Identical to 01-trends.md.
