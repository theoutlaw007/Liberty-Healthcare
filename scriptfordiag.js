document.addEventListener("DOMContentLoaded", function () {
  // Function to generate or retrieve a unique test ID
  function generateTestId() {
    // Check if test IDs are stored in local storage
    let testIds = JSON.parse(localStorage.getItem("testIds")) || [];

    // Generate a new test ID
    let newTestId = Math.floor(10000 + Math.random() * 90000);

    // Check if the generated ID is unique
    while (testIds.includes(newTestId)) {
      newTestId = Math.floor(10000 + Math.random() * 90000);
    }

    // Store the new ID in local storage
    testIds.push(newTestId);
    localStorage.setItem("testIds", JSON.stringify(testIds));

    return newTestId;
  }

  // Automatically serialize tests
  function serializeTest(name, description, price) {
    const testId = generateTestId();
    return { testId, name, description, price };
  }

  const testsData = [
    serializeTest("CBC", "Complete blood count and chemistry panel.", "$50"),
    serializeTest("Hb", "Hemoglobin.", "$80"),
    serializeTest("ESR", "Erythrocyte Sedimentation rate.", "$50"),
    serializeTest(
      "X-Ray",
      "Radiographic imaging of specific body parts.",
      "$80"
    ),
    serializeTest("PBF", "Peripheral blood film.", "$50"),
    serializeTest("BT/CT", "Bleeding time/Clotting time.", "$80"),
    serializeTest("CUA", "Complete urine analysis.", "$50"),
    serializeTest("Cytology", "Cellular examination.", "$80"),
    serializeTest("HbA1c", "Hemoglobin A1C.", "$50"),
    serializeTest("Bilirubin", "Check for bilirubin levels.", "$80"),
    serializeTest(
      "Lipid profile",
      "Complete lipid count and chemistry panel.",
      "$50"
    ),
    serializeTest("Albumin", "Check albumin in blood.", "$80"),
    // Add more test data as needed
  ];

  const testsPerPage = 8; // Adjust as needed
  let currentPage = 1;

  function displayTests(page, testsToDisplay) {
    const startIndex = (page - 1) * testsPerPage;
    const endIndex = startIndex + testsPerPage;
    testsToDisplay = testsToDisplay.slice(startIndex, endIndex);

    const testsList = document.getElementById("testsList");
    testsList.innerHTML = "";

    testsToDisplay.forEach((test) => {
      const testItem = document.createElement("div");
      testItem.classList.add("test-item");
      testItem.innerHTML = `
                  <label for="testId" class="labelfortestid">Test ID:</label>
                  <span class="test-id">${test.testId}</span>
                  <br>
                  <label for="testName" class="labelfortestname">Test Name:</label>
                  <span class="test-name">${test.name}</span>
                  <br>
                  <label for="testDescription" class="labelfortestdescription">Description:</label>
                  <p class="test-description">${test.description}</p>
                  <label for="testPrice" class="labelfortestprice">Price:</label>
                  <span class="test-price">${test.price}</span>
              `;
      testsList.appendChild(testItem);
    });
  }

  function updatePaginationButtons() {
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");

    prevButton.disabled = currentPage === 1;
    nextButton.disabled =
      currentPage === Math.ceil(testsData.length / testsPerPage);
  }

  function filterTests(query) {
    const lowerCaseQuery = query.toLowerCase();
    return testsData.filter(
      (test) =>
        test.name.toLowerCase().includes(lowerCaseQuery) ||
        test.testId.toString().includes(lowerCaseQuery)
    );
  }

  const testSearchInput = document.getElementById("testSearch");
  testSearchInput.addEventListener("input", function () {
    const searchQuery = this.value.trim();
    const filteredTests = filterTests(searchQuery);

    currentPage = 1; // Reset to the first page when searching
    displayTests(currentPage, filteredTests);
    updatePaginationButtons();
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayTests(currentPage, testsData);
      updatePaginationButtons();
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    const totalPages = Math.ceil(testsData.length / testsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayTests(currentPage, testsData);
      updatePaginationButtons();
    }
  });

  // Initial display
  displayTests(currentPage, testsData);
  updatePaginationButtons();
});
