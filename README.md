# Prettify for Workday (vUBC)

A Chromium web extension designed to transform Workday pages into a cleaner, more readable and accessible portal. This project focusses on improving data density and visual hierarchy in tables, fieldsets, and other common Workday structures.

**NOTE**: *This extension was created and optimised for the UBC Workday Student tenant; it may not work as intended with other Workday instances.*

## Highlighted Features

- **Improved Page Hierarchies**: Visible, cascading structures with coloured title bars.
- **Enhanced Readability**: Bigger font, data-specific font coding, global zebra striping, and better use of whitespace.
- **Modern Fieldsets**: Consistent field alignment with depth-indexed cards.
- **Custom Parsing**: Cleaned up and simplified specifically dense strings. Currently featuring Meeting Patterns.

## Sample Visuals

### Fields
With Prettify:
<img width="2166" height="855" alt="image" src="https://github.com/user-attachments/assets/4f9cb4e2-5e02-463e-a4de-b7f677db9e24" />

Native Workday:
<img width="2133" height="600" alt="image" src="https://github.com/user-attachments/assets/cdb03023-36e7-45a3-96b0-9eb229828ec5" />

### Tables
With Prettify:
<img width="2405" height="700" alt="image" src="https://github.com/user-attachments/assets/3670b9bb-4ef3-4c71-a6db-89d9c311e6b9" />

Native Workday:
<img width="2410" height="787" alt="image" src="https://github.com/user-attachments/assets/bd898747-68e7-44bd-bcc3-5c20a9db1cda" />

## Installation

1. **Download the Repository**:
   - Click the **Code** dropdown at the top of this repository.
   - Select **Download ZIP** and extract the contents to a folder on your computer.

2. **Open Chrome Extensions**:
   - Navigate to `chrome://extensions/` in your browser.
   - Alternatively, navigate to `edge://extensions`.

3. **Enable Developer Mode**:
   - Find and toggle **Developer mode** on.

4. **Load the Extension**:
   - Select **Load unpacked** in the top-left.
   - Select the folder where you extracted the project (the folder containing `manifest.json`).

5. **Use & Access**:
   - If not enabled, turn on the **Prettify Workday** extension.
   - Optionally, click the Extensions icon in your browser's toolbar and pin **Prettify Workday**.


## Project Structure

- `/scripts/core/registry.js` - The central engine for registering and triggering UI enhancers.
- `/scripts/table.js` - Logic and styles for table transformations and totals.
- `/scripts/fieldSet.js` - Logic and styles for nested fieldset cards and depth calculation.
- `/scripts/pageFields.js` - Specialized formatting for standalone data lists.

## Privacy & Security

- **No Data Collection**: The extension runs locally in your browser. Period.
- **No External Calls**: The extension does not send data to any external servers or APIs.
- **Open Source**: The source code is provided to verify the aforementioned claims.
