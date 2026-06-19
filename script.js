// script.js - IR for the Public Website

// ====================== GLOBAL STATE ======================
let selectedOrgan = null;
let selectedCondition = null;

// ====================== ORGAN SELECTION ======================
function selectOrgan(organ) {
    selectedOrgan = organ;
    selectedCondition = null;

    // Show condition selection
    document.getElementById('conditionSection').classList.remove('hidden');
    document.getElementById('resultsSection').classList.add('hidden');

    // Highlight selected organ button (optional visual feedback)
    highlightSelectedButton('organButtons', organ);
}

// Allow clicking on the 3D model hotspots
function selectOrganFromModel(organ) {
    selectOrgan(organ);
    
    // Scroll to condition section smoothly
    setTimeout(() => {
        document.getElementById('conditionSection').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 300);
}

// ====================== CONDITION SELECTION ======================
function selectCondition(condition) {
    selectedCondition = condition;
    showResults();
}

// ====================== RESULTS DISPLAY ======================
function showResults() {
    if (!selectedOrgan || !selectedCondition) return;

    const resultsSection = document.getElementById('resultsSection');
    const resultsContainer = document.getElementById('resultsContainer');
    const resultsTitle = document.getElementById('resultsTitle');

    resultsSection.classList.remove('hidden');
    resultsContainer.innerHTML = '';

    // Set dynamic title
    const organName = capitalize(selectedOrgan);
    const conditionName = selectedCondition === 'clot' ? 'Blood Clot' : 
                         selectedCondition === 'bleeding' ? 'Bleeding' : 'Tumor';
    resultsTitle.textContent = `IR Procedures for ${organName} – ${conditionName}`;

    // Generate relevant content based on selection
    const procedures = getProceduresForSelection(selectedOrgan, selectedCondition);

    if (procedures.length === 0) {
        resultsContainer.innerHTML = `
            <div class="procedure-card">
                <h3>No specific procedures found</h3>
                <p>
                    Interventional Radiology offers many options. 
                    Please consult a specialist for personalized information.
                </p>
            </div>
        `;
    } else {
        procedures.forEach(proc => {
            const card = document.createElement('div');
            card.className = 'procedure-card';
            card.innerHTML = `
                <h3>${proc.title}</h3>
                <p>${proc.description}</p>
                <div class="procedure-tags">
                    <span class="tag">${proc.type}</span>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }

    // Scroll to results
    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ====================== PROCEDURE DATA ======================
function getProceduresForSelection(organ, condition) {
    const data = {
        brain: {
            bleeding: [
                { title: "Endovascular Coiling for Aneurysmal Subarachnoid Hemorrhage", 
                  description: "Minimally invasive placement of coils to secure a ruptured brain aneurysm and prevent re-bleeding.", 
                  type: "Bleeding Control" },
                { title: "Embolization for Brain AVM", 
                  description: "Liquid embolics used to occlude abnormal vessels and reduce bleeding risk.", 
                  type: "Bleeding Control" }
            ],
            clot: [
                { title: "Mechanical Thrombectomy for Acute Stroke", 
                  description: "Catheter-based removal of large vessel clots in the brain.", 
                  type: "Clot Removal" }
            ],
            tumor: [
                { title: "Embolization for Brain Tumors", 
                  description: "Pre-operative or palliative embolization to reduce tumor blood supply.", 
                  type: "Tumor Treatment" }
            ]
        },
        lungs: {
            bleeding: [{ title: "Bronchial Artery Embolization", description: "Stops life-threatening lung bleeding by blocking abnormal arteries.", type: "Bleeding Control" }],
            clot: [{ title: "Catheter-Directed Therapy for Pulmonary Embolism", description: "Targeted clot removal or dissolution for massive/submassive PE.", type: "Clot Treatment" }],
            tumor: [{ title: "Lung Tumor Ablation or Embolization", description: "Image-guided treatment of lung tumors.", type: "Tumor Treatment" }]
        },
        liver: {
            bleeding: [{ title: "Hepatic Artery Embolization", description: "Controls bleeding from liver tumors or trauma.", type: "Bleeding Control" }],
            clot: [{ title: "Portal Vein Interventions", description: "Management of portal vein thrombosis.", type: "Clot Treatment" }],
            tumor: [
                { title: "TACE (Transarterial Chemoembolization)", description: "Delivers chemotherapy directly to liver tumors.", type: "Tumor Treatment" },
                { title: "RFA / MWA for Liver Tumors", description: "Thermal ablation to destroy small liver tumors.", type: "Tumor Treatment" },
                { title: "Portal Vein Embolization (PVE)", description: "Pre-surgical liver growth stimulation.", type: "Planning Procedure" }
            ]
        },
        kidney: {
            bleeding: [{ title: "Renal Artery Embolization", description: "Stops bleeding from kidney tumors or trauma.", type: "Bleeding Control" }],
            clot: [{ title: "Renal Vein Interventions", description: "Treatment of renal vein thrombosis.", type: "Clot Treatment" }],
            tumor: [{ title: "MWA / RFA for Kidney Tumors", description: "Minimally invasive destruction of small kidney tumors.", type: "Tumor Treatment" }]
        },
        // Add more organs as needed...
        legs: {
            bleeding: [{ title: "Peripheral Embolization", description: "Controls bleeding in leg arteries.", type: "Bleeding Control" }],
            clot: [{ title: "Catheter-Directed Thrombolysis / Thrombectomy for DVT", description: "Removes or dissolves deep vein clots.", type: "Clot Treatment" }],
            tumor: []
        }
    };

    return data[organ]?.[condition] || [];
}

// ====================== UTILITY FUNCTIONS ======================
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function highlightSelectedButton(containerId, value) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('selected');
        if (btn.textContent.toLowerCase().includes(value.toLowerCase())) {
            btn.classList.add('selected');
        }
    });
}

// ====================== DISEASE GUIDE LOADER ======================
function loadDiseaseGuide() {
    const container = document.getElementById('diseaseGuideContainer');
    
    container.innerHTML = `
        <div class="loading">
            <p>Loading comprehensive disease guide...</p>
        </div>
    `;

    fetch('assets/disease-guide.md')
        .then(response => {
            if (!response.ok) throw new Error('File not found');
            return response.text();
        })
        .then(markdown => {
            // Render Markdown using marked.js
            container.innerHTML = marked.parse(markdown);
            
            // Add a "Back to top" button after rendering
            const backBtn = document.createElement('button');
            backBtn.textContent = '↑ Back to Top';
            backBtn.className = 'primary-button';
            backBtn.style.margin = '2rem auto';
            backBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            container.appendChild(backBtn);
        })
        .catch(error => {
            container.innerHTML = `
                <div class="error-message">
                    <p>Unable to load the disease guide.</p>
                    <p>Please ensure <code>assets/disease-guide.md</code> exists.</p>
                    <button class="primary-button" onclick="loadDiseaseGuide()">Try Again</button>
                </div>
            `;
            console.error(error);
        });
}

// ====================== INITIALIZATION ======================
document.addEventListener('DOMContentLoaded', () => {
    // Optional: Preload disease guide hint
    console.log('%c[IR Website] script.js loaded successfully', 'color:#666');
    
    // Make sure condition section stays hidden initially
    const conditionSection = document.getElementById('conditionSection');
    if (conditionSection) conditionSection.classList.add('hidden');
});
