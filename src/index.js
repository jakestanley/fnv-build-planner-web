import { parseCSV, sortPerks, getPerkRequirements, getPerkRequirementsString } from './functions';
import CryptoJS from 'crypto-js';

document.addEventListener('DOMContentLoaded', () => {
    let idPerksMap = new Map();
    let character = {
        perks: new Set()
    };

    const perksContainer = document.getElementById('perks-container');

    // Function to fetch and parse the CSV file
    const loadPerks = async () => {
        try {
            const response = await fetch('perks.csv');
            const csvText = await response.text();
            const perks = parseCSV(csvText);
            populatePerks(perks);
            console.log('Perks loaded successfully!');
        } catch (error) {
            console.error('Error loading perks:', error);
        }
    };
    
    // Function to populate the perks checkboxes
    const populatePerks = (perks) => {

        sortPerks(perks);
        // TODO hash to perk map
        const includeKeys = ['Perk', 'Level', 'Description']

        const allKeys = Object.keys(perks[0]);
        const headers = allKeys.filter(key => includeKeys.includes(key));

        const table = document.createElement('table');
        table.border = '1';

        const headerRow = document.createElement('tr');

        const nameHeader = document.createElement('th');
        nameHeader.textContent = 'Select';
        headerRow.appendChild(nameHeader);

        // inferred headers go after Select header
        headers.forEach(header => {
            const headerCell = document.createElement('th');
            headerCell.textContent = header;
            headerRow.appendChild(headerCell);
        });

        // extra headers go after inferred headers
        const reqsHeader = document.createElement('th');
        reqsHeader.textContent = 'Requirements';
        headerRow.appendChild(reqsHeader);

        table.appendChild(headerRow);

        perks.forEach((perk, index) => {
            const row = document.createElement('tr');

            const checkboxCell = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';

            // short hash of the name as ID. should really use something else
            const perkId = CryptoJS.MD5(perk.Perk).toString().substring(0,6);
            idPerksMap.set(perkId, perk);
            checkbox.id = perkId

            checkbox.name = 'perks';
            checkbox.value = perkId;

            row.appendChild(checkboxCell);

            headers.forEach(header => {
                const cell = document.createElement('td');
                cell.textContent = perk[header];
                row.appendChild(cell);
            });

            const reqsCell = document.createElement('td');
            const requirements = getPerkRequirementsString(perk);
            // because it has brs in it
            reqsCell.innerHTML = requirements;
            row.appendChild(reqsCell);


            const label = document.createElement('label');
            label.htmlFor = `perk_${index}`;
            label.textContent = perk.name;

            checkboxCell.appendChild(checkbox);
            checkboxCell.appendChild(label);
            checkbox.addEventListener('change', handlePerkSelection);
            

            table.appendChild(row);
        });

        perksContainer.appendChild(table);
    };

    const updateRequirements = () => {

        let requirementsMap = new Map();

        character.perks.forEach(perkId => {
            const perk = idPerksMap.get(perkId);
            const requirements = getPerkRequirements(perk);
            requirements.forEach((value, key) => {
                if (!requirementsMap.has(key)) {
                    if (!isNaN(value)) {
                        requirementsMap.set(key, parseInt(value));
                    } else {
                        requirementsMap.set(key, value);
                    }
                } else {
                    if(!isNaN(value)) {
                        if (requirementsMap.get(key) <= parseInt(value)) {
                            requirementsMap.set(key, value);
                        }
                    } else {
                        // replaces, should probably append
                        requirementsMap.set(key, value);
                    }
                }
            });
        });

        let tbody = document.getElementById('skills-body');
        tbody.innerHTML = '';
        requirementsMap.forEach((value, key) => {
            let row = document.createElement('tr');
            let cell = document.createElement('td');
            cell.textContent = key
            row.appendChild(cell);
            cell = document.createElement('td');
            cell.textContent = value
            row.appendChild(cell);
            tbody.appendChild(row)
        });
    };

    const handlePerkSelection = (event) => {
        // Handle the change event
        const target = event.target;
        if (target.checked) {
            character.perks.add(target.value);
        } else {
            character.perks.delete(target.value);
        }
        console.log(`Checkbox with value ${idPerksMap.get(target.value).Perk} is now ${target.checked ? 'checked' : 'unchecked'}`);
        // TODO: updateRequirements()
        updateRequirements();
    };

    // listener functions
    const handleGenderChange = (event) => {
        const selectedGender = event.target.value;
        console.log(`Gender changed to: ${selectedGender}`);
        // Add any additional actions you want to perform on gender change here
        // For example, you can filter perks based on the selected gender
    };

    // listeners
    const genderRadioButtons = document.querySelectorAll('input[name="character_gender"]');
    genderRadioButtons.forEach(radio => {
        radio.addEventListener('change', handleGenderChange);
    });

    // Load perks from CSV when the page loads
    loadPerks();
});
