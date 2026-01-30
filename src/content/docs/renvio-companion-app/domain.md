---
title: Domain Knowledge - Hemodialysis
description: Healthcare domain context and terminology for dialysis clinic workflows
sidebar:
  order: 3
---

## Overview

This application is designed for hemodialysis clinics. Understanding the clinical workflow and terminology is essential for building features that match real-world needs.

## Key Terminology

| Term | Definition |
|------|------------|
| **Hemodialysis (HD)** | Blood filtration treatment for kidney failure |
| **Treatment/Session** | Single dialysis session, typically 3-4 hours |
| **Flowsheet** | Document tracking vitals and events during treatment |
| **Access** | Vascular access point (fistula, graft, catheter) |
| **Intradialytic** | Events occurring during treatment |
| **Dry Weight** | Target weight after fluid removal |
| **Kt/V** | Dialysis adequacy measurement |
| **URR** | Urea Reduction Ratio, measure of treatment effectiveness |
| **Ultrafiltration (UF)** | Fluid removal during dialysis |

## Typical Treatment Workflow

### 1. Patient Check-In
- Patient arrives at scheduled time
- Staff verifies identity and checks in
- Pre-treatment assessment performed

### 2. Pre-Treatment Assessment
- Vital signs recorded (BP, pulse, temperature, weight)
- Access site evaluated
- Patient symptoms documented
- Allergies confirmed

### 3. Treatment Initiation
- Patient positioned in chair/bed
- Access cannulation (needle insertion)
- Machine setup and priming
- Treatment parameters set:
  - Blood flow rate (typically 300-500 mL/min)
  - Dialysate flow rate (typically 500-800 mL/min)
  - Target ultrafiltration (fluid removal goal)
- Treatment started, time on recorded

### 4. Intradialytic Monitoring
Staff check patient every 30-60 minutes:
- Vital signs (BP, pulse, temperature)
- Machine parameters
- Patient symptoms
- Complications documented (cramping, hypotension, nausea)
- Interventions recorded (fluid bolus, medication)

### 5. Treatment Completion
- Treatment ended, time off recorded
- Access needles removed
- Post-treatment assessment
- Final weight recorded
- Patient discharge

### 6. Post-Treatment Documentation
- Complete flowsheet
- Calculate adequacy (Kt/V, URR)
- Document complications and outcomes
- Sign and finalize record

## Critical Data Points

### Vital Signs
- **Blood Pressure (BP):** Systolic/diastolic (e.g., 120/80 mmHg)
- **Pulse:** Heart rate (e.g., 72 bpm)
- **Temperature:** Body temperature (e.g., 98.6°F or 37°C)
- **Weight:** Pre/post treatment weight (kg or lbs)
- **O2 Saturation:** Oxygen saturation level (e.g., 98%)

### Treatment Parameters
- **Blood Flow Rate:** Speed blood is pumped through dialyzer (mL/min)
- **Dialysate Flow Rate:** Speed dialysis solution flows (mL/min)
- **Ultrafiltration (UF):** Total fluid to remove (liters)
- **UF Goal:** Target fluid removal
- **Time On/Off:** Start and end times

### Medications
Common intradialytic medications:
- **Heparin:** Anticoagulant to prevent clotting
- **EPO (Erythropoietin):** Stimulates red blood cell production
- **Iron:** Iron supplementation
- **Calcium/Phosphate binders:** Mineral balance
- **Antibiotics:** If infection present

### Complications
Common intradialytic complications:
- **Hypotension:** Low blood pressure
- **Cramping:** Muscle cramps
- **Nausea/Vomiting:** Digestive upset
- **Clotting:** Blood clot in access or circuit
- **Access Issues:** Bleeding, infiltration, poor flow
- **Chest Pain:** Cardiac symptoms
- **Headache:** Often related to rapid fluid shifts

### Lab Values
Monitored regularly:
- **Kt/V:** Dialysis adequacy (target >1.2)
- **URR:** Urea reduction ratio (target >65%)
- **Hemoglobin:** Red blood cell count (target 10-12 g/dL)
- **Albumin:** Nutritional marker
- **Phosphorus:** Mineral balance
- **Calcium:** Bone health
- **Potassium:** Electrolyte balance

## Access Types

### Fistula (Preferred)
- Surgically created connection between artery and vein
- Matures over 2-3 months
- Lower infection risk
- Longer lifespan

### Graft
- Synthetic tube connecting artery and vein
- Can be used sooner than fistula (2-3 weeks)
- Higher infection risk than fistula
- Shorter lifespan

### Catheter (Temporary)
- Tube inserted into large vein (internal jugular, femoral)
- Immediate use
- Highest infection risk
- Used while awaiting fistula/graft maturation

## Patient Population

### Typical Patient Profile
- End-stage renal disease (ESRD)
- Often diabetic and/or hypertensive
- Multiple comorbidities
- Requires dialysis 3x per week
- Treatment sessions: 3-4 hours

### Common Comorbidities
- Diabetes mellitus
- Hypertension
- Cardiovascular disease
- Anemia
- Bone and mineral disorders

## Clinical Roles

### Registered Nurse (RN)
- Patient assessment
- Treatment initiation and termination
- Medication administration
- Complex interventions
- Patient education
- Flowsheet documentation

### Patient Care Technician (PCT)
- Vital signs monitoring
- Routine flowsheet entries
- Basic patient care
- Machine monitoring
- Reports to RN

### Clinical Supervisor
- Oversees clinic operations
- Reviews documentation
- Handles escalations
- Quality assurance

### Nephrologist
- Medical director
- Prescribes dialysis orders
- Reviews patient progress
- Manages complications

## Quality Metrics

### Key Performance Indicators
- **Kt/V:** Dialysis adequacy (target >1.2)
- **URR:** Urea reduction ratio (target >65%)
- **Vascular Access Type:** % with fistula (target >66%)
- **Hospitalization Rate:** Lower is better
- **Missed Treatments:** Minimize absences
- **Infection Rate:** Especially access-related

## Regulatory Compliance

### HIPAA (Privacy)
- All patient data is PHI
- Access controls required
- Audit logging mandatory
- Encryption in transit and at rest

### CMS (Medicare)
- Dialysis facilities heavily regulated
- Specific documentation requirements
- Quality measure reporting
- Conditions for Coverage

### State Health Departments
- Licensing requirements
- Inspections and surveys
- Incident reporting

## Reference: HDFlowsheet Features

The original HDFlowsheet-Cloud implemented these features that are being re-created:

### Patient Flowsheets
- Manage patient data during dialysis treatments
- Real-time vital signs entry
- Complication tracking
- Medication administration

### Operations Checklists
- Daily clinic task management
- Organized in folders
- Track completion status by date

### End of Shift Reports
- Editable summaries for handoff
- Communication between shifts

### QA Documentation
- Quality assurance tracking per patient
- Compliance documentation

### Snippets
- Reusable text templates
- Speed up documentation

### Labs Tracking
- Laboratory value management
- Trend monitoring
