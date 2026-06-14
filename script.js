let selectedOrgan = null;
let selectedCondition = null;

const irData = {
  brain: {
    name: "Brain / Head & Neck",
    bleeding: [
      {
        title: "Embolization for bleeding vessels",
        description:
          "IR may block abnormal or bleeding blood vessels using tiny catheters and materials such as coils, particles, glue, or plugs."
      },
      {
        title: "Pre-operative tumor embolization",
        description:
          "Some highly vascular tumors may be embolized before surgery to reduce bleeding risk during operation."
      }
    ],
    clot: [
      {
        title: "Mechanical thrombectomy for selected stroke patients",
        description:
          "In selected acute ischemic stroke cases, a specialist may remove a clot from a blocked brain artery using catheter-based tools."
      }
    ],
    tumor: [
      {
        title: "Image-guided biopsy",
        description:
          "In selected head and neck lesions, imaging may guide a needle biopsy to obtain tissue for diagnosis."
      },
      {
        title: "Tumor embolization",
        description:
          "Some vascular tumors may be treated by blocking their blood supply before surgery or as part of a treatment plan."
      }
    ]
  },

  lungs: {
    name: "Lungs",
    bleeding: [
      {
        title: "Bronchial artery embolization",
        description:
          "This procedure may be used for coughing up blood, called hemoptysis, by blocking abnormal bleeding bronchial arteries."
      }
    ],
    clot: [
      {
        title: "Catheter-directed pulmonary embolism treatment",
        description:
          "For selected serious pulmonary embolism cases, IR may use catheters to deliver clot-dissolving medication or remove clot."
      }
    ],
    tumor: [
      {
        title: "Lung biopsy",
        description:
          "A needle may be guided by CT or ultrasound to collect tissue from a lung lesion."
      },
      {
        title: "Tumor ablation",
        description:
          "Selected lung tumors may be treated by placing a probe into the tumor and destroying it with heat, cold, or other energy."
      }
    ]
  },

  liver: {
    name: "Liver",
    bleeding: [
      {
        title: "Hepatic artery embolization",
        description:
          "IR may block bleeding arteries in the liver after trauma, tumor bleeding, or selected post-procedure bleeding."
      },
      {
        title: "TIPS for selected variceal bleeding",
        description:
          "A TIPS procedure creates a channel inside the liver to reduce high pressure in the portal venous system."
      }
    ],
    clot: [
      {
        title: "Portal vein intervention",
        description:
          "In selected cases, IR may help restore or improve portal vein blood flow using catheter-based techniques."
      }
    ],
    tumor: [
      {
        title: "Thermal ablation",
        description:
          "A needle-like probe is guided into a tumor to destroy it using heat or cold."
      },
      {
        title: "TACE",
        description:
          "Transarterial chemoembolization delivers chemotherapy into liver tumor arteries and blocks tumor blood supply."
      },
      {
        title: "Y-90 radioembolization",
        description:
          "Tiny radiation-loaded particles are delivered through arteries supplying liver tumors."
      }
    ]
  },

  kidney: {
    name: "Kidney",
    bleeding: [
      {
        title: "Renal artery embolization",
        description:
          "IR may block a bleeding kidney artery after trauma, tumor bleeding, or selected procedure-related bleeding."
      }
    ],
    clot: [
      {
        title: "Renal artery or renal vein intervention",
        description:
          "In selected situations, IR may treat blocked kidney vessels using catheter-based techniques."
      }
    ],
    tumor: [
      {
        title: "Renal tumor ablation",
        description:
          "Selected kidney tumors may be treated by placing a probe into the tumor and destroying it with heat or cold."
      },
      {
        title: "Kidney biopsy",
        description:
          "A needle biopsy may be performed using ultrasound or CT guidance to diagnose kidney disease or tumors."
      }
    ]
  },

  uterus: {
    name: "Uterus / Pelvis",
    bleeding: [
      {
        title: "Uterine artery embolization",
        description:
          "IR may block blood flow to uterine fibroids or treat selected causes of severe uterine bleeding."
      },
      {
        title: "Postpartum hemorrhage embolization",
        description:
          "In selected emergency cases after childbirth, embolization may help control life-threatening bleeding."
      }
    ],
    clot: [
      {
        title: "Pelvic vein thrombosis intervention",
        description:
          "In selected patients, IR may treat pelvic or iliac vein clots using clot-removal techniques or stents."
      }
    ],
    tumor: [
      {
        title: "Pelvic tumor biopsy",
        description:
          "Imaging can guide a needle to obtain tissue from selected pelvic masses."
      },
      {
        title: "Tumor embolization",
        description:
          "Some pelvic tumors may be treated by blocking part of their blood supply as part of a larger treatment plan."
      }
    ]
  },

  legs: {
    name: "Leg Veins / Arteries",
    bleeding: [
      {
        title: "Peripheral artery embolization",
        description:
          "IR may block bleeding arteries in the legs due to trauma, abnormal vessels, or complications of other procedures."
      },
      {
        title: "Stent-graft placement",
        description:
          "In selected arterial injuries, a covered stent may be placed to seal bleeding while keeping the artery open."
      }
    ],
    clot: [
      {
        title: "DVT thrombectomy or thrombolysis",
        description:
          "In selected deep vein thrombosis cases, IR may remove clot or deliver clot-dissolving medicine through a catheter."
      },
      {
        title: "Venous stenting",
        description:
          "If a narrowed vein contributes to clotting or swelling, a stent may be used to improve blood flow."
      },
      {
        title: "IVC filter placement or removal",
        description:
          "In selected patients, an IVC filter may be placed to reduce the risk of clot traveling to the lungs."
      }
    ],
    tumor: [
      {
        title: "Soft tissue or bone biopsy",
        description:
          "Imaging may guide a needle biopsy of selected leg masses or bone lesions."
      },
      {
        title: "Tumor ablation",
        description:
          "Selected painful or limited tumors may be treated using ablation techniques."
      }
    ]
  },

  abdomen: {
    name: "GI Tract / Abdomen",
    bleeding: [
      {
        title: "GI bleeding embolization",
        description:
          "IR may use angiography to find and block bleeding arteries in the stomach, intestines, or other abdominal organs."
      }
    ],
    clot: [
      {
        title: "Mesenteric or portal venous intervention",
        description:
          "In selected cases, catheter-based procedures may help treat clots in abdominal blood vessels."
      }
    ],
    tumor: [
      {
        title: "Image-guided biopsy",
        description:
          "CT or ultrasound may guide a needle to safely obtain tissue from abdominal masses."
      },
      {
        title: "Tumor ablation",
        description:
          "Selected abdominal tumors may be treated using heat, cold, or other energy delivered through a probe."
      },
      {
        title: "Drainage or palliative procedures",
        description:
          "IR may help drain fluid collections, relieve obstruction, or improve comfort in selected cancer-related conditions."
      }
    ]
  },

  bones: {
    name: "Bones / Spine",
    bleeding: [
      {
        title: "Embolization of vascular bone tumors",
        description:
          "Some bone tumors have large blood supply. Embolization may reduce bleeding risk before surgery or treatment."
      }
    ],
    clot: [
      {
        title: "Usually less common as a primary bone/spine IR category",
        description:
          "Blood clot treatments are more commonly related to arteries and veins rather than the bone itself."
      }
    ],
    tumor: [
      {
        title: "Bone biopsy",
        description:
          "A needle may be guided into a bone lesion to obtain tissue for diagnosis."
      },
      {
        title: "Tumor ablation",
        description:
          "Selected painful bone tumors may be treated with ablation."
      },
      {
        title: "Cementoplasty or vertebral augmentation",
        description:
          "IR may inject medical cement into selected weakened bones or spinal compression fractures to improve stability and pain."
      }
    ]
  }
};

