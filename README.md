# CampaignOS - Ride-Hailing Campaign Intelligence

An interactive growth analytics dashboard built with Google Apps Script and Google Sheets. It uses **synthetic, Bolt-inspired ride-hailing data** to show how campaign performance connects to experiment outcomes, contribution, guardrails, and business decisions. This is an independent portfolio project; it does not contain Bolt customer data or represent Bolt's actual results.

**[Open the live dashboard](https://script.google.com/macros/s/AKfycbxuHC7tvsMocXHUj5yoG3XHdKJzYdyMQwuo23vL1iGvDzSr-5cqoK2Jfmif4BLSc6QV/exec)** · **[Explore the Google Sheets dataset](https://docs.google.com/spreadsheets/d/1EmMIuQEEH63TLWYFMDCMgpuZ24di-FXq4eUH_MEuJnI/edit?gid=2119349503#gid=2119349503)**

> If a link asks you to request access, its owner needs to adjust the Google sharing or web-app deployment settings. GitHub hosting the code does not automatically make the Google Sheet or Apps Script web app public.

## The business question

Should a campaign be scaled, revised, or stopped? A higher conversion rate alone cannot answer that. CampaignOS compares randomly assigned control and treatment customers, then looks at incremental contribution after campaign costs and operational guardrails. A statistically significant increase in rides can still be a poor business decision if discounts or other costs outweigh the gain.

## What the dashboard includes

| View | What it answers |
| --- | --- |
| Board overview | What changed, what matters financially, and what should leadership do? |
| Campaign portfolio | How do campaigns compare across performance and economics? |
| Experiment lab | What are control conversion, treatment conversion, absolute lift, p-value, and incremental contribution for each campaign? |
| KPI analysis | How are acquisition, conversion, revenue, costs, and contribution moving? |
| Visualizations | What patterns appear across campaigns, channels, and periods? |
| Guardrail matrix | Are refunds, cancellations, support load, margin, or unsubscribes creating risks? |

The case study covers **ten campaigns**, with control and treatment assignments for each. The dataset spans approximately **September 2024 through August 2026**. Currency is GBP. Figures and scenarios are simulated for learning and demonstration.

## How to interpret the experiment results

| Measure | Meaning |
| --- | --- |
| Control conversion | Share of customers assigned to control who converted. |
| Treatment conversion | Share of customers assigned to treatment who converted. |
| Absolute lift | Treatment conversion minus control conversion, in percentage points. |
| p-value | Evidence against the no-difference hypothesis under the dashboard's statistical test; it does not measure profit or the probability that the hypothesis is true. |
| Incremental contribution | Estimated incremental financial contribution after relevant campaign costs, under the simulation's assumptions. |

Read the financial result and guardrails alongside the statistical result. Use a positive lift with negative contribution to revisit targeting, incentive size, and unit economics before scaling. Treat borderline p-values and small cohorts cautiously. These are simulated analyses, not claims about real-world causal effects at Bolt.

## Data and source files

The linked Google Sheet should contain six tabs: `Campaigns`, `Customers`, `Assignments`, `Events`, `Rides`, and `Costs`. The app validates that all ten campaigns have both control and treatment assignments; an older version of the dataset had only one complete experiment and will produce a clear error.

```text
CampaignOS/
├── README.md       # Project context, links, setup, and measurement guide
├── Code.gs         # Apps Script server: reads and validates Google Sheets
└── index.html      # Dashboard UI, styles, and browser-side analysis
```

**Upload these three files to GitHub** for the dashboard shown in the link above. `index.html` already contains the browser JavaScript; there is **no separate `code.js` file** for this Apps Script version. The optional synthetic workbook can be added if you want a downloadable dataset snapshot; the Google Sheet link above is sufficient to browse the data if sharing permits.

The separate `campaignos-site/` directory is a different static-site build. Do not mix its `dist/code.js` or `dist/index.html` with this Apps Script project: the static build embeds data, while this dashboard reads Google Sheets with `google.script.run`.

## Run your own copy

1. Make a copy of the [Google Sheets dataset](https://docs.google.com/spreadsheets/d/1EmMIuQEEH63TLWYFMDCMgpuZ24di-FXq4eUH_MEuJnI/edit?gid=2119349503#gid=2119349503) with all six tabs, or import the latest synthetic workbook into Google Sheets.
2. In your copy of the Sheet, select **Extensions → Apps Script**. Replace `Code.gs` with the file in this repository. Add an **HTML** file named `index` in the editor and paste the contents of `index.html`.
3. For a Sheet-bound project, `SPREADSHEET_ID = ''` uses the active Sheet. For a standalone Apps Script project, set `SPREADSHEET_ID` in `Code.gs` to the ID between `/d/` and `/edit` in **your** Sheet URL. The live dataset linked above has ID `1EmMIuQEEH63TLWYFMDCMgpuZ24di-FXq4eUH_MEuJnI`.
4. Run `checkCampaignData()` in the Apps Script editor and approve the requested Google permissions. Expect `completeTests: 10` and `assignments: 10000`.
5. Select **Deploy → New deployment → Web app** and configure access to suit your audience. On later edits, choose **Deploy → Manage deployments → Edit → New version → Deploy**, then reload the web app.

If experiment values appear blank, first check that the project is connected to the latest six-tab Sheet and that `checkCampaignData()` succeeds; then verify that the deployed web app uses the latest version.

## Portfolio discussion prompts

- Which campaigns improve conversion *and* incremental contribution?
- Which apparently successful campaigns should be changed because the economics or guardrails deteriorate?
- How would you explain a promising but statistically uncertain result to a regional stakeholder?
- Before a larger rollout, what would you change in the offer, city targeting, or experiment design?

**Data provenance:** Fully synthetic training data. No real customer, campaign, revenue, or operational data from Bolt is included.
