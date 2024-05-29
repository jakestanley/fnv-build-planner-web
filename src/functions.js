import Papa from 'papaparse';

function parseCSV(csvText) {
    return Papa.parse(csvText, {
        header: true
    }).data;
};

function intOf(property) {
    let number = parseInt(property);
    return isNaN(number) ? 0 : number;
}

function sortPerks(perks) {
    perks.sort((a, b) => {
        return intOf(a.Level) - intOf(b.Level)
    })
    console.log("sorting done")
}

const SPECIAL = ['Strength', 'Perception', 'Endurance', 'Charisma', 'Intelligence', 'Agility', 'Luck'];

/**
 * 
 * @param {*} perk 
 * @returns get all non-zero perk requirements
 */
function getPerkRequirements(perk) {
    // console.debug(perk); // TODO: unit test
    let requirements = new Map();
    for (const [key, value] of Object.entries(perk)) {
        if (key == "Perk" || key == "Description") continue;
        if (isNaN(parseInt(value)) && value.length > 0) {
            requirements.set(key, value);
        } else if (intOf(value) > 0) {
            requirements.set(key, value);
        }
    }
    return requirements;
}

/**
 * 
 * @param {*} perk 
 * @returns get all non-zero perk requirements as a string
 */
function getPerkRequirementsString(perk) {
    let requirements = getPerkRequirements(perk);
    let requirementsStringArray = [];
    requirements.forEach((value, key) => {
        requirementsStringArray.push(`${key}: ${value}`)
    });
    return requirementsStringArray.join("<br>");
}



export { parseCSV, intOf, sortPerks, getPerkRequirements, getPerkRequirementsString, SPECIAL };