function selectOrgan(organ) {
  selectedOrgan = organ;
  selectedCondition = null;

  document.getElementById("conditionSection").classList.remove("hidden");
  document.getElementById("resultsSection").classList.add("hidden");

  highlightSelectedButton("organButtons", organ);

  document.getElementById("conditionSection").scrollIntoView({
    behavior: "smooth"
  });
}

function selectCondition(condition) {
  selectedCondition = condition;

  const organData = irData[selectedOrgan];
  const procedures = organData[condition];

  const resultsTitle = document.getElementById("resultsTitle");
  const resultsContainer = document.getElementById("resultsContainer");

  resultsTitle.textContent =
    organData.name + " — " + formatCondition(condition) + " IR Options";

  resultsContainer.innerHTML = "";

  procedures.forEach(function (procedure) {
    const card = document.createElement("div");
    card.className = "procedure-card";

    card.innerHTML = `
      <h3>${procedure.title}</h3>
      <p>${procedure.description}</p>
      <p><strong>Important:</strong> This is educational information only. A physician must decide whether this procedure is appropriate for a specific patient.</p>
    `;

    resultsContainer.appendChild(card);
  });

  document.getElementById("resultsSection").classList.remove("hidden");

  document.getElementById("resultsSection").scrollIntoView({
    behavior: "smooth"
  });
}

function formatCondition(condition) {
  if (condition === "bleeding") return "Bleeding";
  if (condition === "clot") return "Blood Clot";
  if (condition === "tumor") return "Tumor";
  return condition;
}

function highlightSelectedButton(containerId, selectedValue) {
  const container = document.getElementById(containerId);
  const buttons = container.querySelectorAll("button");

  buttons.forEach(function (button) {
    button.classList.remove("active");

    const buttonText = button.textContent.toLowerCase();

    if (
      buttonText.includes(selectedValue) ||
      selectedValue === "brain" && buttonText.includes("brain") ||
      selectedValue === "lungs" && buttonText.includes("lungs") ||
      selectedValue === "liver" && buttonText.includes("liver") ||
      selectedValue === "kidney" && buttonText.includes("kidney") ||
      selectedValue === "uterus" && buttonText.includes("uterus") ||
      selectedValue === "legs" && buttonText.includes("leg") ||
      selectedValue === "abdomen" && buttonText.includes("abdomen") ||
      selectedValue === "bones" && buttonText.includes("bones")
    ) {
      button.classList.add("active");
    }
  });
}
