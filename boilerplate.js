// boilerplate.js
const fs = require("fs");
const path = require("path");

// اب baseDir کو src/app کر دیا
const baseDir = path.join("src", "app");

const structure = {
    "layout.tsx": "",
    "page.tsx": "",
    "globals.css": "@tailwind base;\n@tailwind components;\n@tailwind utilities;",
    invoice: {
        preview: {
            "page.tsx": "",
        },
        templates: {},
    },
    components: {
        form: {
            "FreelancerInfoForm.tsx": "",
            "ClientInfoForm.tsx": "",
            "InvoiceDetailsForm.tsx": "",
            "LineItemsForm.tsx": "",
            "TotalsForm.tsx": "",
            "ExtraOptionsForm.tsx": "",
        },
        preview: {
            "InvoiceHeader.tsx": "",
            "InvoiceClientSeller.tsx": "",
            "InvoiceLineItems.tsx": "",
            "InvoiceTotals.tsx": "",
            "InvoiceFooter.tsx": "",
            "InvoiceSignature.tsx": "",
        },
        ui: {
            "Button.tsx": "",
            "Input.tsx": "",
            "Select.tsx": "",
            "DatePicker.tsx": "",
            "FileUpload.tsx": "",
            "Modal.tsx": "",
        },
        common: {
            "LanguageSwitcher.tsx": "",
            "CurrencySelector.tsx": "",
            "ThemeToggle.tsx": "",
        },
    },
    lib: {
        pdf: {
            "generateInvoicePDF.ts": "",
            "styles.ts": "",
        },
        "calculations.ts": "",
        "formatters.ts": "",
        "constants.ts": "",
    },
    hooks: {
        "useInvoiceForm.ts": "",
        "useLocalStorage.ts": "",
        "useCurrency.ts": "",
    },
    types: {
        "invoice.ts": "",
        "client.ts": "",
        "freelancer.ts": "",
        "common.ts": "",
    },
    styles: {
        "pdf.css": "",
    },
};

// Recursive folder + file maker
function createStructure(base, obj) {
    for (const key in obj) {
        const fullPath = path.join(base, key);

        if (typeof obj[key] === "string") {
            // File
            fs.mkdirSync(base, { recursive: true });

            if (fs.existsSync(fullPath)) {
                console.log("⚠️ Skipped (already exists):", fullPath);
            } else {
                fs.writeFileSync(fullPath, obj[key]);
                console.log("✅ File created:", fullPath);
            }
        } else {
            // Folder
            fs.mkdirSync(fullPath, { recursive: true });
            console.log("📂 Folder created:", fullPath);
            createStructure(fullPath, obj[key]);
        }
    }
}

createStructure(baseDir, structure);