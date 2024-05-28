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

/**
 * 
 * @param {*} perk 
 * @returns string representation of all non-zero requirements
 */
function getPerkRequirements(perk) {
    console.debug(perk);
    let requirements = [];
    for (const [key, value] of Object.entries(perk)) {
        if (key == "Perk" || key == "Description" || key == "Level") continue;
        if (isNaN(parseInt(value)) && value.length > 0) {
            requirements.push(`${key}: ${value}`);
        } else if (intOf(value) > 0) {
            requirements.push(`${key}: ${value}`);
        }
    }
    return requirements.join("<br>");
}

export { parseCSV, intOf, sortPerks, getPerkRequirements };