let data = [];
let selectedGender = null;

// Load CSV data
function loadCSV() {
    fetch('data.csv')
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split('\n');
            const headers = rows[0].split(',');
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i].split(',');
                if (row.length === headers.length) {
                    const entry = {};
                    headers.forEach((header, index) => {
                        entry[header.trim()] = row[index].trim();
                    });
                    data.push(entry);
                }
            }
        })
        .catch(error => console.error('Error loading CSV:', error));
}

// Select Gender
function selectGender(gender) {
    selectedGender = gender;
    document.querySelectorAll('.gender-option').forEach(option => {
        option.classList.remove('selected');
    });
    document.getElementById(gender).classList.add('selected');
}

// Fetch data based on age and gender
function fetchData() {
    const ageInput = document.getElementById('ageInput').value;
    const output = document.getElementById('output');
    output.innerHTML = '';

    if (ageInput < 0 || ageInput > 60) {
        output.innerHTML = '<p>Please enter a valid age between 0 and 60 months.</p>';
        return;
    }

    if (!selectedGender) {
        output.innerHTML = '<p>Please select a gender.</p>';
        return;
    }

    const entry = data.find(e => e['AGE (IN MONTHS)'] === ageInput);
        if (entry) {
        const weightKey = selectedGender === 'boy' ? 'BOYS WEIGHT (KG)' : 'GIRLS WEIGHT (KG)';
        const heightKey = selectedGender === 'boy' ? 'BOYS HEIGHT (CM)' : 'GIRLS HEIGHT (CM)';
        const type = selectedGender === 'boy' ? 'BOYS' : 'GIRLS';
        output.innerHTML = `
  
            <P>${type}</p>
            <p><strong>Age :</strong> ${entry['AGE (IN MONTHS)']} months</p>
            <p><strong>Weight :</strong> ${entry[weightKey]} kg</p>
            <p><strong>Height :</strong> ${entry[heightKey]} cm</p>
        `;
    } else {
        output.innerHTML = '<p>No data found for the entered age.</p>';
    }
}

// Load CSV data on page load
window.onload = loadCSV;
