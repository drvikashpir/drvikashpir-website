// script.js - IR for the Public Website (Updated)

// ====================== GLOBAL STATE ======================
let selectedOrgan = null;
let selectedCondition = null;

// ====================== ORGAN SELECTION ======================
function selectOrgan(organ) {
    selectedOrgan = organ;
    selectedCondition = null;

    document.getElementById('conditionSection').classList.remove('hidden');
    document.getElementById('resultsSection').classList.add('hidden');

    highlightSelectedButton('organButtons', organ);
}

function selectOrganFromModel(organ) {
    selectOrgan(organ);
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

    const organName = capitalize(selectedOrgan);
    const conditionName = selectedCondition === 'clot' ? 'Blood Clot' : 
                         selectedCondition === 'bleeding' ? 'Bleeding' : 'Tumor';
    resultsTitle.textContent = `IR Procedures for ${organName} – ${conditionName}`;

    const procedures = getProceduresForSelection(selectedOrgan, selectedCondition);

    if (procedures.length === 0) {
        resultsContainer.innerHTML = `
            <div class="procedure-card">
                <h3>No specific procedures found</h3>
                <p>Please consult a specialist for personalized information.</p>
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

    // ===== NEW: Back Button =====
    const backBtn = document.createElement('button');
    backBtn.textContent = '← Back to Condition Selection';
    backBtn.className = 'secondary-button back-button';
    backBtn.onclick = () => {
        resultsSection.classList.add('hidden');
        document.getElementById('conditionSection').classList.remove('hidden');
    };
    resultsContainer.appendChild(backBtn);

    setTimeout(() => {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

// ====================== PROCEDURE DATA ======================
function getProceduresForSelection(organ, condition) {
    const data = {
        brain: {
            bleeding: [
                { title: "Endovascular Coiling for aSAH", description: "Minimally invasive coiling to secure ruptured brain aneurysms.", type: "Bleeding Control" },
                { title: "Embolization for Brain AVM", description: "Liquid embolics to reduce bleeding risk from AVMs.", type: "Bleeding Control" }
            ],
            clot: [{ title: "Mechanical Thrombectomy for Stroke", description: "Catheter-based removal of brain clots.", type: "Clot Removal" }],
            tumor: [{ title: "Pre-operative Tumor Embolization", description: "Reduces blood supply before brain tumor surgery.", type: "Tumor Treatment" }]
        },
        liver: {
            bleeding: [{ title: "Hepatic Artery Embolization", description: "Controls liver bleeding.", type: "Bleeding Control" }],
            clot: [{ title: "Portal Vein Interventions", description: "Treatment of portal vein thrombosis.", type: "Clot Treatment" }],
            tumor: [
                { title: "TACE", description: "Chemoembolization for liver cancer.", type: "Tumor Treatment" },
                { title: "RFA / MWA", description: "Thermal ablation of liver tumors.", type: "Tumor Treatment" }
            ]
        },
        legs: {
            bleeding: [{ title: "Peripheral Embolization", description: "Controls bleeding in leg vessels.", type: "Bleeding Control" }],
            clot: [{ title: "Catheter-Directed Therapy for DVT", description: "Clot removal or dissolution in deep leg veins.", type: "Clot Treatment" }],
            tumor: []
        }
        // Add more organs as needed
    };
    return data[organ]?.[condition] || [];
}

// ====================== UTILITY ======================
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

// ====================== DISEASE GUIDE WITH SEARCH ======================
function loadDiseaseGuide() {
    const container = document.getElementById('diseaseGuideContainer');
    
    container.innerHTML = `<div class="loading"><p>Loading disease guide...</p></div>`;

    fetch('assets/disease-guide.md')
        .then(res => {
            if (!res.ok) throw new Error('File not found');
            return res.text();
        })
        .then(markdown => {
            container.innerHTML = marked.parse(markdown);

            // ===== NEW: Add Search Box =====
            const searchBox = document.createElement('input');
            searchBox.type = 'text';
            searchBox.placeholder = 'Search diseases (e.g., AVM, TACE, DVT)...';
            searchBox.style.cssText = 'width:100%; max-width:400px; padding:10px; margin:1rem 0; font-size:1rem;';
            
            searchBox.oninput = () => {
                const term = searchBox.value.toLowerCase();
                const headings = container.querySelectorAll('h2, h3');
                headings.forEach(h => {
                    h.style.display = h.textContent.toLowerCase().includes(term) ? '' : 'none';
                });
            };

            container.insertBefore(searchBox, container.firstChild);

            // Back to top button
            const backBtn = document.createElement('button');
            backBtn.textContent = '↑ Back to Top';
            backBtn.className = 'primary-button';
            backBtn.style.margin = '2rem auto';
            backBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
            container.appendChild(backBtn);
        })
        .catch(() => {
            container.innerHTML = `
                <div class="error-message">
                    <p>Unable to load the disease guide.</p>
                    <p>Please make sure <code>assets/disease-guide.md</code> exists.</p>
                    <button class="primary-button" onclick="loadDiseaseGuide()">Try Again</button>
                </div>
            `;
        });
}

// ====================== INITIALIZATION ======================
document.addEventListener('DOMContentLoaded', () => {
    const conditionSection = document.getElementById('conditionSection');
    if (conditionSection) conditionSection.classList.add('hidden');
    console.log('%c[IR Website] Updated script.js loaded', 'color:#666');
});
